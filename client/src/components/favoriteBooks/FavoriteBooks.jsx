import { Link } from "react-router";
import { useFavorites } from "../../context/FavoriteContext.jsx";
import { styles } from "../../assets/styles/styles.js";

export default function Favorites() {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="App px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-black font-serif font-extrabold tracking-wide py-8 mb-6 mt-30">
            📚 No favorite books yet.
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
      <h2 className={styles.favoriteBooks.h2}>
        Favorite Books
      </h2>
      <div className={styles.bookGrid.container}>
        {favorites.map((book) => (
          <div
            key={book._id}
            className={styles.favoriteBooks.div}
          >
            {/* Image Cover */}
            <img
              src={book.img}
              alt={`Корица на ${book.title}`}
              className={styles.book.img}
            />

            {/* Book Title */}
            <h3 className={styles.book.h3}>
              Title: {book.title}
            </h3>
            {/* Author */}
            <h3 className={`${styles.book.h3} mt-5`}>
              Author: {book.author}
            </h3>

            {/* Action Buttons */}
            <div className={styles.book.btnContainer}>
              <button
                onClick={() => removeFavorite(book._id)}
                className={styles.favoriteBooks.btn}
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
