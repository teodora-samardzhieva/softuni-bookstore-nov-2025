import { useContext } from "react";
import { HiOutlineInformationCircle, HiOutlineBookmark } from "react-icons/hi";
import { Link, useNavigate } from "react-router";
import UserContext from "../../context/UserContext.jsx";
import { useFavorites } from "../../context/FavoriteContext.jsx";

import { styles } from "../../assets/styles/styles.js";
import { toast } from "react-toastify";

export default function Book({
  _id,
  title,
  author,
  imageUrl,
}) {
  const { isAuthenticated } = useContext(UserContext);
  const { favorites, addFavorite } = useFavorites();
  const navigate = useNavigate();

  const bookmarkHandler = () => {
    // Check if book is already in favorites
    const isAlreadyFavorite = favorites.some((fav) => fav._id === _id);

    if (isAlreadyFavorite) {
      toast.error("This book is already in your favorites!");
      return; // stop adding again
    }

    addFavorite({ _id, title, author, img: imageUrl });
    navigate("/favorites");
  };

  return (
    <div className={styles.book.container}>
      <img
        src={imageUrl}
        alt={`Book cover for ${title}`}
        className={styles.book.img}
      />

      <h3 className={styles.book.h3}>{title}</h3>

      <div className={styles.book.btnContainer}>
        <Link
          to={`/books/${_id}/details`}
          className={styles.book.btnDetails}
        >
          <HiOutlineInformationCircle className="mr-2 text-lg" /> Details
        </Link>
        {isAuthenticated && (
          <button
            onClick={bookmarkHandler}
            className={styles.book.btnFavorite}
          >
            <HiOutlineBookmark className="mr-2 text-lg" /> Bookmark
          </button>
        )}
      </div>
    </div>
  );
}
