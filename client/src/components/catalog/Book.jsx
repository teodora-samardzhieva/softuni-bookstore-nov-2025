import { HiOutlineInformationCircle, HiOutlineBookmark } from "react-icons/hi";
import { Link } from "react-router";

/**
 * Карта за визуализация на една книга в каталога.
 * @param {string} title - Заглавието на книгата.
 * @param {string} imageUrl - URL адресът на корицата.
 * @param {function} onDetailsClick - Хендлър при клик на бутона "Детайли".
 * @param {function} onBookmarkClick - Хендлър при клик на бутона "Запази".
 */

export default function Book({
    _id,
    title,
    imageUrl, 
    // onBookmarkClick //TODO
}) {
  return (
      <div className="bg-blue-100 rounded-lg p-4 text-center shadow-lg transform transition duration-300 hover:scale-105 flex flex-col w-70 sm:w-70 h-95 sm:h-100">
      {/* Изображение на корицата */}
      <img
        src={imageUrl}
        alt={`Корица на ${title}`}
        className="w-full h-60 sm:h-60 object-cover rounded-md mb-4 border border-gray-700"
      />

      {/* Заглавие */}
      <h3 className="text-sm font-semibold italic text-black mb-auto pb-6 flex-grow line-clamp-2">
        {title}
      </h3>

      {/* Бутони за взаимодействие */}
      <div className="flex flex-wrap justify-center gap-2 mt-auto transform transition duration-300">
        <Link 
          to={`/books/${_id}/details`}
          className="flex items-center justify-center bg-indigo-600 text-white px-1.5 sm:px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition duration-200 flex-1 min-w-min" 
        >
          <HiOutlineInformationCircle className="mr-2 text-lg" /> Details
        </Link>
        <button className="flex items-center justify-center bg-indigo-900 text-white px-1.5 sm:px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition duration-200 flex-1 min-w-min" 
        // onClick={onBookmarkClick} //TODO
        >
          <HiOutlineBookmark className="mr-2 text-lg" /> Bookmark
        </button>
      </div>
    </div>
  );
}
