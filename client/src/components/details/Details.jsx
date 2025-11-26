import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

export default function Details() {
    const {bookId} = useParams();
    const [book, setBook] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3030/jsonstore/books/${bookId}`)
            .then(response => response.json())
            .then(result => setBook(result))
            .catch(err => alert(err.message));
    }, [bookId]);

    const deleteGameHandler = async () => {
        const isConfirmed = confirm(`Are you sure you want to delete book: ${book.title}?`);
        if(!isConfirmed) {
            return;
        }

        try {
            await fetch(`http://localhost:3030/jsonstore/books/${bookId}`, {
                method: 'DELETE',
            });
            
            navigate('/books');
        } catch (error) {
            alert('Unable to delete game: ', error.message);
        }
    }

        // FIX: prevent crash
    if (!book) {
        return (
            <div className="flex justify-center p-10 text-lg font-semibold">
                Loading book details...
            </div>
        );
    }

    return (
        <div className="flex justify-center p-8 min-h-screen mt-30">
            <div className="flex flex-col md:flex-row max-w-3xl w-full bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl">
                
                {/* Image Section (Left on Desktop, Top on Mobile) */}
                <div className="flex flex-col items-center justify-center flex-shrink-0 md:w-1/3 p-4">
                    <img
                        className="w-full max-w-48 h-60 md:h-80 rounded-lg shadow-lg"
                        src={book.img}
                        alt={`Cover of ${book.title}`}
                    />
                </div>

                {/* Content Section */}
                <div className="flex flex-col justify-start p-6 md:p-10 md:w-2/3">
                    
                    {/* Title */}
                    <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-gray-900 border-b pb-3 border-indigo-100">
                        {book.title}
                    </h1>

                    {/* Metadata */}
                    <div className="space-y-3 mt-4 text-gray-700">
                        <p className="text-lg font-semibold">
                            Author: <span className="font-normal text-gray-600">{book.author}</span>
                        </p>
                        <p className="text-lg font-semibold">
                            Genre: <span className="font-normal text-gray-600">{book.genre}</span>
                        </p>
                        <p className="text-lg font-semibold">
                            Release Date: <span className="font-normal text-gray-600">{book.releaseDate}</span>
                        </p>
                    </div>

                    {/* Summary */}
                    <div className="mt-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Summary</h2>
                        <p className="text-gray-700 leading-relaxed italic">
                            {book.summary}
                        </p>
                    </div>
                    
                    {/* //TODO: Check if has user */}
                    {/* Action Button */}
                    <div className="mt-10">
                        <Link
                            to='/books'
                            className="inline-flex items-center w-full md:w-auto justify-center text-white bg-indigo-600 border border-transparent rounded-lg shadow-md hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 font-medium text-base px-6 py-3 transition duration-150"
                        >
                            Edit
                        </Link>
                        {/* <Link
                            to={`/books/${bookId}/delete`}
                            className="inline-flex items-center w-full md:w-auto justify-center text-white bg-indigo-600 border border-transparent rounded-lg shadow-md hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 font-medium text-base px-6 py-3 transition duration-150 ml-10"
                        >
                            Delete
                        </Link> */}
                        <button
                            onClick={deleteGameHandler}
                            className="inline-flex items-center w-full md:w-auto justify-center text-white bg-indigo-600 border border-transparent rounded-lg shadow-md hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 font-medium text-base px-6 py-3 transition duration-150 ml-10"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}