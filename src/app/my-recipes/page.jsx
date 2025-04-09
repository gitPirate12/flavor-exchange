"use client";

import React, { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import RecipeContext from "../../lib/context/RecipeContext";
import RecipeCard from "../../components/RecipeCard";
import { GiCookingPot, GiMeal } from "react-icons/gi";
import { FaLeaf, FaSearch, FaFire, FaClock } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { IoFastFood } from "react-icons/io5";

const Page = () => {
  const router = useRouter();
  const { recipes, loading } = useContext(RecipeContext);
  const { data: session, status } = useSession();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Handle initial load timing
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter recipes based on search and ownership
  useEffect(() => {
    if (loading || status === "loading" || !recipes.length) return;

    const userId = session?.user?.id;
    let filtered = [...recipes]
      .filter(recipe => {
        const authorMatch = recipe.author?._id?.toString() === userId;
        const searchMatch =
          recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          recipe.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return authorMatch && (searchQuery === "" || searchMatch);
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFilteredRecipes(filtered);
  }, [recipes, loading, session, status, searchQuery]);

  // Loading state
  if (status === "loading" || loading || isInitialLoad) {
    return (
      <div className="min-h-screen bg-[#FFFBEF] flex items-center justify-center">
        <div className="text-center">
          <GiCookingPot className="mx-auto text-4xl text-[#D97706] animate-bounce mb-4" />
          <p className="text-xl font-medium text-[#1F2937]">
            Gathering your recipes...
          </p>
        </div>
      </div>
    );
  }

  // Filter quick meals from user's recipes
  const quickMeals = filteredRecipes
    .filter(r => parseInt(r.cookingTime, 10) <= 15)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FFFBEF]">
      {/* Hero Section */}
      <div className="bg-[#D97706]/5 py-12 px-4 sm:px-6 lg:px-8 border-b border-[#D97706]/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-[#65A30D]/10 px-4 py-2 rounded-full mb-4">
              <FaLeaf className="text-[#65A30D] mr-2" />
              <span className="text-sm font-medium text-[#65A30D]">My Recipe Collection</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F2937] mb-3">
              Your <span className="text-[#D97706]">Culinary</span> Creations
            </h1>
            <p className="text-base sm:text-lg text-[#1F2937]/80 max-w-2xl mx-auto">
              All the delicious recipes you've created in one place
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-[#1F2937]/50" />
            </div>
            <input
              type="text"
              placeholder="Search your recipes..."
              className="block w-full pl-10 pr-4 py-3 border border-[#D97706]/20 rounded-lg bg-white focus:ring-2 focus:ring-[#D97706]/50 focus:border-[#D97706]/50 transition-all duration-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Meals Section */}
        {quickMeals.length > 0 && (
          <section className="mb-12 sm:mb-16">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
              <div className="flex items-center gap-3 mb-3 sm:mb-0">
                <div className="p-2 bg-[#65A30D]/10 rounded-full">
                  <FaClock className="text-[#65A30D] text-lg" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1F2937]">
                  Your Quick Meals
                </h2>
              </div>
              <button 
                onClick={() => setSearchQuery("quick")}
                className="text-sm font-medium text-[#D97706] hover:underline"
              >
                View all your quick meals
              </button>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {quickMeals.map(recipe => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))}
            </div>
          </section>
        )}

        {/* All Recipes Section */}
        <section className="mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
            <div className="flex items-center gap-3 mb-3 sm:mb-0">
              <div className="p-2 bg-[#F43F5E]/10 rounded-full">
                <FaFire className="text-[#F43F5E] text-lg" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1F2937]">
                {quickMeals.length > 0 ? "All Your Recipes" : "Your Recipes"}
              </h2>
            </div>
            <div className="text-sm text-[#1F2937]/80">
              Showing {filteredRecipes.length} {filteredRecipes.length === 1 ? "recipe" : "recipes"}
            </div>
          </div>

          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredRecipes.map(recipe => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-6 sm:p-8 text-center border border-[#D97706]/20">
              <GiMeal className="mx-auto text-5xl text-[#D97706]/50 mb-4" />
              <h3 className="text-xl sm:text-2xl font-medium text-[#1F2937] mb-3">
                {recipes.length === 0
                  ? "Your recipe collection is empty"
                  : "No recipes match your search"}
              </h3>
              <p className="text-[#1F2937]/60 mb-6 max-w-md mx-auto">
                {recipes.length === 0
                  ? "Get started by creating your first recipe!"
                  : "Try adjusting your search terms"}
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Page;