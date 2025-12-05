import { useOptimistic, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Comment from "../comments/Comment.jsx";
import DetailsComments from "../comments/DetailsComments.jsx";
import useRequest from "../../hooks/useRequest.js";
import { useUserContext } from "../../context/UserContext.jsx";
import { styles } from "../../assets/styles/styles.js";
import { Star, StarHalf } from "lucide-react";
import Review from "../reviews/Review.jsx";
import DetailsReviews from "../reviews/DetailsReviews.jsx";

// import {v4 as uuid} from 'uuid';

export default function Details() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useUserContext();
  const { bookId } = useParams();
  const [hoverRating, setHoverRating] = useState(0);
  const { data: book, request } = useRequest(`/data/books/${bookId}`, {});

  const urlSearchParams = new URLSearchParams({
    where: `bookId="${bookId}"`,
    load: "author=_ownerId:users",
  });

  const { data: comments = [], setData: setComments } = useRequest(
    `/data/comments?${urlSearchParams.toString()}`,
    []
  );

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

  const { data: ratings = [] } = useRequest(
    `/data/ratings?where=bookId%3D%22${bookId}%22`,
    {}
    // refresh
  );
  const { data: userRating, setData: setRatings } = useRequest(
    isAuthenticated
      ? `/data/ratings?where=bookId%3D%22${bookId}%22%20AND%20userId%3D%22${user._id}%22`
      : null,
    {}
    // refresh
  );
  const [optimisticUserRating, setOptimisticUserRating] = useOptimistic(
    ratings,
    (state, action) => {
      switch (action.type) {
        case "ADD_RATING":
          return [...state, action.payload];
        default:
          return state;
      }
    }
  );

  const averageRating = ratings?.length
    ? Number(
        (
          ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
        ).toFixed(1)
      )
    : book?.rating || 0;

  const totalVotes = ratings?.length || 0;

  const visualAverage = Math.round(averageRating * 2) / 2;
  const visualUserRating = userRating?.[0]?.rating;

  const canRate =
    isAuthenticated &&
    user._id !== book._ownerId;
    // && (!userRating || userRating.length === 0);

  const displayRating = canRate
    ? hoverRating || optimisticUserRating || visualAverage
    : visualUserRating || visualAverage;

  //     const allRatings = [
  //   ...(Array.isArray(ratings) ? ratings : []),
  //   ...(optimisticUserRating?.payload ? [optimisticUserRating.payload] : []),
  // ];

  const submitRating = async (ratingValue) => {
    if (!isAuthenticated) return;
    if (user._id === book._ownerId)
      return alert("Owners cannot rate their own book.");
    if (userRating && userRating.length > 0)
      return alert("You already rated this book.");

    // setOptimisticUserRating(ratingValue);
    // Optimistic update: add the new rating to the ratings array
    setOptimisticUserRating({
      type: "ADD_RATING",
      payload: { userId: user._id, rating: ratingValue },
    });

    const data = {
      // _id: uuid(),
      bookId,
      userId: user._id,
      // author: user.author,
      rating: ratingValue,
    };

    createRatingHandlerStart(data);

    try {
      const newRating = await request("/data/ratings", "POST", data);

      createRatingHandlerEnd(newRating);
      setOptimisticUserRating(null);
      // setRefresh((s) => !s);
    } catch (err) {
      alert(err.message);
      setOptimisticUserRating(null);
    }
  };

  const deleteBookHandler = async () => {
    const isConfirmed = confirm(
      `Are you sure you want to delete book: ${book.title}?`
    );
    if (!isConfirmed) return;

    try {
      await request(`/data/books/${bookId}`, "DELETE");
      navigate("/books");
    } catch (error) {
      alert("Unable to delete book: " + error.message);
    }
  };

  //TODO FIX pending
  const createCommentHandlerEnd = (newComment) => {
    // setRefresh((state) => !state);
    setComments((prevComments) => [
      ...prevComments,
      { ...newComment, author: user },
    ]);
  };

  const createCommentHandlerStart = (newComment) => {
    setOptimisticComments({
      type: "ADD_COMMENT",
      payload: { ...newComment, author: user, pending: true },
    });
  };

  const createRatingHandlerEnd = (newRating) => {
    // setRefresh((state) => !state);
    setRatings((prevRatings) => [...prevRatings, newRating]);
  };

  const createRatingHandlerStart = (newRating) => {
    setOptimisticComments({
      type: "ADD_RATING",
      payload: { ...newRating, author: user },
    });
  };

  if (!book) {
    return (
      <div className="flex justify-center p-10 text-lg font-semibold">
        Loading book details...
      </div>
    );
  }

  // const displayRating = canRate
  //   ? hoverRating || optimisticUserRating || visualAverage
  //   : visualUserRating || visualAverage;

  const HalfStar = () => (
    <div className="relative w-6 h-6 inline-block">
      {/* full gray star behind */}
      <Star className="absolute w-6 h-6 text-gray-300" />

      {/* left half filled */}
      <Star className="absolute w-6 h-6 text-amber-400 fill-amber-400 [clip-path:inset(0_50%_0_0)]" />
    </div>
  );

  return (
    <div>
      <div className={styles.detailsForm.container}>
        <div className={styles.detailsForm.div}>
          {/* Image Section */}
          <div className="flex flex-col items-center justify-center flex-shrink-0 md:w-1/3 p-4">
            <img
              className="w-full max-w-48 h-60 md:h-80 rounded-lg shadow-lg"
              src={book.img}
              alt={`Cover of ${book.title}`}
            />
          </div>

          {/* Content Section */}
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

              {/* Rating Section */}
              <div className="mt-4">
                <label className={styles.detailsForm.formLabel}>Rating</label>
                <div className={styles.detailsForm.starsContainer}>
                  {[1, 2, 3, 4, 5].map((i) => {
                    let StarIcon;

                    if (visualAverage >= i) {
                      StarIcon = Star; // full
                    } else if (visualAverage >= i - 0.5) {
                      // StarIcon = StarHalf; // half
                      StarIcon = HalfStar; // half
                    } else {
                      StarIcon = Star; // empty
                    }

                    const starColor =
                      visualAverage >= i - 0.5
                        ? `${styles.detailsForm.starFilled}` // Filled or half-filled stars are amber "text-amber-400"
                        : `${styles.detailsForm.starEmpty}`; // Empty stars are gray "text-gray-300"

                    {
                      StarIcon === HalfStar ? (
                        <HalfStar />
                      ) : (
                        <StarIcon className={`w-6 h-6 ${starColor}`} />
                      );
                    }

                    // if (canRate) {
                    //   return (
                    //     <button
                    //       key={i}
                    //       type="button"
                    //       onClick={() => submitRating(i)}
                    //       onMouseEnter={() => setHoverRating(i)}
                    //       onMouseLeave={() => setHoverRating(0)}
                    //       className="focus:outline-none"
                    //     >
                    //       {/* <StarIcon className={`w-6 h-6 ${starColor}`} /> */}
                    //       {StarIcon === HalfStar ? (
                    //         <HalfStar />
                    //       ) : (
                    //         <StarIcon className={`w-6 h-6 ${starColor}`} />
                    //       )}
                    //     </button>
                    //   );
                    // }

                    return (
                      <StarIcon key={i} className={`w-6 h-6 ${starColor}`} />
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

            {/* Summary */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Summary</h2>
              <p className="text-gray-700 leading-relaxed italic">
                {book.summary}
              </p>
            </div>

            {/* Owner Actions */}
            {isAuthenticated && user._id === book._ownerId && (
              <div className="mt-10 flex flex-wrap-10 gap-10">
                <Link
                  to={`/books/${bookId}/edit`}
                  className={styles.detailsForm.btn}
                >
                  Edit
                </Link>
                <button
                  onClick={deleteBookHandler}
                  className={styles.detailsForm.btn}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <section className={styles.detailsForm.commentSection}>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
          Reviews
        </h2>
        <div className="mb-4 flex items-center space-x-3">
          <h3 className="font-semibold text-gray-700">Your Rating:</h3>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <button
                key={i}
                type="button"
                // onClick={() => submitRating(i)}
                onMouseEnter={() => setHoverRating(i)}
                onMouseLeave={() => setHoverRating(0)}
                className="focus:outline-none transition-transform duration-100 ease-in-out transform hover:scale-110"
              >
                <Star
                  className={`w-6 h-6 ${
                    displayRating >= i
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <DetailsReviews reviews={optimisticUserRating || []} />
        {isAuthenticated && (
          // !userRating
          <Review
            user={user}
            onCreateStart={createRatingHandlerStart}
            onCreateEnd={createRatingHandlerEnd}
          />
        )}
      </section>

      {/* Comments */}
      <section className={styles.detailsForm.commentSection}>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
          Comments
        </h2>
        <DetailsComments comments={optimisticComments || []} />
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
