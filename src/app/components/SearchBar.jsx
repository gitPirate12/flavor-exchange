"use client";

import React, { useContext, useState, useEffect, useCallback } from "react";
import RecipeContext from "../../../lib/context/RecipeContext";
import debounce from "lodash/debounce"; 

const SearchBar = ({ onFilter }) => {
  const { recipes } = useContext(RecipeContext);
  const [query, setQuery] = useState("");

  // Debounced filter function
  const debouncedFilter = useCallback(
    debounce((searchQuery) => {
      const filteredRecipes = recipes.filter((recipe) => {
        const lowerQuery = searchQuery.toLowerCase();
        const titleMatch = recipe.title.toLowerCase().includes(lowerQuery);
        const ingredientsMatch = recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(lowerQuery)
        );
        const tagsMatch = recipe.tags?.some((tag) =>
          tag.toLowerCase().includes(lowerQuery)
        );
        return titleMatch || ingredientsMatch || tagsMatch;
      });

      if (onFilter) {
        onFilter(filteredRecipes);
      }
    }, 300), 
    [recipes, onFilter] 
  );

  // Trigger filter when query changes
  useEffect(() => {
    debouncedFilter(query);
    return () => debouncedFilter.cancel(); 
  }, [query, debouncedFilter]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search recipes by title, ingredient, or tag..."
        className="w-full px-4 py-2 text-[#1F2937] bg-white border border-[#D97706]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-transparent placeholder-[#1F2937]/50"
      />
    </div>
  );
};

export default SearchBar;