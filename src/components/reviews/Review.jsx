import { useParams } from "react-router";
import { useState } from "react";
import useRequest from "../../hooks/useRequest.js";
import { Star } from "lucide-react";
import { toast } from "react-toastify";

export default function Review({ user, onCreateStart, onCreateEnd }) {
  const { bookId } = useParams();
  const { request } = useRequest();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("You must be logged in to rate or leave a review.");
    if (!rating && !reviewText.trim())
      toast.error("Please select a rating or write a review before saving.");

    // const data = {
    //   bookId,
    //   userId: user._id,
    //   rating,
    // };

    const data = {
      bookId,
      userId: user._id,
      rating,
      message: reviewText?.trim() || undefined,
      author: { _id: user._id, username: user.username, email: user.email },
    };

    onCreateStart && onCreateStart(data);

    try {
      const newRating = await request("/data/ratings", "POST", data);
      onCreateEnd && onCreateEnd(newRating);
    } catch (error) {
      // alert(error.message || error);
      toast.error('Rating failed')
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="flex flex-col space-y-3">
        <h3 className="font-semibold text-gray-700">Your Rating:</h3>
        <textarea
          className="w-full h-24 p-2 bg-white text-gray-700 placeholder-gray-500 border rounded resize-none focus:outline-none"
          placeholder="Write your review here..."
          disabled={!user}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />

        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => setRating(i)}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(0)}
                className="focus:outline-none px-1"
              >
                <Star
                  className={`w-6 h-6 ${
                    (hover || rating) >= i
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-150"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
