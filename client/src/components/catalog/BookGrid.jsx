import Book from "./Book.jsx";
import useRequest from "../../hooks/useRequest.js";
import { styles } from "../../assets/styles/styles.js";

export default function BookGrid({search, sortOrder}) {

  // Fetch once on mount
  const { data: books } = useRequest("/data/books", []);

  const sortBooks = (bookList, order) => {
    // Return the list directly if there's no data or if we use the default data
    if (!Array.isArray(bookList) || bookList.length === 0) {
      return [];
    }
    
    // Create a copy to sort without mutating the state fetched by useRequest
    const sorted = [...bookList];

    sorted.sort((a, b) => {
      // Sort by creation date 
      if (order === 'Newest' || order === 'Oldest') {
        const dateA = new Date(a._createdOn);
        const dateB = new Date(b._createdOn);
        
        // Newest first desc
        if (order === 'Newest') {
          return dateB - dateA;
        }
        // Oldest first asce
        return dateA - dateB;
      }
      
      // Sort by Title
      if (order === 'TitleAsc') {
        return a.title.localeCompare(b.title); // A-Z
      }
      if (order === 'TitleDesc') {
        return b.title.localeCompare(a.title); // Z-A
      }

      // Default: No sort applied
      return 0;
    });

    return sorted;
  };

  const sortedBooks = sortBooks(books, sortOrder);

  // Filter based on search text
  const filteredBooks = sortedBooks.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase())
  );

  const booksToDisplay = filteredBooks;

  return (
    <>
      {!books || books.length === 0 || booksToDisplay.length === 0 ? (
        <div className="p-6 text-center text-xl text-black min-h-screen">
          📚 No books found. 
        </div>
      ) : (
        <div
          className={styles.bookGrid.container}
        >
          {booksToDisplay.map((book) => (
                <Book
                  key={book._id}
                  _id={book._id}
                  author={book.author}
                  title={book.title}
                  imageUrl={book.img}
                />
              ))}
        </div>
      )}
    </>
  );
}
