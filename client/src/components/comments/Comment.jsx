import { useParams } from "react-router";
import useRequest from "../../hooks/useRequest.js";
import useForm from "../../hooks/useForm.js";

export default function Comment({
    user,
    onCreate
}) {
    const {bookId} = useParams();
    const { request } = useRequest();  


    const submitHandler = async ({comment}) => {
        try {
            
            await request('/data/comments', 'POST', {
                message: comment,
                bookId,
            });
    
            onCreate();
        } catch (error) {
            alert(error.message);
        }
    }

    // add comment (only for logged-in users, which are not creators of the current book)

    const { register, formAction } = useForm(submitHandler, {
      comment: ''
    })

  return (
    <article className="bg-gray-50 rounded-lg p-6 shadow-inner">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Add your comment
      </h3>

      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="comment-textarea" className="sr-only">
            Comment text.....
          </label>
          <textarea
                id="comment-textarea"
                {...register('comment')} 
                placeholder="Write your comment here..."
                rows="4"
                required
                disabled={!user}
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
