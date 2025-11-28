import { useNavigate } from "react-router";
import request from "../../utils/request.js";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase.js";

export default function CreateBook() {
  const navigate = useNavigate();
  const [imageUpload, setImageUpload] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageName, setImageName] = useState("");

  useEffect(() => {
    return () => {
      if (imagePreview && imageUpload) {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview(null);
    };
  }, [imageUpload]);

  // useEffect(() => {

  //   return () => {
  //     URL.revokeObjectURL(imagePreview)
  //     setImagePreview(null)
  //     // setImageName(null)
  //   }
  // }, [imageUpload])

  const createBookHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { img, ...bookData } = Object.fromEntries(formData);
    // console.log(bookData);

    if (imageUpload) {
      try {
        //upload img
        const imageRef = ref(storage, `images/${img.name}`);
        await uploadBytes(imageRef, img);
        bookData.img = await getDownloadURL(imageRef);
      } catch (err) {
        alert("Image upload failed: " + err.message);
        return; // stop submission
      }
    } else {
      bookData.img = img;
    }

    bookData._createdOn = Date.now();
    bookData._updatedOn = Date.now();
    bookData._id = Math.random().toString(36).substring(2, 10);

    // Basic validation
    if (
      !bookData.title ||
      !bookData.author ||
      !bookData.genre ||
      !bookData.releaseDate ||
      !bookData.summary ||
      !bookData.img
    ) {
      alert("Please fill in all fields.");
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
      await request("/books", "POST", bookData);

      navigate("/books");
    } catch (error) {
      alert(error.message);
    }
  };

  const imageUploadClickHandler = () => {
    setImageUpload((state) => !state);
  };

  const imageChangeHandler = (e) => {
    const img = e.target.files[0];
    const name = img.name;
    const imageUrl = URL.createObjectURL(img);
    setImagePreview(imageUrl);
    setImageName(name);
  };

  const imageUrlChangeHandler = (e) => {
    const url = e.target.value;

    setImagePreview(url);
    setImageName(url.split("/").pop());
  };

  return (
    <div className="max-w-xl mx-auto p-6 rounded-lg shadow-xl mt-30 bg-stone-100 border-solid">
      <h2 className="text-3xl font-serif text-gray-900 mb-6 text-center">
        Add New Book
      </h2>
      <form onSubmit={createBookHandler} className="space-y-4">
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
            name="title"
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
            name="author"
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
            name="genre"
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
            name="releaseDate"
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
            name="summary"
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
            {imageUpload ? "Image Upload" : "Image URL"}
          </label>
          <button
            type="button"
            onClick={imageUploadClickHandler}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow 
                      hover:bg-indigo-700 transition font-medium"
          >
            {imageUpload ? "Image URL" : "Image Upload"}
          </button>
          {imageUpload ? (
            <input
              type="file"
              id="img"
              name="img"
              placeholder="Upload file..."
              onChange={imageChangeHandler}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          ) : (
            <input
              type="url"
              id="img"
              name="img"
              placeholder="e.g., https://example.com/book-cover.jpg"
              onChange={imageUrlChangeHandler}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          )}
          {imagePreview && (
            <div className="mt-4 flex justify-center">
              <img
                src={imagePreview}
                alt={imageName}
                className="max-h-48 rounded-md shadow-md object-cover"
              />
            </div>
          )}
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
}
