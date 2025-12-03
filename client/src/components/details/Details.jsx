import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Comment from "../comments/Comment.jsx";
import DetailsComments from "../comments/DetailsComments.jsx";
import useRequest from "../../hooks/useRequest.js";
import { useUserContext } from "../../context/UserContext.jsx";
import { styles } from "../../assets/styles/styles.js";
import { Star, StarHalf } from "lucide-react";

export default function Details() {
  const { user, isAuthenticated } = useUserContext();
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [optimisticUserRating, setOptimisticUserRating] = useState(null);

  const { data: book, request } = useRequest(`/data/books/${bookId}`, {});
  const { data: ratings } = useRequest(
    `/data/ratings?where=bookId%3D%22${bookId}%22`,
    {},
    refresh
  );
  const { data: userRating } = useRequest(
    isAuthenticated
      ? `/data/ratings?where=bookId%3D%22${bookId}%22%20AND%20userId%3D%22${user._id}%22`
      : null,
    {},
    refresh
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
    user._id !== book._ownerId &&
    (!userRating || userRating.length === 0);

  const submitRating = async (ratingValue) => {
    if (!isAuthenticated) return;
    if (user._id === book._ownerId)
      return alert("Owners cannot rate their own book.");
    if (userRating && userRating.length > 0)
      return alert("You already rated this book.");

    setOptimisticUserRating(ratingValue);

    try {
      await request("/data/ratings", "POST", {
        bookId,
        userId: user._id,
        rating: ratingValue,
      });
      setOptimisticUserRating(null);
      setRefresh((s) => !s);
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

  const refreshHandler = () => {
    setRefresh((state) => !state);
  };

  if (!book) {
    return (
      <div className="flex justify-center p-10 text-lg font-semibold">
        Loading book details...
      </div>
    );
  }

  const displayRating = canRate
    ? hoverRating || optimisticUserRating || visualAverage
    : visualUserRating || visualAverage;

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
                      StarIcon = StarHalf; // half
                    } else {
                      StarIcon = Star; // empty
                    }

                    const starColor =
                      displayRating >= i - 0.5
                        ? `${styles.detailsForm.starFilled}` // Filled or half-filled stars are amber "text-amber-400" 
                        : `${styles.detailsForm.starEmpty}`; // Empty stars are gray "text-gray-300"

                    if (canRate) {
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => submitRating(i)}
                          onMouseEnter={() => setHoverRating(i)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="focus:outline-none"
                        >
                          <StarIcon className={`w-6 h-6 ${starColor}`} />
                        </button>
                      );
                    }

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

      {/* Comments */}
      <section className={styles.detailsForm.commentSection}>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
          Comments
        </h2>
        <DetailsComments refresh={refresh} />
        {isAuthenticated && <Comment user={user} onCreate={refreshHandler} />}
      </section>
    </div>
  );
}
