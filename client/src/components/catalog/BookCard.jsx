// import React from 'react';
import { HiOutlineInformationCircle, HiOutlineBookmark } from "react-icons/hi";

/**
 * Карта за визуализация на една книга в каталога.
 * @param {string} title - Заглавието на книгата.
 * @param {string} imageUrl - URL адресът на корицата.
 * @param {function} onDetailsClick - Хендлър при клик на бутона "Детайли".
 * @param {function} onBookmarkClick - Хендлър при клик на бутона "Запази".
 */
const BookCard = ({ title, imageUrl, onDetailsClick, onBookmarkClick }) => {
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
        <button className="flex items-center justify-center bg-indigo-600 text-white px-1.5 sm:px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition duration-200 flex-1 min-w-min" onClick={onDetailsClick}>
            
          {/* <svg
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="mr-1 sm:mr-2 text-lg"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>Детайли */}
          <HiOutlineInformationCircle className="mr-2 text-lg" /> Детайли
        </button>
        <button className="flex items-center justify-center bg-indigo-900 text-white px-1.5 sm:px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition duration-200 flex-1 min-w-min" onClick={onBookmarkClick}>
          {/* <svg
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="mr-1 sm:mr-2 text-lg"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            ></path>
          </svg> Запази */}
          <HiOutlineBookmark className="mr-2 text-lg" /> Запази
        </button>
      </div>
    </div>
  );
};

export default BookCard;
