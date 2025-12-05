import { useParams } from "react-router";
import useRequest from "../../hooks/useRequest.js";
// import { useUserContext } from "../../context/UserContext.jsx";
import { v4 as uuid } from "uuid";
import useForm from "../../hooks/useForm.js";
import { Star } from "lucide-react";

export default function Review({ user, onCreateStart, onCreateEnd }) {
  const { bookId } = useParams();
  const { request } = useRequest();
//   const { isAuthenticated } = useUserContext();

  const submitHandler = async ({ review }) => {
    const data = {
      _id: uuid(),
      bookId,
      message: review,
    //   rating: review,
    };

    onCreateStart(data);

    try {
      const newRating = await request("/data/ratings", "POST", data);

      onCreateEnd(newRating);
    } catch (error) {
      alert(error.message);
    }
  };

  const { register, formAction } = useForm(submitHandler, {
    review: "",
  });

  return (
    <form action={formAction}>
      <div className="relative border border-gray-300 rounded-lg bg-gray-50 p-3">
        {/* Text Input Area */}
        <textarea
          className="w-full h-24 p-2 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none resize-none"
          placeholder="Write your review here..."
          disabled={!user}
          // value={commentText}
          {...register("review")}
        />

        <div className="mt-2 flex justify-between items-center border-t pt-2">
          <div className="flex space-x-2">
            {/* <button
              type="button"
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
              onClick={() => {
                // setCommentText(''); setRating(0);
              }} // Assuming a cancel function
            >
              cancel
            </button> */}
            <button
              type="submit"
              className="px-4 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-150"
              // onClick={submitReview}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

// import { Star } from "lucide-react";

// const StarDisplay = ({ rating }) => {
//   const fullStars = Math.floor(rating);
//   const stars = [];

//   // Full stars
//   for (let i = 0; i < 5; i++) {
//     const isFilled = i < fullStars;
//     stars.push(
//       <Star
//         key={i}
//         className={`w-4 h-4 ${isFilled ? "text-amber-400 fill-amber-400" : "text-gray-300"}`}
//       />
//     );
//   }

//   return <div className="flex space-x-0.5">{stars}</div>;
// };

// export default function Review({ review }) {
//   // Assuming 'review' object has:
//   // review.user (with .username), review.rating, and optionally review.text (like a comment body)

//   // NOTE: Your current data structure seems to separate 'ratings' and 'comments'.
//   // This component assumes you've combined them or are only showing the rating.
//   // For simplicity, I'll use a placeholder for the username/avatar as your screenshot shows.

//   return (
//     <div className="flex border-b border-gray-100 py-4 last:border-b-0">
//       <div className="flex-shrink-0 mr-4">
//         {/* Replace with actual avatar/user info if available */}
//         <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">
//           {review.author?.username.charAt(0).toUpperCase() || "U"}
//         </div>
//       </div>
//       <div className="flex-grow">
//         <div className="flex items-center justify-between">
//           <p className="font-semibold text-gray-800">
//             {review.author?.username || "Anonymous User"}
//           </p>
//           <p className="text-xs text-gray-500">
//             {new Date(review._createdOn).toLocaleDateString()}
//           </p>
//         </div>
//         <div className="flex items-center mt-1">
//           <StarDisplay rating={review.rating} />
//           <span className="ml-2 text-sm text-gray-600">({review.rating}.0)</span>
//         </div>
//         {review.text && ( // Display review text if available
//             <p className="mt-2 text-gray-700">{review.text}</p>
//         )}
//       </div>
//     </div>
//   );
// }
