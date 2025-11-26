import { useEffect, useState } from "react";
import Book from "./Book.jsx";
// import { useNavigate } from "react-router";

/**
 * Контейнер, който визуализира списък от книги в адаптивна мрежа.
 * @param {Array<Object>} books - Масив от обекти с данни за книгите.
 * @param {function} onDetails - Хендлър за показване на детайли.
 * @param {function} onBookmark - Хендлър за запазване на книга.
 */

export default function BookGrid() {
  const [books, setBooks] = useState([]);
  // const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://localhost:3030/jsonstore/books");
        const result = await response.json();
        // console.log(result);
        setBooks(Object.values(result));
      } catch (error) {
        throw new Error(error.message);
      }
    })();
  }, []);

  // const onDetails = (bookId) => {
  //   navigate(`/books/${bookId}`);
  // };

  // const onBookmark = (bookId) => {
    // В реално приложение, тук бихте изпратили заявка към бекенда
    // за добавяне/премахване на книгата от списъка с отметки на потребителя.
    // Пример за API повикване: dataService.toggleBookmark(bookId);
  // };

  return (
    <>
      {!books || books.length === 0 ? (
        <div className="p-6 text-center text-black min-h-screen">
          Няма намерени книги.
        </div>
      ) : (
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
          {books.map((book) => (
            <Book
              key={book._id}
              title={book.title}
              imageUrl={book.img}
              // TODO:
              // onDetailsClick={() => onDetails(book._id)}
              // onBookmarkClick={() => onBookmark(book._id)}
            />
          ))}
          {/* {books.map(book => <Book key={book._id} {...book} />)} */}
        </div>
      )}
    </>
  );
}

//TODO
// function onDetails() {}
// function onBookmark() {}
