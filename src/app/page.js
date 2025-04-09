"use client";

import React, { useContext, useEffect, useState, useRef } from "react";
import { FaFire, FaClock, FaLeaf } from "react-icons/fa";
import { GiCookingPot } from "react-icons/gi";
import RecipeContext from "../../lib/context/RecipeContext";
import RecipeCard from "../app/components/RecipeCard";
import { useRouter } from "next/navigation";
import SearchBar from "./components/SearchBar";

const Page = () => {
  const router = useRouter();
  const { recipes, loading } = useContext(RecipeContext);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const initialLoadRef = useRef(true); // Track if initial setup has run

  // Handle initial load and set filtered recipes only once
  useEffect(() => {
    if (loading || !recipes.length) return; // Exit early if still loading or no recipes

    if (initialLoadRef.current) {
      setFilteredRecipes(recipes); // Set initial filtered recipes only once
      const timer = setTimeout(() => {
        setIsInitialLoad(false);
        initialLoadRef.current = false; // Mark initial load as complete
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [loading, recipes]); // Dependencies are stable with memoized context

  // Callback for SearchBar to update filtered recipes
  const handleFilter = (filtered) => {
    setFilteredRecipes(filtered);
  };

  if (isInitialLoad || loading) {
    return (
      <div className="min-h-screen bg-[#FFFBEF] flex items-center justify-center">
        <div className="text-center">
          <GiCookingPot className="mx-auto text-4xl text-[#D97706] animate-bounce mb-4" />
          <p className="text-xl font-medium text-[#1F2937]">
            Gathering fresh ingredients...
          </p>
        </div>
      </div>
    );
  }

  // Filter for Quick Meals (cooking time <= 15 minutes)
  const quickMeals = filteredRecipes
    .filter((r) => parseInt(r.cookingTime, 10) <= 15)
    .slice(0, 4);

  // Filter for Recently Added (sorted by createdAt)
  const recentRecipes = [...filteredRecipes]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  const handleRedirect = () => {
    router.push("/add-recipe");
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-[#FFFBEF] min-h-screen">
      {/* Hero Header */}
      <header className="mb-12 text-center">
        <div className="inline-flex items-center bg-[#65A30D]/10 px-6 py-2 rounded-full mb-4">
          <FaLeaf className="text-[#65A30D] mr-2" />
          <span className="text-sm font-medium text-[#65A30D]">Fresh Recipes Daily</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#1F2937] mb-3">
          Discover <span className="text-[#D97706]">Delicious</span> Creations
        </h1>
        <p className="text-lg text-[#1F2937]/80 max-w-2xl mx-auto">
          Explore our collection of handcrafted recipes to inspire your next culinary adventure
        </p>
      </header>

      {/* Search Bar */}
      <section className="mb-12">
        <SearchBar onFilter={handleFilter} />
      </section>

      {/* Quick Meals Section */}
      <section className="mb-14">
        <div className="flex items-center justify-between mb-6 px-2">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1F2937] flex items-center gap-3">
            <div className="p-2 bg-[#65A30D]/10 rounded-full">
              <FaClock className="text-[#65A30D]" />
            </div>
            <span>Quick & Easy Meals</span>
          </h2>
          <a href="#" className="text-sm font-medium text-[#D97706] hover:underline">
            View all
          </a>
        </div>

        {quickMeals.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center border border-[#D97706]/20">
            <GiCookingPot className="mx-auto text-4xl text-[#D97706]/50 mb-4" />
            <h3 className="text-lg font-medium text-[#1F2937] mb-2">No quick meals found</h3>
            <p className="text-[#1F2937]/60">Try adjusting your search or check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2">
            {quickMeals.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        )}
      </section>

      {/* Recently Added Section */}
      <section className="mb-14">
        <div className="flex items-center justify-between mb-6 px-2">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1F2937] flex items-center gap-3">
            <div className="p-2 bg-[#F43F5E]/10 rounded-full">
              <FaFire className="text-[#F43F5E]" />
            </div>
            <span>Recently Added</span>
          </h2>
          <a href="#" className="text-sm font-medium text-[#D97706] hover:underline">
            View all
          </a>
        </div>

        {recentRecipes.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center border border-[#D97706]/20">
            <GiCookingPot className="mx-auto text-4xl text-[#D97706]/50 mb-4" />
            <h3 className="text-lg font-medium text-[#1F2937] mb-2">No recent recipes found</h3>
            <p className="text-[#1F2937]/60">Try adjusting your search or check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2">
            {recentRecipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-[#D97706]/10 rounded-2xl p-8 text-center border border-[#D97706]/20 mx-2">
        <h3 className="text-2xl font-bold text-[#1F2937] mb-3">Share Your Own Recipe</h3>
        <p className="text-[#1F2937]/80 mb-6 max-w-2xl mx-auto">
          Have a special dish you'd like to share with our community? Add your recipe today!
        </p>
        <button
          onClick={handleRedirect}
          className="bg-[#D97706] hover:bg-[#B65D04] text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Add Recipe
        </button>
      </section>
    </div>
  );
};

export default Page;