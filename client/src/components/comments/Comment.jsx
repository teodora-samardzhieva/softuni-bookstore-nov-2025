import { useParams } from "react-router";
import useRequest from "../../hooks/useRequest.js";
import useForm from "../../hooks/useForm.js";
import { styles } from "../../assets/styles/styles.js";
import {v4 as uuid} from 'uuid';

export default function Comment({ user, onCreateStart, onCreateEnd }) {
  const { bookId } = useParams();
  const { request } = useRequest();
  
  const submitHandler = async ({ comment }) => {
    const data = {
      _id: uuid(),
      message: comment,
      bookId,
    };

    onCreateStart(data);

    try {
      const newComment = await request("/data/comments", "POST", data);

      onCreateEnd(newComment);
      reset();
    } catch (error) {
      alert(error.message);
    }
  };

  // add comment (only for logged-in users, which are not creators of the current book)

  const { register, formAction, reset } = useForm(submitHandler, {
    comment: "",
  });

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
            {...register("comment")}
            placeholder="Write your comment here..."
            rows="4"
            required
            disabled={!user}
            className={styles.comments.textarea}
          ></textarea>
        </div>

        <button type="submit" className={styles.comments.btn}>
          Post
        </button>
      </form>
    </article>
  );
}
