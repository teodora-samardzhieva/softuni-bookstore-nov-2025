import { Link } from "react-router";
import { useFavorites } from "../../context/FavoriteContext.jsx";

export default function Favorites() {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="App px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-extrabold text-black tracking-wide py-8 mb-6 mt-30">
            📚 No favorite books yet
            <br />
            <Link
              to="/books"
              className="underline hover:text-indigo-800 text-lg sm:text-xl md:text-2xl"
            >
              Start bookmarking to see them here!
            </Link>
          </h2>

          <div className="flex justify-center mt-4">
            <img
              src="/assets/img/no-books-found.png"
              alt="No books found!"
              className="w-100 sm:w-150 md:w-150 lg:w-200 xl:w-[1000px] h-auto object-contain"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-indigo-800 tracking-wide text-center py-8 border-b-2 border-indigo-200 mb-6 mt-30">
        Favorite Books
      </h2>
      <div
        className="grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-2 
          lg:grid-cols-3
          xl:grid-cols-4 
          2xl:grid-cols-5
          [@media(min-width:2000px)]:grid-cols-6 
          [@media(min-width:2500px)]:grid-cols-7
          gap-7 
          p-4 md:px-10
          justify-items-center"
      >
        {favorites.map((book) => (
          <div
            key={book._id}
            className="bg-blue-100 rounded-lg p-4 text-center shadow-lg transform transition duration-300 hover:scale-105 flex flex-col w-70 sm:w-70 h-95 sm:h-100"
          >
            {/* Image Cover */}
            <img
              src={book.img}
              alt={`Корица на ${book.title}`}
              className="w-full h-60 sm:h-60 object-cover rounded-md mb-4 border border-gray-700"
            />

            {/* Book Title */}
            <h3 className="text-sm font-semibold italic text-black mb-auto pb-6 flex-grow line-clamp-2">
              Title: {book.title}
            </h3>
            {/* Author */}
            <h3 className="text-sm font-semibold italic text-black mb-auto pb-6 flex-grow line-clamp-2 mt-5">
              Author: {book.author}
            </h3>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-2 mt-auto transform transition duration-300">
              <button
                onClick={() => removeFavorite(book._id)}
                className="mt-3 w-full bg-red-500 text-white py-2 rounded"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
