import { useParams } from "react-router";
import useRequest from "../../hooks/useRequest.js";

export default function DetailsComments() {
  const { bookId } = useParams();


  const urlSearchParams = new URLSearchParams({
    where: `bookId="${bookId}"`,
    load: 'author=_ownerId:users'
  });
  // load: '_ownerId=author:users'
  
  //TODO fix refresh // remove = [] (without it its bad request)
  const {data:comments = [] } = useRequest(`/data/comments?${urlSearchParams.toString()}`, []);
 
  // useEffect(() => {
  //   request(`/data/comments`).then((result) => {
  //     const bookComments = Object.values(result).filter(
  //       (comment) => comment.bookId === bookId
  //     );
  //     setComments(bookComments);
  //   });
  // }, [bookId, refresh]);

  return (
    <div>
        <ul className="space-y-4 mb-8">
        {comments.map((comment) => (
            <li key={comment._id} className="p-4 bg-gray-100 rounded-lg shadow">
            <p className="text-sm text-gray-600 mb-1">
                Author:{" "}
                <span className="font-medium text-gray-800">
                {comment.author?.email}
                </span>
            </p>
            <p className="text-gray-700">{comment.message}</p>
            </li>
        ))}
        </ul>
        
        {comments.length === 0 && (
        <p className="text-gray-600 text-center mb-10">No comments.</p>
        )}
      </div>
  );
}
