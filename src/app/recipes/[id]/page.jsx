"use client";

import React, { useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import RecipeContext from "../../../../lib/context/RecipeContext";
import FavoritesContext from "../../../../lib/context/FavoritesContext";
import { toast } from "sonner";
import {
  FaClock,
  FaFire,
  FaEdit,
  FaTrash,
  FaHeart,
  FaRegHeart,
  FaListUl,
  FaBookOpen,
  FaTag,
  FaStar,
  FaArrowLeft
} from "react-icons/fa";
import { GiCookingPot, GiKnifeFork, GiMeal } from "react-icons/gi";
import { IoFastFood } from "react-icons/io5";

const Page = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const { recipes, loading, deleteRecipe, addRating, updateRating } = useContext(RecipeContext);
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const [recipe, setRecipe] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    if (!loading && recipes.length > 0) {
      const foundRecipe = recipes.find((r) => r._id === id);
      setRecipe(foundRecipe || null);

      if (foundRecipe) {
        const isFav = favorites.some(fav => fav._id === foundRecipe._id);
        setIsFavorite(isFav);

        const userRate = foundRecipe.rating?.find(r => r.userId.toString() === session?.user?.id);
        setUserRating(userRate ? userRate.value : 0);

        const sum = foundRecipe.rating?.reduce((acc, r) => acc + r.value, 0) || 0;
        setTotalRatings(foundRecipe.rating?.length || 0);
        setAverageRating(foundRecipe.rating?.length > 0 ? (sum / foundRecipe.rating.length).toFixed(1) : 0);
      }
    }
  }, [id, recipes, loading, favorites, session]);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this recipe?")) {
      try {
        await deleteRecipe(id);
        toast.success("Recipe deleted successfully!");
        router.push("/");
      } catch (error) {
        toast.error("Failed to delete recipe");
      }
    }
  };

  const handleEdit = () => {
    router.push(`/edit-recipe/${id}`);
  };

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await removeFavorite(id);
        toast.success("Removed from favorites!");
      } else {
        await addFavorite(id);
        toast.success("Added to favorites!");
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      toast.error("Failed to update favorites");
    }
  };

  const handleRating = async (rating) => {
    try {
      const updatedRecipe = userRating > 0
        ? await updateRating(id, rating)
        : await addRating(id, rating);

      setRecipe(updatedRecipe);
      setUserRating(rating);
      const sum = updatedRecipe.rating.reduce((acc, r) => acc + r.value, 0);
      setAverageRating(updatedRecipe.rating.length > 0 ? (sum / updatedRecipe.rating.length).toFixed(1) : 0);
      setTotalRatings(updatedRecipe.rating.length);
      toast.success(`Rating ${userRating > 0 ? "updated" : "submitted"} successfully!`);
    } catch (error) {
      toast.error(error.message || "Failed to submit rating");
    }
  };

  if (loading || !session) {
    return (
      <div className="min-h-screen bg-[#FFFBEF] flex items-center justify-center">
        <div className="text-center">
          <GiCookingPot className="mx-auto text-4xl text-[#D97706] animate-pulse mb-4" />
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
        <div className="text-center max-w-md p-6 bg-white rounded-xl shadow-sm border border-[#D97706]/20">
          <GiCookingPot className="mx-auto text-4xl text-[#D97706] mb-4" />
          <h2 className="text-2xl font-bold text-[#1F2937] mb-2">Recipe Not Found</h2>
          <p className="text-[#1F2937]/80 mb-6">The recipe you're looking for doesn't exist or may have been removed.</p>
          <button
            onClick={() => router.push("/")}
            className="w-full bg-[#D97706] hover:bg-[#B65D04] text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-200"
          >
            Browse Recipes
          </button>
        </div>
      </div>
    );
  }

  // Difficulty level colors
  const difficultyColors = {
    easy: "bg-[#65A30D]/10 text-[#65A30D]",
    medium: "bg-[#D97706]/10 text-[#D97706]",
    hard: "bg-[#F43F5E]/10 text-[#F43F5E]"
  };

  return (
    <div className="bg-[#FFFBEF] min-h-screen pb-12">
      {/* Back Button */}
      <div className="container mx-auto px-4 sm:px-6 pt-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#1F2937]/80 hover:text-[#D97706] transition-colors mb-4"
        >
          <FaArrowLeft />
          <span>Back to recipes</span>
        </button>
      </div>

      {/* Recipe Container */}
      <div className="container mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#D97706]/20">
          {/* Recipe Header with Image */}
          <div className="relative">
            {recipe.image ? (
              <div className="h-64 sm:h-80 w-full overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="h-64 sm:h-80 w-full bg-[#FFFBEF] flex items-center justify-center">
                <GiMeal className="text-6xl text-[#D97706]/40" />
              </div>
            )}

            {/* Quick meal badge */}
            {parseInt(recipe.cookingTime, 10) <= 15 && (
              <div className="absolute top-4 left-4 flex items-center gap-1 bg-white/90 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm">
                <IoFastFood className="text-[#65A30D]" />
                <span>Quick Meal</span>
              </div>
            )}

            {/* Favorite button */}
            <button
              onClick={toggleFavorite}
              className="absolute top-4 right-4 p-2.5 bg-white/90 rounded-full shadow-sm hover:scale-110 transition-all"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite ? (
                <FaHeart className="text-xl text-[#F43F5E]" />
              ) : (
                <FaRegHeart className="text-xl text-[#1F2937]" />
              )}
            </button>
          </div>

          {/* Recipe Content */}
          <div className="p-6 sm:p-8">
            {/* Title and Metadata */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2937] mb-4">
                {recipe.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[recipe.difficulty.toLowerCase()] || "bg-[#1F2937]/10 text-[#1F2937]"}`}>
                  <FaFire className="mr-1.5" />
                  {recipe.difficulty}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#D97706]/10 text-[#D97706]">
                  <FaClock className="mr-1.5" />
                  {recipe.cookingTime} mins
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#1F2937]/10 text-[#1F2937]">
                  <FaStar className="mr-1.5 text-[#D97706]" />
                  {averageRating} ({totalRatings})
                </span>
              </div>

              {/* Rating Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#1F2937] mb-2">Rate this recipe</h3>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="focus:outline-none"
                    >
                      <FaStar
                        className={`text-2xl transition-colors ${star <= (hoverRating || userRating)
                            ? "text-[#D97706]"
                            : "text-[#1F2937]/30"
                          }`}
                      />
                    </button>
                  ))}
                  {userRating > 0 && (
                    <span className="ml-2 text-sm text-[#1F2937]/80">
                      Your rating: {userRating} star{userRating !== 1 ? "s" : ""}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {session?.user?.id === recipe.author?._id && (
              <div className="flex flex-wrap gap-3 mb-8">
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 bg-[#D97706] hover:bg-[#B65D04] text-white font-medium py-2.5 px-5 rounded-lg transition-colors duration-200"
                >
                  <FaEdit />
                  Edit Recipe
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 bg-[#F43F5E]/10 hover:bg-[#F43F5E]/20 text-[#F43F5E] font-medium py-2.5 px-5 rounded-lg transition-colors duration-200"
                >
                  <FaTrash />
                  Delete
                </button>
              </div>
            )}

            {/* Ingredients */}
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#1F2937] mb-4 flex items-center">
                <FaListUl className="text-[#D97706] mr-3" />
                Ingredients
              </h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start bg-[#FFFBEF] p-3 rounded-lg">
                    <GiKnifeFork className="text-[#65A30D] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-[#1F2937]/90">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#1F2937] mb-4 flex items-center">
                <FaBookOpen className="text-[#D97706] mr-3" />
                Instructions
              </h2>
              <div className="prose max-w-none">
                {recipe.instructions.split('\n').map((paragraph, i) => (
                  <div key={i} className="mb-4 p-4 bg-[#FFFBEF] rounded-lg">
                    <p className="text-[#1F2937]/90">{paragraph}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            {recipe.tags?.length > 0 && (
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-[#1F2937] mb-4 flex items-center">
                  <FaTag className="text-[#D97706] mr-3" />
                  Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {recipe.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#65A30D]/10 text-[#65A30D]"
                    >
                      <GiCookingPot className="mr-1.5" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;