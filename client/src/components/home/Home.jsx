import { Link } from "react-router";
import { HiOutlineInformationCircle } from "react-icons/hi"; // Използваме една икона за детайли
// import { useEffect, useState } from "react";
// import request from "../../utils/request.js";
import useRequest from "../../hooks/useRequest.js";

// Основен компонент за началната страница
export default function Home() {
  // server canno decode + to %20
  // const urlSearchParams = new URLSearchParams({
  //   sortBy: '_createdOn desc'
  // })

  const { data: latestBooks } = useRequest(
    `/data/books?sortBy=_createdOn%20desc&pageSize=3`,
    []
  );

  // const [latestBooks, setLatestBooks] = useState([]);

  // Comment useEffect to see how it looks without books
  // useEffect(() => {
  //   //   fetch('http://localhost:3030/jsonstore/books')
  //   //    .then(response => response.json())
  //   request('/books')
  //       .then(result => {
  //         const resultBooks = Object.values(result)
  //           .sort((a, b) => b._createdOn - a._createdOn)
  //           .slice(0, 3);

  //         setLatestBooks(resultBooks);
  //       })
  //       .catch(err => {
  //         alert(err.message);
  //       })
  //   }, []);

  return (
    <div className="relative isolate px-6 lg:px-8">
      <div className="mx-auto max-w-2xl py-32 sm:py-20 lg:py-30">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-serif font-extrabold tracking-tight text-balance text-gray-900 mt-10">
            Welcome to Bookstore — your world of stories begins here.
          </h1>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-700 italic sm:text-xl/8">
            LATEST BOOKS
          </p>

          {latestBooks.length === 0 && (
            <div className="flex items-center justify-center p-6">
              <div className="bg-stone-200 shadow-xl rounded p-10 flex flex-col items-center">
                <span className="text-5xl mb-4">📚</span>
                <p className="text-2xl md:text-3xl font-semibold text-gray-800">
                  Няма намерени книги
                </p>
              </div>
            </div>
          )}

          {/* Контейнер за книгите */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-15">
            {latestBooks.map((book) => (
              <BookCard
                key={book._id}
                _id={book._id}
                title={book.title}
                imageUrl={book.img}
              />
            ))}
          </div>

          <div className="hidden sm:mb-8 sm:flex sm:justify-center mt-10">
            <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 hover:bg-[#9089fc]">
              <Link
                to="/books"
                className="text-sm/6 font-semibold text-gray-900"
              >
                See our full book collection <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Мини-компонент за карта на книга
const BookCard = ({ _id, title, imageUrl }) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 group flex flex-col min-w-[220px] max-w-xs sm:max-w-[300px] h-[400px] sm:h-[350px] mx-auto">
  {/* Book Image */}
  <img
    src={imageUrl}
    alt={title}
    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
  />

  {/* Overlay with Info */}
  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 line-clamp-2">
      {title}
    </h3>

    {/* Details Button */}
    <Link
      to={`/books/${_id}/details`}
      className="flex items-center justify-center bg-indigo-600 text-white px-3 py-2 rounded-lg text-sm sm:text-base hover:bg-indigo-700 transition duration-200"
    >
      <HiOutlineInformationCircle className="mr-2 text-lg" /> Details
    </Link>
  </div>
</div>

  );
};
