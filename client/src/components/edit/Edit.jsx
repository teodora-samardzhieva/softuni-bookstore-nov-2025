import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import useForm from "../../hooks/useForm.js";
import useRequest from "../../hooks/useRequest.js";

const initialValues = {
  title: "",
  author: "",
  genre: "",
  releaseDate: "",
  summary: "",
  img: "",
};

export default function Edit() {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const { request } = useRequest();

  const editBookHandler = async (values) => {
    const bookData = { ...values, _updatedOn: Date.now() };

    // Basic validation
    if (Object.values(bookData).some((v) => v === "")) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await request(`/data/books/${bookId}`, "PUT", bookData);

      navigate(`/books/${bookId}/details`);
    } catch (error) {
      alert(error.message);
    }
  };

  const {
    register,
    formAction,
    setValues
  } = useForm(editBookHandler, initialValues);


  // state = prevData
  // const handleChange = (e) => {
  //   setValues((state) => ({
  //     ...state,
  //     [e.target.name]: e.target.value,
  //   }));
  // };
  

  useEffect(() => {
    request(`/data/books/${bookId}`)
      .then((result) => {
        setValues(result);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [bookId, setValues]);

  return (
    <div className="w-full max-w-[320px] sm:max-w-xl mx-auto p-6 rounded-lg shadow-xl mt-30 bg-stone-100 border-solid">
      <h2 className="text-3xl font-serif text-gray-900 mb-6 text-center">
        Edit Book
      </h2>
      <form 
        action={formAction}    
        className="space-y-4">
        {/* Title Input */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Book Title
          </label>
          <input
            type="text"
            id="title"
           {...register('title')}
            placeholder="e.g., The Hobbit"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* Author Input */}
        <div>
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-700"
          >
            Author
          </label>
          <input
            type="text"
            id="author"
           {...register('author')}
            placeholder="e.g., J.R.R. Tolkien"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* Genre Input */}
        <div>
          <label
            htmlFor="genre"
            className="block text-sm font-medium text-gray-700"
          >
            Genre
          </label>
          <input
            type="text"
            id="genre"
            {...register('genre')}
            placeholder="e.g., Fantasy, Sci-Fi, Thriller"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* Release Date Input */}
        <div>
          <label
            htmlFor="releaseDate"
            className="block text-sm font-medium text-gray-700"
          >
            Release Date
          </label>
          <input
            type="date"
            id="releaseDate"
            {...register('releaseDate')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* Summary Textarea */}
        <div>
          <label
            htmlFor="summary"
            className="block text-sm font-medium text-gray-700"
          >
            Summary
          </label>
          <textarea
            id="summary"
            {...register('summary')}
            rows="4"
            placeholder="Provide a brief summary of the book..."
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          ></textarea>
        </div>

        {/* Image URL Input */}
        <div>
          <label
            htmlFor="img"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL
          </label>
          <input
            type="url" // Use type="url" for better validation
            id="img"
            {...register('img')}
            placeholder="e.g., https://example.com/book-cover.jpg"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
        >
          Save
        </button>
      </form>
    </div>
  );
}
