import BookGrid from "./BookGrid.jsx";
import Search from "./Search.jsx";

export default function Catalog() {

  //TODO
  const handleBookmarkClick = (bookId) => {
    console.log(`Bookmark book ID: ${bookId}`);
    // Тук бихте добавили/премахнали книга от списъка със запазени
  };

  return (
    <div className="App">
      <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-indigo-800 tracking-wide text-center py-8 border-b-2 border-indigo-200 mb-6 mt-30">Book Collection</h1>
      <Search />
      <BookGrid 
        onBookmark={handleBookmarkClick}
      />
    </div>
  );
}

