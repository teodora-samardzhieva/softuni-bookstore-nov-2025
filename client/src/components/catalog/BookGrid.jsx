// import { useEffect, useState } from "react";
import Book from "./Book.jsx";
import useRequest from "../../hooks/useRequest.js";

export default function BookGrid() {
  // const [books, setBooks] = useState([]);

  // Fetch once on mount
  const {data: books} = useRequest('/data/books', []);

  // same as
  // useEffect(() => {
  //   fetch("http://localhost:3030/data/books")
  //     .then(res => res.json())
  //     .then((result) => {
  //       setBooks(Object.values(result));
  //     })
  // }, []);

  // Fetch when something changes (request)
  // Causes infinite loop cus request is unstable
  // useEffect(() => {
  //   request("/data/books")
  //     .then((result) => {
  //       // console.log(result);
  //       setBooks(Object.values(result));
  //     })
  //     .catch((err) => {
  //       console.log(err.messsage)
  //     });
  // }, [request]);

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
              _id={book._id}
              title={book.title}
              imageUrl={book.img}
              // TODO:
              // onBookmarkClick={() => onBookmark(book._id)}
            />
          ))}
          {/* {books.map(book => <Book key={book._id} {...book} />)} */}
        </div>
      )}
    </>
  );
}
