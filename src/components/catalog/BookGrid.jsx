import { useEffect, useState, useMemo } from 'react';
import Book from "./Book.jsx";
import useRequest from "../../hooks/useRequest.js";
import { styles } from "../../assets/styles/styles.js";

const BOOKS_PER_LOAD = 10; 
const INITIAL_LOAD = 10;  

export default function BookGrid({ search, sortOrder }) {
    // State to track the count of books currently visible
    const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD);
    
    // Fetch ALL books once on mount
    const { data: allBooks = [] } = useRequest("/data/books", []);


    // --- 1. Combined Sort and Filter Logic (Memoized) ---
    const filteredAndSortedBooks = useMemo(() => {
        const bookList = allBooks;

        if (!Array.isArray(bookList) || bookList.length === 0) {
            return [];
        }
        
        // 1. Filter based on search text
        let result = bookList.filter((book) =>
            book.title.toLowerCase().includes(search.toLowerCase()) ||
            book.author.toLowerCase().includes(search.toLowerCase())
        );

        // 2. Sort the filtered array
        const sorted = [...result];

        sorted.sort((a, b) => {
            if (sortOrder === 'Newest' || sortOrder === 'Oldest') {
                const dateA = new Date(a._createdOn);
                const dateB = new Date(b._createdOn);
                
                return sortOrder === 'Newest' ? dateB - dateA : dateA - dateB;
            }
            
            if (sortOrder === 'TitleAsc') {
                return a.title.localeCompare(b.title);
            }
            if (sortOrder === 'TitleDesc') {
                return b.title.localeCompare(a.title);
            }

            return 0;
        });

        return sorted;
    }, [allBooks, search, sortOrder]);


    // Reset Pagination on Filter/Sort Change
    useEffect(() => {
        // Reset the visible count whenever the criteria changes
        setVisibleCount(INITIAL_LOAD);
    }, [search, sortOrder]);


    // "See More" Handler 
    const handleLoadMore = () => {
        // Increase the visible count by the batch size
        setVisibleCount(prevCount => prevCount + BOOKS_PER_LOAD);
    };


    // Data for Display
    const booksToDisplay = filteredAndSortedBooks.slice(0, visibleCount);
    const hasMoreResults = visibleCount < filteredAndSortedBooks.length;
    

    // render data
    
    if (allBooks.length === 0) {
        return (
            <div className="p-6 text-center text-xl text-black min-h-screen">
                Loading book data...
            </div>
        );
    }
    
    if (booksToDisplay.length === 0) {
        return (
            <div className="p-6 text-center text-xl text-black min-h-screen">
                📚 No books found matching your criteria.
            </div>
        );
    }

    return (
        <>
            <div className={styles.bookGrid.container}>
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

            {hasMoreResults && (
                <div 
                    className="py-8 text-center w-full"
                >
                    <button 
                        onClick={handleLoadMore} 
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-150 ease-in-out uppercase tracking-wider"
                    >
                        See More Books
                    </button>
                </div>
            )}
            
            {!hasMoreResults && filteredAndSortedBooks.length > 0 && (
                <p className="text-center text-gray-500 py-8">
                    You've reached the end of the collection.
                </p>
            )}
        </>
    );
}