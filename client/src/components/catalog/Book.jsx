import { useContext } from "react";
import { HiOutlineInformationCircle, HiOutlineBookmark } from "react-icons/hi";
import { Link, useNavigate } from "react-router";
import UserContext from "../../context/UserContext.jsx";
import { useFavorites } from "../../context/FavoriteContext.jsx";

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
      alert("This book is already in your favorites!");
      return; // stop adding again
    }

    addFavorite({ _id, title, author, img: imageUrl });
    navigate("/favorites");
  };

  return (
    <div className="bg-blue-100 rounded-lg p-4 text-center shadow-lg transform transition duration-300 hover:scale-105 flex flex-col w-70 sm:w-70 h-95 sm:h-100">
      {/* Image Cover */}
      <img
        src={imageUrl}
        alt={`Корица на ${title}`}
        className="w-full h-60 sm:h-60 object-cover rounded-md mb-4 border border-gray-700"
      />

      {/* Title */}
      <h3 className="text-sm font-semibold italic text-black mb-auto pb-6 flex-grow line-clamp-2">
        {title}
      </h3>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mt-auto transform transition duration-300">
        <Link
          to={`/books/${_id}/details`}
          className="flex items-center justify-center bg-indigo-600 text-white px-1.5 sm:px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition duration-200 flex-1 min-w-min"
        >
          <HiOutlineInformationCircle className="mr-2 text-lg" /> Details
        </Link>
        {/* For logged-in users */}
        {isAuthenticated ? (
          <button
            onClick={bookmarkHandler}
            className="flex items-center justify-center bg-indigo-900 text-white px-1.5 sm:px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition duration-200 flex-1 min-w-min"
          >
            <HiOutlineBookmark className="mr-2 text-lg" /> Bookmark
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
