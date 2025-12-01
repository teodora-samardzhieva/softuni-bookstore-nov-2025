import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Comment from "../comments/Comment.jsx";
import DetailsComments from "../comments/DetailsComments.jsx";
import useRequest from "../../hooks/useRequest.js";
import { useUserContext } from "../../context/UserContext.jsx";
import { styles } from "../../assets/styles/styles.js";

export default function Details() {
  const { user, isAuthenticated } = useUserContext();
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);

  const { data: book, request } = useRequest(`/data/books/${bookId}`, {});

  const deleteGameHandler = async () => {
    const isConfirmed = confirm(
      `Are you sure you want to delete book: ${book.title}?`
    );

    if (!isConfirmed) {
      return;
    }

    try {
      await request(`/data/books/${bookId}`, "DELETE");
      navigate("/books");
    } catch (error) {
      alert("Unable to delete game: ", error.message);
    }
  };

  const refreshHandler = () => {
    setRefresh((state) => !state);
  };

  // FIX: prevent crash
  if (!book) {
    return (
      <div className="flex justify-center p-10 text-lg font-semibold">
        Loading book details...
      </div>
    );
  }

  return (
    <div>
      <div className={styles.detailsForm.container}>
        <div className={styles.detailsForm.div}>
          {/* Image Section (Left on Desktop, Top on Mobile) */}
          <div className="flex flex-col items-center justify-center flex-shrink-0 md:w-1/3 p-4">
            <img
              className="w-full max-w-48 h-60 md:h-80 rounded-lg shadow-lg"
              src={book.img}
              alt={`Cover of ${book.title}`}
            />
          </div>

          {/* Content Section */}
          <div className="flex flex-col justify-start p-6 md:p-10 md:w-2/3">
            {/* Title */}
            <h1 className={styles.detailsForm.h1}>
              {book.title}
            </h1>

            {/* Metadata */}
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
            </div>

            {/* Summary */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Summary</h2>
              <p className="text-gray-700 leading-relaxed italic">
                {book.summary}
              </p>
            </div>

            {/* Action Button */}
            {/* does not work for preseed data */}
            {(isAuthenticated && user._id === book._ownerId) && (
              <div className="mt-10 flex flex-wrap-10 gap-10">
                <Link
                  to={`/books/${bookId}/edit`}
                  className={styles.detailsForm.btn}
                >
                  Edit
                </Link>
                <button
                  onClick={deleteGameHandler}
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
        {/* <!-- Title --> */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
          Comments
        </h2>

        {/* <!-- Comments List --> */}
        <DetailsComments refresh={refresh} />

        {/* <!-- Add Comment Form --> */}
        {isAuthenticated && <Comment user={user} onCreate={refreshHandler} />}
      </section>
    </div>
  );
}
