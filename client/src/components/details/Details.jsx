import { useOptimistic, useState, useCallback, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router"; 
import Comment from "../comments/Comment.jsx";
import DetailsComments from "../comments/DetailsComments.jsx";
import useRequest from "../../hooks/useRequest.js";
import { useUserContext } from "../../context/UserContext.jsx";
import { styles } from "../../assets/styles/styles.js";
import { Star } from "lucide-react";
import Review from "../reviews/Review.jsx";
import DetailsReviews from "../reviews/DetailsReviews.jsx";

export default function Details() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useUserContext();
  const { bookId } = useParams();

  // --- 1. Data Fetching ---
  const { data: book = {}, request } = useRequest(`/data/books/${bookId}`, {});

  // URLSearchParams for fetching comments linked to this book
  const commentParams = new URLSearchParams({
    where: `bookId="${bookId}"`,
  });

  const { data: comments = [], setData: setComments } = useRequest(
    `/data/comments?${commentParams.toString()}`,
    []
  );

  const { data: ratings = [], setData: setRatings } = useRequest(
    `/data/ratings?where=bookId%3D%22${bookId}%22`,
    []
  );

  // Fetch the current user's rating, only if authenticated
  const { data: userRating = [], setData: setUserRating } = useRequest(
    isAuthenticated
      ? `/data/ratings?where=bookId%3D%22${bookId}%22%20AND%20userId%3D%22${user._id}%22`
      : null,
    []
  );

  // optimistic state(used for UI responsiveness)

  const [optimisticComments, setOptimisticComments] = useOptimistic(
    comments,
    (state, action) => {
      switch (action.type) {
        case "ADD_COMMENT":
          return [...state, action.payload];
        default:
          return state;
      }
    }
  );

  const [optimisticUserRating, setOptimisticUserRating] = useOptimistic(
    ratings, // base state(full list of ratings)
    (state, action) => {
      switch (action.type) {
        case "ADD_RATING":
          // add the optimistic rating to the full list
          return [...state, action.payload];
        default:
          return state;
      }
    }
  );


  const hasUserRated = Array.isArray(userRating) && userRating.length > 0;
  const isOwner = user?._id === book?._ownerId;
  // user can rate only if:
  const canRate = isAuthenticated && !hasUserRated && !isOwner;


  const { averageRating, totalVotes, visualAverage } = useMemo(() => {
    const safeRatings = Array.isArray(optimisticUserRating) ? optimisticUserRating : []; 
    
    const totalRatingSum = safeRatings.reduce((sum, r) => sum + r.rating, 0);
    const votes = safeRatings.length;
    
    const avg = votes 
      ? Number((totalRatingSum / votes).toFixed(1)) 
      : book?.rating || 0; 
    // round to the nearest 0.5 for half-star display
    const visualAvg = Math.round(avg * 2) / 2;

    return {
      averageRating: avg,
      totalVotes: votes,
      visualAverage: visualAvg,
    };
}, [optimisticUserRating, book]);

  // sorting state 
  const [commentSortOrder, setCommentSortOrder] = useState("Newest");
  const [reviewSortOrder, setReviewSortOrder] = useState("Newest");

  const sortItems = useCallback((items, order) => {
    // if items are falsy return empty array
    if (!items || items.length === 0) return [];

    // create a copy to avoid mutating the original state array directly
    const sorted = [...items];

    sorted.sort((a, b) => {
      // use pending items creation date
      const dateA = new Date(a.pending ? a.tempId || Date.now() : a._createdOn);
      const dateB = new Date(b.pending ? b.tempId || Date.now() : b._createdOn);

      if (order === "Newest") {
        return dateB - dateA; // desc
      } else {
        return dateA - dateB; // asce
      }
    });
    return sorted;
  }, []); // no need cus the dependencies are stable

  const sortedComments = sortItems(optimisticComments, commentSortOrder);
  // use optimisticUserRating (includes the base ratings) for sorting reviews
  const sortedReviews = sortItems(optimisticUserRating, reviewSortOrder);

  // action handlers 

  const deleteBookHandler = useCallback(async () => {
    if (!window.confirm(`Are you sure you want to delete book: ${book.title}?`))
      return;

    try {
      await request(`/data/books/${bookId}`, "DELETE");
      navigate("/books");
    } catch (error) {
      alert("Unable to delete book: " + (error.message || "An error occurred"));
    }
  }, [bookId, book.title, navigate, request]);

  const deleteCommentHandler = useCallback(
    async (commentId) => {
      if (!window.confirm("Are you sure you want to delete this comment?"))
        return;

      try {
        await request(`/data/comments/${commentId}`, "DELETE");
        setComments((oldComments) =>
          oldComments.filter((c) => c._id !== commentId)
        );
      } catch (error) {
        alert(
          "Unable to delete comment: " + (error.message || "An error occurred")
        );
      }
    },
    [request, setComments]
  );

  // comment handlers
  const createCommentHandlerEnd = useCallback(
    (newComment) => {
      // remove the pending/optimistic comment
      setComments((prevComments) => prevComments.filter((c) => !c.pending));

      // add the confirmed comment with full server data
      setComments((prevComments) => [
        ...prevComments,
        { ...newComment, author: user },
      ]);
    },
    [setComments, user]
  );

  const createCommentHandlerStart = useCallback(
    (newComment) => {
      setOptimisticComments({
        type: "ADD_COMMENT",
        payload: {
          ...newComment,
          author: user,
          pending: true,
          tempId: Date.now(),
        },
      });
    },
    [setOptimisticComments, user]
  );

  // rating handlers
  const createRatingHandlerEnd = useCallback(
    (newRating) => {
      // remove pending/optimistic rating from the full list
      setRatings((prevRatings) => prevRatings.filter((r) => !r.pending));

      // add the confirmed rating to the full list
      setRatings((prevRatings) => [
        ...(Array.isArray(prevRatings) ? prevRatings : []),
        newRating,
      ]);

      // update the user-specific rating list
      setUserRating([newRating]);
    },
    [setRatings, setUserRating]
  );

  const createRatingHandlerStart = useCallback(
    (newRating) => {
      // optimistic add for user rating
      setOptimisticUserRating({
        type: "ADD_RATING",
        payload: {
          ...newRating,
          author: user,
          pending: true,
          tempId: Date.now(),
        },
      });
    },
    [setOptimisticUserRating, user]
  );


  // components

  const HalfStar = () => (
    <div className="relative w-6 h-6 inline-block">
      <Star className="absolute w-6 h-6 text-gray-300" />{" "}
      {/* full empty gray star behind */}
      {/* Left half filled */}
      <Star className="absolute w-6 h-6 text-amber-400 fill-amber-400 [clip-path:inset(0_50%_0_0)]" />
    </div>
  );

  if (!book.title) {
    return (
      <div className="flex justify-center p-10 text-lg font-semibold">
        Loading book details...
      </div>
    );
  }


  return (
    <div>
      <h2 className="text-3xl font-bold text-center py-4">Book Details</h2>
      <div className={styles.detailsForm.container}>
        <div className={styles.detailsForm.div}>
          <div className="flex flex-col items-center justify-center flex-shrink-0 md:w-1/3 p-4">
            <img
              className="w-full max-w-48 h-60 md:h-80 rounded-lg shadow-lg"
              src={book.img}
              alt={`Cover of ${book.title}`}
            />
          </div>

          <div className="flex flex-col justify-start p-6 md:p-10 md:w-2/3">
            <h1 className={styles.detailsForm.h1}>{book.title}</h1>

            <div className="space-y-3 mt-4 text-gray-700">
              <p className={styles.detailsForm.p}>
                Author:{" "}
                <span className={styles.detailsForm.span}>{book.author}</span>
              </p>
              <p className={styles.detailsForm.p}>
                Genre:{" "}
                <span className={styles.detailsForm.span}>{book.genre}</span>
              </p>
              <p className={styles.detailsForm.p}>
                Release Date:{" "}
                <span className={styles.detailsForm.span}>
                  {book.releaseDate}
                </span>
              </p>

              {/* rating section */}
              <div className="mt-4">
                <label className={styles.detailsForm.formLabel}>Rating</label>
                <div className={styles.detailsForm.starsContainer}>
                  {[1, 2, 3, 4, 5].map((i) => {
                    // Determine which Star icon to render based on the visualAverage
                    const isFull = visualAverage >= i;
                    const isHalf =
                      visualAverage >= i - 0.5 && visualAverage < i;

                    if (isHalf) {
                      // Render the custom HalfStar component
                      return <HalfStar key={i} />;
                    }

                    const starColor = isFull
                      ? `${styles.detailsForm.starFilled}`
                      : `${styles.detailsForm.starEmpty}`;

                    // Render Star icon (full or empty)
                    return (
                      <Star
                        key={i}
                        className={`w-6 h-6 ${starColor} ${
                          isFull ? "fill-amber-400" : ""
                        }`}
                      />
                    );
                  })}
                </div>

                <p className="text-sm text-gray-600 mt-2">
                  Average: <b>{averageRating}</b> / 5 ({totalVotes} vote
                  {totalVotes === 1 ? "" : "s"})
                </p>

                {isAuthenticated && userRating?.length > 0 && (
                  <p className="text-sm text-green-700 mt-1">
                    You rated this book: <b>{userRating[0].rating}</b> ⭐
                  </p>
                )}
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Summary</h2>
              <p className="text-gray-700 leading-relaxed italic">
                {book.summary}
              </p>
            </div>

            {/* owner actions */}
            {isAuthenticated && isOwner && (
              <div className="mt-10 flex flex-wrap-10 gap-4">
                {" "}
                <Link
                  to={`/books/${bookId}/edit`}
                  className={`${styles.detailsForm.btn} bg-indigo-600 hover:bg-indigo-700 text-white`}
                >
                  Edit
                </Link>
                <button
                  onClick={deleteBookHandler}
                  className={`${styles.detailsForm.btn} bg-red-600 hover:bg-red-700 text-white`}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* reviews section */}
      <section className={styles.detailsForm.commentSection}>
        <div className="flex justify-between items-center mb-6 border-b pb-2">
          <h2 className="text-2xl font-semibold text-gray-800">
            Reviews ({totalVotes})
          </h2>
          <div className="flex space-x-3 text-sm font-medium">
            <button
              onClick={() => setReviewSortOrder("Newest")}
              className={`transition ${
                reviewSortOrder === "Newest"
                  ? "text-blue-600 font-bold"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Newest
            </button>
            <button
              onClick={() => setReviewSortOrder("Oldest")}
              className={`transition ${
                reviewSortOrder === "Oldest"
                  ? "text-blue-600 font-bold"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Oldest
            </button>
          </div>
        </div>

        <DetailsReviews reviews={sortedReviews} />

        {canRate && (
          <Review
            user={user}
            onCreateStart={createRatingHandlerStart}
            onCreateEnd={createRatingHandlerEnd}
          />
        )}
        {isAuthenticated && hasUserRated && (
          <p className="text-base text-gray-600 mt-4 italic">
            You have already left a review for this book.
          </p>
        )}
      </section>

      {/* comments section */}
      <section className={styles.detailsForm.commentSection}>
        <div className="flex justify-between items-center mb-6 border-b pb-2">
          <h2 className="text-2xl font-semibold text-gray-800">
            Comments ({comments.length})
          </h2>
          <div className="flex space-x-3 text-sm font-medium">
            <button
              onClick={() => setCommentSortOrder("Newest")}
              className={`transition ${
                commentSortOrder === "Newest"
                  ? "text-blue-600 font-bold"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Newest
            </button>
            <button
              onClick={() => setCommentSortOrder("Oldest")}
              className={`transition ${
                commentSortOrder === "Oldest"
                  ? "text-blue-600 font-bold"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Oldest
            </button>
          </div>
        </div>
        <DetailsComments
          comments={sortedComments}
          onDeleteComment={deleteCommentHandler}
        />
        {isAuthenticated && (
          <Comment
            user={user}
            onCreateStart={createCommentHandlerStart}
            onCreateEnd={createCommentHandlerEnd}
          />
        )}
      </section>
    </div>
  );
}
