"use client";

import React, { useContext } from "react";
import { FaFire, FaClock } from "react-icons/fa"; 
import RecipeContext from "../../lib/context/RecipeContext";
import RecipeCard from "../app/components/RecipeCard";

const Page = () => {
  const { recipes, loading } = useContext(RecipeContext);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-lg text-[#D97706] animate-pulse">Loading recipes...</p>
      </div>
    );
  }

  const recentRecipes = [...recipes]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  const quickMeals = recipes
    .filter((r) => parseInt(r.cookingTime, 10) <= 15)
    .slice(0, 4);

  return (
    <div className="container mx-auto p-4 bg-[#FFFBEF] min-h-screen">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-[#D97706] flex items-center justify-center gap-2">
          <FaFire className="text-[#65A30D]" /> Discover Recipes
        </h1>
        <p className="text-[#1F2937] mt-2">Fresh meals to inspire your next dish</p>
      </header>

      {/* Quick Meals Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-[#1F2937] flex items-center gap-2">
          <FaClock className="text-[#65A30D]" /> Quick Meals
        </h2>
        {quickMeals.length === 0 ? (
          <p className="text-[#D97706]">No quick meals yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            {quickMeals.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        )}
      </section>

      {/* Recently Added Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-[#1F2937] flex items-center gap-2">
          <FaFire className="text-[#F43F5E]" /> Recently Added
        </h2>
        {recentRecipes.length === 0 ? (
          <p className="text-[#D97706]">No recent recipes yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            {recentRecipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Page;
