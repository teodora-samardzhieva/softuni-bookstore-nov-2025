import { useState } from "react";
import BookGrid from "./BookGrid.jsx";
import Search from "./Search.jsx";
import { styles } from "../../assets/styles/styles.js";

export default function Catalog() {
  const [search, setSearch] = useState("");

  const [sortOrder, setSortOrder] = useState("Newest");
  const getSortButtonClass = (currentOrder) =>
    sortOrder === currentOrder
      ? "text-blue-600 font-bold"
      : "text-gray-500 hover:text-gray-900";

  return (
    <div className="App">
      <h1 className={styles.catalog.h1}>Book Collection</h1>
      <Search onSearch={setSearch} />

      <div className="flex justify-center items-center space-x-4 mb-6 pt-4 text-sm pb-5">
        <span className="font-semibold text-gray-800">Sort By:</span>

        {/* sort by creation date */}
        <button
          onClick={() => setSortOrder("Newest")}
          className={getSortButtonClass("Newest")}
        >
          Newest
        </button>
        <button
          onClick={() => setSortOrder("Oldest")}
          className={getSortButtonClass("Oldest")}
        >
          Oldest
        </button>

        {/* sort by title */}
        <button
          onClick={() => setSortOrder("TitleAsc")}
          className={getSortButtonClass("TitleAsc")}
        >
          A-Z
        </button>
        <button
          onClick={() => setSortOrder("TitleDesc")}
          className={getSortButtonClass("TitleDesc")}
        >
          Z-A
        </button>
      </div>
      <BookGrid search={search} sortOrder={sortOrder} />
    </div>
  );
}
