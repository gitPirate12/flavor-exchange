"use client";

import React, { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import RecipeContext from "../../../lib/context/RecipeContext";
import RecipeCard from "../components/RecipeCard";
import { GiCookingPot } from "react-icons/gi";
import { FaLeaf, FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import SearchBar from "../components/SearchBar";

const Page = () => {
  const router = useRouter();
  const { recipes, loading } = useContext(RecipeContext);
  const { data: session, status } = useSession();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [filteredMyRecipes, setFilteredMyRecipes] = useState([]);

  // Handle initial load timing
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Set initial filtered recipes when recipes or session changes
  useEffect(() => {
    if (loading || status === "loading" || !recipes.length) return;

    const userId = session?.user?.id;
    const myRecipes = [...recipes]
      .filter((recipe) => {
        const authorId = recipe.author?._id?.toString();
        return authorId === userId;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFilteredMyRecipes(myRecipes);
  }, [recipes, loading, session, status]);

  // Handle loading states
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

  // Callback for SearchBar to update filtered recipes
  const handleFilter = (filtered) => {
    const userId = session?.user?.id;
    const userFilteredRecipes = filtered.filter((recipe) => {
      const authorId = recipe.author?._id?.toString();
      return authorId === userId;
    });
    setFilteredMyRecipes([...userFilteredRecipes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  };

  const handleAddRecipe = () => {
    router.push("/add-recipe");
  };

  return (
    <div className="min-h-screen bg-[#FFFBEF] py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#65A30D]/10 rounded-full">
              <FaLeaf className="text-[#65A30D] text-xl" />
            </div>
            <h1 className="text-3xl font-bold text-[#1F2937]">My Recipes</h1>
          </div>
          <button
            onClick={handleAddRecipe}
            className="flex items-center gap-2 bg-[#D97706] hover:bg-[#B65D04] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            <FaPlus />
            Add Recipe
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar onFilter={handleFilter} />
        </div>

        {filteredMyRecipes.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-[#D97706]/20">
            <GiCookingPot className="mx-auto text-5xl text-[#D97706]/50 mb-6" />
            <h3 className="text-2xl font-medium text-[#1F2937] mb-3">
              {recipes.length === 0
                ? "Your recipe collection is empty"
                : "No matching recipes found"}
            </h3>
            <p className="text-[#1F2937]/60 mb-6 max-w-md mx-auto">
              {recipes.length === 0
                ? "Start building your personal cookbook by adding your first recipe!"
                : "Try adjusting your search to find your recipes!"}
            </p>
            <button
              onClick={handleAddRecipe}
              className="bg-[#D97706] hover:bg-[#B65D04] text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-200"
            >
              Create Your First Recipe
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 flex justify-between items-center">
              <p className="text-[#1F2937]/80">
                Showing <span className="font-medium text-[#D97706]">{filteredMyRecipes.length}</span>{" "}
                {filteredMyRecipes.length === 1 ? "recipe" : "recipes"}
              </p>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMyRecipes.map((recipe) => (
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