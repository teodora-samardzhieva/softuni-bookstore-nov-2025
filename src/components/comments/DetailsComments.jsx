import { useUserContext } from "../../context/UserContext.jsx";

export default function DetailsComments({ comments, onDeleteComment }) {
  const { user } = useUserContext();

  const currentUserId = user?._id;

  return (
    <div>
      <ul className="space-y-4 mb-8">
        {comments.map((comment) => {
          const isOwner = currentUserId && currentUserId === comment._ownerId;

          return (
            <li
              key={comment._id}
              style={comment.pending ? { color: "gray" } : {}}
              className="p-4 bg-gray-100 rounded-lg relative"
            >
              <div className="flex justify-between items-start mb-1">
                <p className="text-sm text-gray-600">
                  <span className="text-lg font-bold text-blue-500">
                    {comment.author?.username || "Anonymous"}
                  </span>
                </p>
                <span className="text-xs text-gray-500 flex-shrink-0 ml-4">
                  {new Date(comment._createdOn).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700 mt-3">{comment.message}</p>
              {isOwner && (
                <div className="mt-7">
                  <button
                    className="absolute bottom-2 right-4 text-red-500 hover:text-red-700 text-sm font-semibold"
                    onClick={() => onDeleteComment(comment._id)}
                    aria-label="Delete comment"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {comments.length === 0 && (
        <p className="text-gray-600 text-center mb-10">No comments.</p>
      )}
    </div>
  );
}
