import { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (book) => {
    setFavorites((prev) => {
      if (prev.some((b) => b._id === book._id)) return prev; // ignore duplicates
      return [...prev, book];
    });
  };

  const removeFavorite = (bookId) => {
    setFavorites((prev) => prev.filter((b) => b._id !== bookId));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
