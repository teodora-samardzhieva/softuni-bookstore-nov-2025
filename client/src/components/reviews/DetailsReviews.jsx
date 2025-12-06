export default function DetailsReviews({ reviews = [] }) {
  if (!Array.isArray(reviews) || reviews.length === 0) {
    return <p className="text-gray-600 text-center mb-10">No reviews.</p>;
  }

  return (
    <div>
      <ul className="space-y-4 mb-8">
        {reviews.map((r) => (
          <li
            key={r._id || `${r.userId}-${r.rating}-${r._createdOn || ""}`}
            style={r.pending ? { opacity: 0.7 } : {}}
            className="p-4 bg-gray-100 rounded-lg shadow"
          >
            <p className="text-sm text-gray-600 mb-1">
              Reviewer:{" "}
              <span className="font-medium text-gray-800">
                {r.author?.username ||
                  r.author?.email ||
                  r.userId ||
                  "Anonymous"}
              </span>
            </p>

            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 mr-1 ${
                    r.rating >= i ? "text-amber-400" : "text-gray-300"
                  }`}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 .587l3.668 7.431L23.4 9.75l-5.7 5.555L19.335 24 12 19.771 4.665 24l1.635-8.695L.6 9.75l7.732-1.732L12 .587z" />
                </svg>
              ))}
              <span className="ml-2 text-sm text-gray-600">{r.rating} / 5</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
