import { useState } from "react";
import BookGrid from "./BookGrid.jsx";
import Search from "./Search.jsx";
import { styles } from "../../assets/styles/styles.js";

export default function Catalog() {
   const [search, setSearch] = useState("");

  return (
    <div className="App">
      <h1 className={styles.catalog.h1}>Book Collection</h1>
      <Search onSearch={setSearch}/>
      <BookGrid 
        search={search} 
      />
    </div>
  );
}

