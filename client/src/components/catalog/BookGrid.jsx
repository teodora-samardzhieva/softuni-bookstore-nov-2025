import Book from "./Book.jsx";
import useRequest from "../../hooks/useRequest.js";
import { styles } from "../../assets/styles/styles.js";

export default function BookGrid({search}) {

  // Fetch once on mount
  const { data: books } = useRequest("/data/books", []);

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

  // Filter based on search text
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {!books || books.length === 0 || filteredBooks.length === 0 ? (
        <div className="p-6 text-center text-xl text-black min-h-screen">
          📚 No books found. 
        </div>
      ) : (
        <div
          className={styles.bookGrid.container}
        >
          {filteredBooks
            ? filteredBooks.map((book) => (
                <Book
                  key={book._id}
                  _id={book._id}
                  author={book.author}
                  title={book.title}
                  imageUrl={book.img}
                />
              ))
            : books.map((book) => (
                <Book
                  key={book._id}
                  _id={book._id}
                  title={book.title}
                  imageUrl={book.img}
                />
              ))}
          {/* {books.map(book => <Book key={book._id} {...book} />)} */}
        </div>
      )}
    </>
  );
}
