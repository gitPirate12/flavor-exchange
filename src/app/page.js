"use client";

import React, { useContext, useEffect, useState, useRef } from "react";
import { FaFire, FaClock, FaLeaf, FaSearch } from "react-icons/fa";
import { GiCookingPot } from "react-icons/gi";
import RecipeContext from "../lib/context/RecipeContext";
import RecipeCard from "../components/RecipeCard";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { recipes, loading } = useContext(RecipeContext);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const initialLoadRef = useRef(true);

  // Redirect if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") router.push("/sign-in");
  }, [status, router]);

  // Handle initial load and filtering
  useEffect(() => {
    if (loading || !recipes.length || status === "loading") return;

    if (initialLoadRef.current) {
      setFilteredRecipes(recipes);
      const timer = setTimeout(() => {
        setIsInitialLoad(false);
        initialLoadRef.current = false;
      }, 800);
      return () => clearTimeout(timer);
    }

    // Apply search filter
    const filtered = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredRecipes(filtered);
  }, [loading, recipes, status, searchQuery]);

  // Loading state
  if (status === "loading" || isInitialLoad || loading) {
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

  // Filtered recipe sections
  const quickMeals = filteredRecipes
    .filter(r => parseInt(r.cookingTime, 10) <= 15)
    .slice(0, 4);

  const recentRecipes = [...filteredRecipes]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FFFBEF]">
      {/* Hero Section */}
      <div className="bg-[#D97706]/5 py-12 px-4 sm:px-6 lg:px-8 border-b border-[#D97706]/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-[#65A30D]/10 px-4 py-2 rounded-full mb-4">
              <FaLeaf className="text-[#65A30D] mr-2" />
              <span className="text-sm font-medium text-[#65A30D]">Fresh Recipes Daily</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F2937] mb-3">
              Discover <span className="text-[#D97706]">Delicious</span> Creations
            </h1>
            <p className="text-base sm:text-lg text-[#1F2937]/80 max-w-2xl mx-auto">
              Explore handcrafted recipes for your next culinary adventure
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-[#1F2937]/50" />
            </div>
            <input
              type="text"
              placeholder="Search recipes or tags..."
              className="block w-full pl-10 pr-4 py-3 border border-[#D97706]/20 rounded-lg bg-white focus:ring-2 focus:ring-[#D97706]/50 focus:border-[#D97706]/50 transition-all duration-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Meals Section */}
        <section className="mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
            <div className="flex items-center gap-3 mb-3 sm:mb-0">
              <div className="p-2 bg-[#65A30D]/10 rounded-full">
                <FaClock className="text-[#65A30D] text-lg" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1F2937]">
                Quick & Easy Meals
              </h2>
            </div>
            <button 
              onClick={() => setSearchQuery("quick")}
              className="text-sm font-medium text-[#D97706] hover:underline"
            >
              View all quick meals
            </button>
          </div>

          {quickMeals.length > 0 ? (
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {quickMeals.map(recipe => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-6 sm:p-8 text-center border border-[#D97706]/20">
              <GiCookingPot className="mx-auto text-4xl text-[#D97706]/50 mb-4" />
              <h3 className="text-lg sm:text-xl font-medium text-[#1F2937] mb-2">
                No quick meals found
              </h3>
              <p className="text-[#1F2937]/60">
                {searchQuery ? "Try a different search" : "Check back soon for quick recipes!"}
              </p>
            </div>
          )}
        </section>

        {/* Recently Added Section */}
        <section className="mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
            <div className="flex items-center gap-3 mb-3 sm:mb-0">
              <div className="p-2 bg-[#F43F5E]/10 rounded-full">
                <FaFire className="text-[#F43F5E] text-lg" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1F2937]">
                Recently Added
              </h2>
            </div>
            <button 
              onClick={() => router.push("/recipes")}
              className="text-sm font-medium text-[#D97706] hover:underline"
            >
              Browse all recipes
            </button>
          </div>

          {recentRecipes.length > 0 ? (
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {recentRecipes.map(recipe => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-6 sm:p-8 text-center border border-[#D97706]/20">
              <GiCookingPot className="mx-auto text-4xl text-[#D97706]/50 mb-4" />
              <h3 className="text-lg sm:text-xl font-medium text-[#1F2937] mb-2">
                No recipes found
              </h3>
              <p className="text-[#1F2937]/60">
                {searchQuery ? "No matches for your search" : "Our chefs are cooking something special!"}
              </p>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="bg-[#D97706]/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center border border-[#D97706]/20">
          <h3 className="text-xl sm:text-2xl font-bold text-[#1F2937] mb-3">
            Share Your Culinary Creations
          </h3>
          <p className="text-[#1F2937]/80 mb-6 max-w-2xl mx-auto">
            Have a special recipe to share? Contribute to our growing community!
          </p>
          <button
            onClick={() => router.push("/add-recipe")}
            className="bg-[#D97706] hover:bg-[#B65D04] text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-200 inline-flex items-center gap-2"
          >
            <GiCookingPot />
            Add Your Recipe
          </button>
        </section>
      </div>
    </div>
  );
};

export default Page;