import { useState } from "react";
import request from "../../utils/request.js";
import { useParams } from "react-router";

export default function Comment({
    user
}) {
    const [comment, setComment] = useState();
    const {bookId} = useParams();

    const changeHandler = (e) => {
        setComment(e.target.value);
    }

    const submitHandler = async () => {
        await request('/comments', 'POST', {
            author: user.email,
            message: comment,
            bookId,
        })

        setComment(''); // CLEAR the form
    }


  return (
    <article className="bg-gray-50 rounded-lg p-6 shadow-inner">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Add your comment
      </h3>

      <form action={submitHandler} className="space-y-4">
        <div>
          <label htmlFor="comment-textarea" className="sr-only">
            Comment text.....
          </label>
          <textarea
                id="comment-textarea"
                name="comment"
                placeholder="Write your comment here..."
                rows="4"
                required
                onChange={changeHandler}
                value={comment}
                // disabled={!user} 
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm 
                 focus:outline-none focus:ring-2 focus:ring-indigo-500 
                 text-gray-700"
              ></textarea>

        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-medium py-2 
               rounded-md shadow hover:bg-indigo-700 transition"
        >
          Post
        </button>
      </form>
    </article> 
  );
}
