import BookCard from "./BookCard.jsx";


/**
 * Контейнер, който визуализира списък от книги в адаптивна мрежа.
 * @param {Array<Object>} books - Масив от обекти с данни за книгите.
 * @param {function} onDetails - Хендлър за показване на детайли.
 * @param {function} onBookmark - Хендлър за запазване на книга.
 */
const BookGrid = ({ books, onDetails, onBookmark }) => {
  if (!books || books.length === 0) {
    return (
      <div className="p-6 text-center text-black min-h-screen">
        Няма намерени книги.
      </div>
    );
  }

  return (
    // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6  min-h-screen">
    // <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 p-4 min-h-screen ml-10 mr-10">
    <div className="grid 
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
      {books.map((book) => (
        <BookCard 
          key={book.id} 
          title={book.title}
          imageUrl={book.imageUrl}
          onDetailsClick={() => onDetails(book.id)}
          onBookmarkClick={() => onBookmark(book.id)}
        />
      ))}
    </div>
  );
};

export default BookGrid;