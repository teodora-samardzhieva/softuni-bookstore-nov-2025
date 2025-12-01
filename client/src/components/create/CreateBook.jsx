import { useNavigate } from "react-router";
// import request from "../../utils/request.js";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase.js";
// import { useUserContext } from "../../context/UserContext.jsx";
import useRequest from "../../hooks/useRequest.js";
import { styles } from "../../assets/styles/styles.js";

export default function CreateBook() {
  const navigate = useNavigate();
  const [imageUpload, setImageUpload] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageName, setImageName] = useState("");
  const {request} = useRequest();
  // const { user } = useUserContext();

  useEffect(() => {
    return () => {
      if (imagePreview && imageUpload) {
        URL.revokeObjectURL(imagePreview);
      }
      // setImagePreview(null);
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
    // Uncontrolled form //TODO change to controlled form
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

    // bookData._createdOn = Date.now();
    // bookData._updatedOn = Date.now(); 
    // bookData._id = Math.random().toString(36).substring(2, 10);

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
    //   // const response = await fetch('http://localhost:3030/jsonstore/books', {
    //   const response = await fetch('http://localhost:3030/data/books', {
    //     method: 'POST',
    //     headers: {
    //       'content-type': 'application/json',
    //           'X-Authorization': user?.accessToken
    //     },
    //     body: JSON.stringify(bookData),
    //   });
    //   // const result = await response.json();
    //   // console.log(result);
    //   await response.json();
    //   navigate('/books');

    // } catch (error) {
    //   throw new Error(error.message);
    // }

    // Pass the new book data to a parent component function (e.g., to add to a list)
    try {
      await request("/data/books", "POST", bookData);

      navigate("/books");
    } catch (error) {
      alert(error.message);
    }
  };

  const imageUploadClickHandler = () => {
    setImageUpload((state) => !state);
    setImagePreview(null);
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
    <div className={styles.createForm.container}>
      <h2 className={styles.createForm.h2}>
        Add New Book
      </h2>
      <form onSubmit={createBookHandler} className="space-y-4">
        {/* Title Input */}
        <div>
          <label
            htmlFor="title"
            className={styles.createForm.label}
          >
            Book Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="e.g., The Hobbit"
            className={styles.createForm.input}
            required
          />
        </div>

        {/* Author Input */}
        <div>
          <label
            htmlFor="author"
            className={styles.createForm.label}
          >
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            placeholder="e.g., J.R.R. Tolkien"
            className={styles.createForm.input}
            required
          />
        </div>

        {/* Genre Input */}
        <div>
          <label
            htmlFor="genre"
            className={styles.createForm.label}
          >
            Genre
          </label>
          <input
            type="text"
            id="genre"
            name="genre"
            placeholder="e.g., Fantasy, Sci-Fi, Thriller"
            className={styles.createForm.input}
            required
          />
        </div>

        {/* Release Date Input */}
        <div>
          <label
            htmlFor="releaseDate"
            className={styles.createForm.label}
          >
            Release Date
          </label>
          <input
            type="date"
            id="releaseDate"
            name="releaseDate"
            className={styles.createForm.input}
            required
          />
        </div>

        {/* Summary Textarea */}
        <div>
          <label
            htmlFor="summary"
            className={styles.createForm.label}
          >
            Summary
          </label>
          <textarea
            id="summary"
            name="summary"
            rows="4"
            placeholder="Provide a brief summary of the book..."
            className={styles.createForm.input}
            required
          ></textarea>
        </div>

        {/* Image URL Input */}
        <div>
          <label
            htmlFor="img"
            className={styles.createForm.label}
          >
            {imageUpload ? "Image Upload" : "Image URL"}
          </label>
          <button
            type="button"
            onClick={imageUploadClickHandler}
            className={styles.createForm.fileBtn}
          >
            {imageUpload ? "Image URL" : "Image Upload"}
          </button>
          {imageUpload ? (
            <input
              type="file"
              id="img"
              name="img"
              onChange={imageChangeHandler}
              className={styles.createForm.input}
              required
            />
          ) : (
            <input
              type="url"
              id="img"
              name="img"
              placeholder="https://example.com/book-cover.jpg"
              onChange={imageUrlChangeHandler}
              className={styles.createForm.input}
              required
            />
          )}
          {imagePreview && (
            <div className="mt-4 flex justify-center">
              <img
                src={imagePreview}
                alt={imageName}
                className={styles.createForm.img}
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={styles.createForm.btn}
        >
          Create
        </button>
      </form>
    </div>
  );
}

