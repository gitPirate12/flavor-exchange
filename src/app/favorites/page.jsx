"use client";

import React, { useContext, useEffect, useState } from "react";
import RecipeCard from "../../components/RecipeCard";
import FavoritesContext from "../../lib/context/FavoritesContext";
import { FaHeart, FaSearch, FaSadTear } from "react-icons/fa";
import { GiCookingPot } from "react-icons/gi";
import SearchBar from "../../components/SearchBar";

const Page = () => {
  const { favorites, loading } = useContext(FavoritesContext);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [filteredFavorites, setFilteredFavorites] = useState([]);

  // Handle initial load timing
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Set initial filtered favorites when favorites change
  useEffect(() => {
    if (loading || !favorites.length) return;

    setFilteredFavorites(
      [...favorites].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    );
  }, [favorites, loading]);

  // Loading state
  if (loading || isInitialLoad) {
    return (
      <div className="min-h-screen bg-[#FFFBEF] flex items-center justify-center px-4 sm:px-6">
        <div className="text-center">
          <GiCookingPot className="mx-auto text-4xl text-[#D97706] animate-bounce mb-4" />
          <p className="text-xl font-medium text-[#1F2937]">
            Gathering your favorite recipes...
          </p>
        </div>
      </div>
    );
  }

  // Callback for SearchBar to update filtered favorites
  const handleFilter = (filtered) => {
    setFilteredFavorites(
      [...filtered].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    );
  };

  return (
    <div className="min-h-screen bg-[#FFF9F1] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-[#F43F5E]/20 px-6 py-3 rounded-full mb-4">
            <FaHeart className="text-[#F43F5E] mr-2 text-xl" />
            <span className="text-lg font-medium text-[#F43F5E]">Your Saved Recipes</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1F2937] mb-3">
            My <span className="text-[#D97706]">Favorite</span> Creations
          </h1>
          <p className="text-lg sm:text-xl text-[#1F2937]/80 max-w-2xl mx-auto">
            All the recipes you've loved in one delicious collection
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-10 sm:mb-12 max-w-2xl mx-auto relative">
          <SearchBar onFilter={handleFilter} />
        </div>

        {/* Favorites Grid */}
        {filteredFavorites.length === 0 ? (
          <div className="bg-white rounded-xl p-8 sm:p-12 text-center border border-[#D97706]/20 max-w-2xl mx-auto shadow-lg">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-[#FFF9F1] rounded-full">
                <FaSadTear className="text-4xl text-[#D97706]/70" />
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1F2937] mb-3">
              {favorites.length === 0 ? "No Favorites Yet" : "No Matching Favorites"}
            </h2>
            <p className="text-[#1F2937]/80 mb-6">
              {favorites.length === 0
                ? "You haven't saved any recipes to your favorites collection."
                : "Try adjusting your search to find your favorite recipes."}
            </p>
            {favorites.length === 0 && (
              <div className="flex items-center justify-center gap-3 text-[#1F2937]/60">
                <GiCookingPot className="text-[#65A30D]" />
                <span>Browse recipes and click the</span>
                <FaHeart className="text-[#F43F5E]" />
                <span>icon to save them here</span>
              </div>
            )}
            <button
              onClick={() => window.location.href = "/"}
              className="mt-6 bg-[#D97706] hover:bg-[#B65D04] text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 inline-flex items-center gap-2"
            >
              <FaSearch />
              Explore Recipes
            </button>
          </div>
        ) : (
          <>
            <div className="mb-8 sm:mb-10 text-right">
              <p className="text-[#1F2937]/80 inline-block bg-[#65A30D]/10 px-4 py-2 rounded-full">
                <span className="font-medium text-[#65A30D]">{filteredFavorites.length}</span>{" "}
                {filteredFavorites.length === 1 ? "recipe" : "recipes"} saved
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredFavorites.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
