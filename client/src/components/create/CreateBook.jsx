import { useNavigate } from "react-router";
import request from "../../utils/request.js";

export default function CreateBook () {
  const navigate = useNavigate();

  const createBookHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const bookData = Object.fromEntries(formData);
    // console.log(bookData);
    bookData._createdOn = Date.now();
    bookData._id = Math.random().toString(36).substring(2, 10);

    // Basic validation
    if (!bookData.title || !bookData.author || !bookData.genre || !bookData.releaseDate || !bookData.summary || !bookData.img) {
      alert('Please fill in all fields.');
      return;
    }

    // try {
    //   const response = await fetch('http://localhost:3030/jsonstore/books', {
    //     method: 'POST',
    //     headers: {
    //       'content-type': 'application/json'
    //     },
    //     body: JSON.stringify(bookData),
    //   });
    //   const result = await response.json();
    //   console.log(result);

    //   navigate('/books');
      
    // } catch (error) {
    //   throw new Error(error.message);
    // }

    // Pass the new book data to a parent component function (e.g., to add to a list)
    try {
      await request('/books', 'POST', bookData);

      navigate('/books');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 rounded-lg shadow-xl mt-30 bg-stone-100 border-solid">
      <h2 className="text-3xl font-serif text-gray-900 mb-6 text-center">Add New Book</h2>
      <form onSubmit={createBookHandler} className="space-y-4">
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Book Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="e.g., The Hobbit"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* Author Input */}
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            placeholder="e.g., J.R.R. Tolkien"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* Genre Input */}
        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Genre</label>
          <input
            type="text"
            id="genre"
            name="genre"
            placeholder="e.g., Fantasy, Sci-Fi, Thriller"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* Release Date Input */}
        <div>
          <label htmlFor="releaseDate" className="block text-sm font-medium text-gray-700">Release Date</label>
          <input
            type="date"
            id="releaseDate"
            name="releaseDate"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* Summary Textarea */}
        <div>
          <label htmlFor="summary" className="block text-sm font-medium text-gray-700">Summary</label>
          <textarea
            id="summary"
            name="summary"
            rows="4"
            placeholder="Provide a brief summary of the book..."
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          ></textarea>
        </div>

        {/* Image URL Input */}
        <div>
          <label htmlFor="img" className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="url" // Use type="url" for better validation
            id="img"
            name="img"
            placeholder="e.g., https://example.com/book-cover.jpg"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
          {/* {bookData.img && (
            <div className="mt-4 flex justify-center">
              <img src={bookData.img} alt="Book Cover Preview" className="max-h-48 rounded-md shadow-md object-cover" />
            </div>
          )} */}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
        >
          Create
        </button>
      </form>
    </div>
  );
};
