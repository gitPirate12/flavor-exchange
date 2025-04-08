"use client";

import React, { useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import RecipeContext from "../../../../lib/context/RecipeContext";
import { toast } from "sonner";
import { 
  FaClock, 
  FaFire, 
  FaEdit, 
  FaTrash, 
  FaHeart, 
  FaRegHeart,
  FaUtensils,
  FaListUl,
  FaBookOpen,
  FaTag
} from "react-icons/fa";
import { GiCookingPot, GiKnifeFork } from "react-icons/gi";

const Page = () => {
  const { id } = useParams();
  const router = useRouter();
  const { recipes, loading, deleteRecipe } = useContext(RecipeContext);
  const [recipe, setRecipe] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false); // Temporary state for styling

  useEffect(() => {
    if (!loading && recipes.length > 0) {
      const foundRecipe = recipes.find((r) => r._id === id);
      setRecipe(foundRecipe || null);
    }
  }, [id, recipes, loading]);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this recipe?")) {
      try {
        await deleteRecipe(id);
        toast.success("Recipe deleted successfully!", {
          style: { background: "#65A30D", color: "#FFFBEF", border: "none" },
        });
        router.push("/");
      } catch (error) {
        toast.error("Failed to delete recipe", {
          style: { background: "#F43F5E", color: "#FFFBEF", border: "none" },
        });
      }
    }
  };

  const handleEdit = () => { 
    router.push(`/edit-recipe/${id}`);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite); // Temporary toggle for styling
    // Will be replaced with actual favorite functionality later
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFBEF] flex items-center justify-center">
        <div className="text-center">
          <GiCookingPot className="mx-auto text-4xl text-[#D97706] animate-spin mb-4" />
          <p className="text-xl font-medium text-[#1F2937]">
            Preparing your recipe...
          </p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-[#FFFBEF] flex items-center justify-center">
        <div className="text-center">
          <GiCookingPot className="mx-auto text-4xl text-[#D97706] mb-4" />
          <h2 className="text-2xl font-bold text-[#1F2937] mb-2">Recipe Not Found</h2>
          <p className="text-[#1F2937]/80">The recipe you're looking for doesn't exist</p>
          <button 
            onClick={() => router.push("/")}
            className="mt-4 bg-[#D97706] text-white px-4 py-2 rounded-lg hover:bg-[#B65D04] transition-colors"
          >
            Browse Recipes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFBEF] min-h-screen py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-[#D97706]/20">
        {/* Recipe Header */}
        <div className="p-6 border-b border-[#D97706]/20">
          <h1 className="text-3xl font-bold text-[#1F2937] mb-2 flex items-center">
            <FaUtensils className="text-[#D97706] mr-3" />
            {recipe.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <span className="flex items-center text-[#1F2937]/80">
              <FaClock className="text-[#D97706] mr-2" />
              {recipe.cookingTime} minutes
            </span>
            <span className="flex items-center text-[#1F2937]/80">
              <FaFire className="text-[#F43F5E] mr-2" />
              {recipe.difficulty}
            </span>
          </div>
        </div>

        {/* Recipe Image */}
        {recipe.image && (
          <div className="relative h-64 sm:h-80 overflow-hidden">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4">
              <button 
                onClick={toggleFavorite}
                className="p-2 bg-white/80 rounded-full shadow-md hover:scale-110 transition-all"
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                {isFavorite ? (
                  <FaHeart className="text-2xl text-[#F43F5E]" />
                ) : (
                  <FaRegHeart className="text-2xl text-[#1F2937]" />
                )}
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="p-4 border-b border-[#D97706]/20 flex justify-between">
          <button 
            onClick={handleEdit}
            className="flex items-center gap-2 bg-[#D97706] text-white px-4 py-2 rounded-lg hover:bg-[#B65D04] transition-colors"
          >
            <FaEdit />
            Edit Recipe
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 bg-[#F43F5E] text-white px-4 py-2 rounded-lg hover:bg-[#E11D48] transition-colors"
          >
            <FaTrash />
            Delete
          </button>
        </div>

        {/* Recipe Content */}
        <div className="p-6">
          {/* Ingredients */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-[#1F2937] mb-4 flex items-center">
              <FaListUl className="text-[#D97706] mr-3" />
              Ingredients
            </h2>
            <ul className="space-y-2 pl-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start text-[#1F2937]/90">
                  <GiKnifeFork className="text-[#65A30D] mr-2 mt-1 flex-shrink-0" />
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-[#1F2937] mb-4 flex items-center">
              <FaBookOpen className="text-[#D97706] mr-3" />
              Instructions
            </h2>
            <div className="prose max-w-none text-[#1F2937]/90">
              {recipe.instructions.split('\n').map((paragraph, i) => (
                <p key={i} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Tags */}
          {recipe.tags && recipe.tags.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-[#1F2937] mb-4 flex items-center">
                <FaTag className="text-[#D97706] mr-3" />
                Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#65A30D]/10 text-[#65A30D]"
                  >
                    <GiCookingPot className="mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;