import { useEffect } from "react"; //useState
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

  // State for visual feedback during rating selection
  // const [hoverRating, setHoverRating] = useState(0); 

  const editBookHandler = async (values) => {
    const bookData = { ...values, rating: Number(values.rating) || 0, _updatedOn: Date.now() };

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
    setValues,
    // values
  } = useForm(editBookHandler, initialValues);

  // Custom handler to update the rating value in the useForm state
  // const handleRatingClick = (ratingValue) => {
  //   setValues(prevValues => ({
  //       ...prevValues,
  //       rating: ratingValue
  //   }));
  // };

  // useEffect(() => {
  //   request(`/data/books/${bookId}`)
  //     .then((result) => {
  //       // Ensure rating is treated as a number
  //       result.rating = Number(result.rating) || 0; 
  //       setValues(result);
  //     })
  //     .catch((err) => {
  //       alert(err.message);
  //     });
  // }, [bookId, setValues]);

  // Determine the active rating (hover or current value)
  // const activeRating = hoverRating || Number(values.rating) || 0;

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
        setValues({
          title: result.title || "",       // FIX: fallback to empty string
          author: result.author || "",     // FIX
          genre: result.genre || "",       // FIX
          releaseDate: result.releaseDate || "", // FIX
          rating: Number(result.rating) || 0,    // FIX: number
          summary: result.summary || "",   // FIX
          img: result.img || "",           // FIX
        });
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


           {/* Rating */}
        <div className={styles.detailsForm.formItem}>
                <label htmlFor="rating" className={styles.detailsForm.formLabel}>Rating</label>
                <div className={styles.detailsForm.ratingContainer}>
                  <div className={styles.detailsForm.starsContainer}>
                    {[1, 2, 3, 4, 5].map((value) => (
                      <span 
                      key={value}
                      className="text-gray-400 cursor-default"
                      aria-label={`Rate: ${value} star${value !== 1 ? 's' : ''}`}>
                        <Star className={`w-5 h-5 `} />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
         {/* Rating Picker (Now editable) */}
        {/* <div className={styles.detailsForm.formItem}>
          <label className={styles.detailsForm.formLabel}>Rating</label>
          <div className={styles.detailsForm.ratingContainer}>
            <div className={styles.detailsForm.starsContainer}>
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                    key={value}
                    type="button" // Important: prevent form submission
                    onClick={() => handleRatingClick(value)}
                    onMouseEnter={() => setHoverRating(value)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 focus:outline-none"
                    aria-label={`Rate: ${value} star${value !== 1 ? 's' : ''}`}
                >
                    <Star
                      key={value}
                      className={`w-5 h-5 transition-colors duration-200 ${
                        activeRating >= value
                          ? styles.detailsForm.starFilled
                          : styles.detailsForm.starEmpty
                      }`}
                    />
                </button>
              ))}
              {/* Optional: Display current selected rating */}
              {/* <span className="ml-2 text-sm text-gray-500">
                ({Number(values.rating || 0).toFixed(0)} / 5)
              </span>
              // Hidden input to ensure 'rating' is submitted with useForm 
              <input type="hidden" {...register('rating')} /> 
            </div>
          </div>
        </div> */}

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
