import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import useForm from "../../hooks/useForm.js";
import useRequest from "../../hooks/useRequest.js";
import { styles } from "../../assets/styles/styles.js";
import { Star } from "lucide-react";

const initialValues = {
  title: "",
  author: "",
  genre: "",
  releaseDate: "",
  rating: 0,
  summary: "",
  img: "",
};

export default function Edit() {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const { request } = useRequest();

  const editBookHandler = async (values) => {
    const bookData = {
      ...values,
      rating: Number(values.rating) || 0,
      _updatedOn: Date.now(),
    };

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
    setValues,
  } = useForm(editBookHandler, initialValues);

  useEffect(() => {
    request(`/data/books/${bookId}`)
      .then((result) => {
        setValues({
          title: result.title || "", 
          author: result.author || "", 
          genre: result.genre || "", 
          releaseDate: result.releaseDate || "", 
          rating: Number(result.rating) || 0, 
          summary: result.summary || "", 
          img: result.img || "", 
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [bookId, setValues]);

  return (
    <div className={styles.createForm.container}>
      <h2 className={styles.createForm.h2}>Edit Book</h2>
      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="title" className={styles.createForm.label}>
            Book Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title")}
            placeholder="The Hobbit"
            className={styles.createForm.input}
            required
          />
        </div>

        <div>
          <label htmlFor="author" className={styles.createForm.label}>
            Author
          </label>
          <input
            type="text"
            id="author"
            {...register("author")}
            placeholder="J.R.R. Tolkien"
            className={styles.createForm.input}
            required
          />
        </div>

        <div>
          <label htmlFor="genre" className={styles.createForm.label}>
            Genre
          </label>
          <input
            type="text"
            id="genre"
            {...register("genre")}
            placeholder="Fantasy, Sci-Fi, Thriller"
            className={styles.createForm.input}
            required
          />
        </div>

        <div>
          <label htmlFor="releaseDate" className={styles.createForm.label}>
            Release Date
          </label>
          <input
            type="date"
            id="releaseDate"
            {...register("releaseDate")}
            className={styles.createForm.input}
            required
          />
        </div>

        <div className={styles.detailsForm.formItem}>
          <label htmlFor="rating" className={styles.detailsForm.formLabel}>
            Rating
          </label>
          <div className={styles.detailsForm.ratingContainer}>
            <div className={styles.detailsForm.starsContainer}>
              {[1, 2, 3, 4, 5].map((value) => (
                <span
                  key={value}
                  className="text-gray-400 cursor-default"
                  aria-label={`Rate: ${value} star${value !== 1 ? "s" : ""}`}
                >
                  <Star className={`w-5 h-5 `} />
                </span>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="summary" className={styles.createForm.label}>
            Summary
          </label>
          <textarea
            id="summary"
            {...register("summary")}
            rows="4"
            placeholder="Provide a brief summary of the book..."
            className={styles.createForm.input}
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="img" className={styles.createForm.label}>
            Image URL
          </label>
          <input
            type="url" // Use type="url" for better validation
            id="img"
            {...register("img")}
            placeholder="https://example.com/book-cover.jpg"
            className={styles.createForm.input}
            required
          />
        </div>

        <button type="submit" className={styles.createForm.btn}>
          Save
        </button>
      </form>
    </div>
  );
}
