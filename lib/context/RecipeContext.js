import { createContext, useState, useEffect } from "react";
import axios from "axios";


const RecipeContext = createContext({
  recipes: [],
  addRecipe: () => {},
  deleteRecipe: () => {},
  updateRecipe: () => {},
  addRating: () => {}, // New: Add rating
  updateRating: () => {}, // New: Update rating
});

export function RecipeProvider({ children }) {
  // State to hold the Recipes
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  

  // Fetch recipes when the app loads (client-side)
  useEffect(() => {
    async function getRecipes() {
      try {
        const response = await axios.get("/api/recipes", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        setRecipes(response.data);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    }
    getRecipes();
  }, []);

  // Function to add a recipe
  const addRecipe = async (recipe) => {
    try {
      const response = await axios.post("/api/recipes", recipe, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setRecipes((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Failed to add recipe:", error);
    }
  };

  // Function to delete a recipe
  const deleteRecipe = async (recipeId) => {
    try {
      await axios.delete(`/api/recipes/${recipeId}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setRecipes((prev) => prev.filter((recipe) => recipe._id !== recipeId));
    } catch (error) {
      console.error("Failed to delete recipe:", error);
    }
  };

  // Function to update a recipe
  const updateRecipe = async (recipeId, updatedRecipe) => {
    try {
      const response = await axios.put(
        `/api/recipes/${recipeId}`,
        updatedRecipe,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setRecipes((prev) =>
        prev.map((recipe) => (recipe._id === recipeId ? response.data : recipe))
      );
    } catch (error) {
      console.error("Failed to update recipe:", error);
    }
  };

  // Function to add a rating
  const addRating = async (recipeId, rating) => {
    try {
      const response = await axios.post(
        `/api/recipes/${recipeId}/rate`,
        { value: rating },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setRecipes((prev) =>
        prev.map((recipe) => (recipe._id === recipeId ? response.data : recipe))
      );
      return response.data; // Return updated recipe for local state
    } catch (error) {
      console.error("Failed to add rating:", error);
      throw error.response?.data?.error || "Failed to add rating";
    }
  };

  // Function to update a rating
  const updateRating = async (recipeId, rating) => {
    try {
      const response = await axios.put(
        `/api/recipes/${recipeId}/rate`,
        { value: rating },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setRecipes((prev) =>
        prev.map((recipe) => (recipe._id === recipeId ? response.data : recipe))
      );
      return response.data; // Return updated recipe for local state
    } catch (error) {
      console.error("Failed to update rating:", error);
      throw error.response?.data?.error || "Failed to update rating";
    }
  };

  // Wrap the app with the Provider, giving it the recipes and functions
  return (
    <RecipeContext.Provider
      value={{ recipes, addRecipe, deleteRecipe, updateRecipe, addRating,
        updateRating }}
    >
      {children} 
    </RecipeContext.Provider>
  );

}

export default RecipeContext;