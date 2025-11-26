export default function Details() {
    // Placeholder data for demonstration
    const book = {
        title: "The Silent Watcher",
        author: "Anya Kirov",
        genre: "Mystery / Thriller",
        releaseDate: "2024-05-15",
        summary: "A thrilling tale of a detective investigating a series of seemingly unrelated disappearances, only to uncover a conspiracy reaching the highest levels of government. The summary should be long enough to wrap multiple lines.",
        imageUrl: "https://via.placeholder.com/150x220?text=Book+Cover",
    };

    return (
        <div className="flex justify-center p-8 max-h-screen mt-30">
            <div className="flex flex-col md:flex-row max-w-3xl w-full bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl">
                
                {/* 🖼️ Image Section (Left on Desktop, Top on Mobile) */}
                <div className="flex-shrink-0 md:w-1/3">
                    <img
                        className="object-cover w-full h-96 md:h-full rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
                        src={book.imageUrl}
                        alt={`Cover of ${book.title}`}
                    />
                </div>

                {/* 📝 Content Section */}
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
                    
                    {/* Action Button */}
                    <div className="mt-10">
                        <button
                            type="button"
                            className="inline-flex items-center w-full md:w-auto justify-center text-white bg-indigo-600 border border-transparent rounded-lg shadow-md hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 font-medium text-base px-6 py-3 transition duration-150"
                        >
                            Close Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}