import BookGrid from "./BookGrid.jsx";
import Search from "./Search.jsx";

const DUMMY_BOOKS = [
  {
    id: 'b1',
    title: 'Пътеводител на галактическия стопаджия',
    imageUrl: 'https://www.book.store.bg/prdimg/300121556/pytevoditel-na-istoricheskia-stopadzhia.avif',
  },
  {
    id: 'b2',
    title: '1984',
    imageUrl: 'https://www.book.store.bg/prdimg/295549/1984.avif',
  },
  {
    id: 'b3',
    title: 'Малкият принц',
    imageUrl: 'https://www.book.store.bg/prdimg/301872/malkiat-princ.avif',
  },
  {
    id: 'b4',
    title: 'Властелинът на пръстените',
    imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1566425108l/33.jpg',
  },
  {
    id: 'b5',
    title: 'Хобит',
    imageUrl: 'https://www.book.store.bg/prdimg/40935/hobit-bilbo-begins-ili-do-tam-i-obratno-dzh-r-r-tolkin.avif',
  },
  {
    id: 'b6',
    title: 'Убийство в Ориент Експрес',
    imageUrl: 'https://www.book.store.bg/prdimg/38729/ubijstvo-v-orient-ekspres.avif',
  },
  {
    id: 'b7',
    title: 'Хари Потър и Даровете на Смъртта',
    imageUrl: 'https://www.book.store.bg/prdimg/20797/hari-potyr-i-darovete-na-smyrtta.avif',
  },
  {
    id: 'b8',
    title: 'Престъпление и наказание',
    imageUrl: 'https://www.book.store.bg/prdimg/5930/prestyplenie-i-nakazanie.avif',
  },
];


export default function Catalog() {
  const handleDetailsClick = (bookId) => {
    console.log(`Open details for book ID: ${bookId}`);
    // Тук бихте навигирали до страницата с детайли за книгата
    // e.g., navigate(`/books/${bookId}`);
  };

  const handleBookmarkClick = (bookId) => {
    console.log(`Bookmark book ID: ${bookId}`);
    // Тук бихте добавили/премахнали книга от списъка със запазени
  };

  return (
    <div className="App">
      <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-indigo-800 tracking-wide text-center py-8 border-b-2 border-indigo-200 mb-6 mt-30">Book Collection</h1>
      <Search />
      <BookGrid 
        books={DUMMY_BOOKS} 
        onDetails={handleDetailsClick}
        onBookmark={handleBookmarkClick}
      />
    </div>
  );
}

