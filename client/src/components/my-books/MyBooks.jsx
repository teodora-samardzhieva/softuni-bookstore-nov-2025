import { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import useRequest from "../../hooks/useRequest";
import { Link } from "react-router";

export default function MyBooks() {
  const { user } = useUserContext();
  const { request } = useRequest();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (!user?._id || !user?.accessToken) return;

    const urlSearchParams = new URLSearchParams({
      where: `_ownerId="${user._id}"`, // Filter by the user's ID
    });

    // Get only books created by this user
    request(`/data/books?${urlSearchParams.toString()}`)
      .then((result) => {
        setBooks(result); 
      })
      .catch((err) => {
        console.error("Error fetching author's books:", err);
      });
  }, [user]);

  if (!user) {
    return (
      <h2 className="text-center text-red-500 mt-10">You must be logged in</h2>
    );
  }

  return (
    <section className="mt-40 px-10">
      <h1 className="text-4xl font-serif font-extrabold text-center mb-20">My Books</h1>

      {books.length === 0 && (
        <h2 className="text-gray-600 text-center text-xl">
          You haven't created any books yet.
        </h2>
      )}

      <div className="grid grid-cols-4 w-300 mx-auto gap-6">
        {books.map((book) => (
          <div key={book._id} className="shadow p-4 rounded-md border bg-pink-100">
            <img
              src={book.img}
              alt={book.title}
              className="w-full h-60 object-cover rounded-md mb-3"
            />

            <div className="flex flex-wrap">
              <h2 className="text-xl font-bold">{book.title}</h2>
              <p className="text-gray-500">{book.category}</p>
            </div>

            <Link
              to={`/books/${book._id}/details`}
              className="block text-blue-500 mt-3 underline hover:text-blue-800"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
