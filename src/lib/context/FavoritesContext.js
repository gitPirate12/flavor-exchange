import { createContext, useState, useEffect } from "react";
import axios from "axios";


const FavoritesContext = createContext({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
});

export function FavoritesProvider({ children }) {
  // State to hold the favorites list
  const [favorites, setFavorites] = useState([]);

  // Fetch favorites when the app loads (client-side)
  useEffect(() => {
    async function getFavorites() {
      try {
        const response = await axios.get("/api/users/favorites", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        setFavorites(response.data);
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      }
    }
    getFavorites();
  }, []);

  // Function to add a favorite
  const addFavorite = async (recipeId) => {
    try {
      const response = await axios.post(
        "/api/users/favorites",
        { recipeId },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      
      setFavorites(response.data.favorites);
    } catch (error) {
      console.error("Failed to add favorite:", error);
    }
  };

  // Function to remove a favorite
  const removeFavorite = async (recipeId) => {
    try {
      const response = await axios.delete(`/api/users/favorites/${recipeId}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setFavorites(response.data.favorites);
    } catch (error) {
      console.error("Failed to remove favorite:", error);
    }
  };

  
  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;