import { Link } from 'react-router';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
            <h1 className="text-9xl font-extrabold text-red-600 tracking-widest">
                404
            </h1>
            <div className="bg-black px-2 text-sm rounded rotate-12 absolute text-white">
                Page Not Found
            </div>
            <div className="mt-8 text-center">
                <p className="text-xl text-gray-700 mb-4">
                    Oops! It looks like you've wandered off the map.
                </p>
                <p className="text-gray-500 mb-8">
                    The book you're looking for might have been moved or deleted.
                </p>
                
                <Link 
                    to="/" 
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}