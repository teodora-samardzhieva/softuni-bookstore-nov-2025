export default function DetailsComments({
  comments
}) {

  return (
    <div>
        <ul className="space-y-4 mb-8">
        {comments.map((comment) => (
            <li key={comment._id} style={comment.pending ? {color: 'gray'} : {}} className="p-4 bg-gray-100 rounded-lg shadow">
            <p className="text-sm text-gray-600 mb-1">
                {/* Author:{" "} */}
                <span className="text-lg font-bold text-blue-500">
                {/* {comment.author?.email}  */}
                {comment.author?.username} 
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
