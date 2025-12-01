import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import useForm from "../../hooks/useForm.js";
import useRequest from "../../hooks/useRequest.js";
import { styles } from "../../assets/styles/styles.js";

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
    <div className={styles.createForm.container}>
      <h2 className={styles.createForm.h2}>
        Edit Book
      </h2>
      <form 
        action={formAction}    
        className="space-y-4">
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
           {...register('title')}
            placeholder="The Hobbit"
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
           {...register('author')}
            placeholder="J.R.R. Tolkien"
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
            {...register('genre')}
            placeholder="Fantasy, Sci-Fi, Thriller"
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
            {...register('releaseDate')}
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
            {...register('summary')}
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
            Image URL
          </label>
          <input
            type="url" // Use type="url" for better validation
            id="img"
            {...register('img')}
            placeholder="https://example.com/book-cover.jpg"
            className={styles.createForm.input}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={styles.createForm.btn}
        >
          Save
        </button>
      </form>
    </div>
  );
}
