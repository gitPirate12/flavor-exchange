import React from "react";
import Link from "next/link";
import { FaClock, FaFire, FaStar, FaHeart } from "react-icons/fa";
import { GiCookingPot, GiMeal } from "react-icons/gi";
import { IoFastFood } from "react-icons/io5";

const RecipeCard = ({ recipe }) => {
  const totalRatings = recipe.rating?.length || 0;
  const sumRatings = recipe.rating?.reduce((sum, r) => sum + r.value, 0) || 0;
  const averageRating = totalRatings > 0 ? (sumRatings / totalRatings).toFixed(1) : "0.0";

  // Difficulty level colors
  const difficultyColors = {
    easy: "text-[#65A30D]",
    medium: "text-[#D97706]",
    hard: "text-[#F43F5E]"
  };

  return (
    <Link href={`/recipes/${recipe._id}`} className="block w-full group">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-[#FFFBEF] hover:border-[#D97706]/30 w-full h-full flex flex-col overflow-hidden">
        {/* Image Section */}
        <div className="relative h-40 overflow-hidden flex-shrink-0">
          {recipe.image ? (
            <>
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F2937]/70 via-transparent to-transparent opacity-80" />
            </>
          ) : (
            <div className="w-full h-full bg-[#FFFBEF] flex items-center justify-center">
              <GiMeal className="text-5xl text-[#D97706]/40" />
            </div>
          )}
          {/* Quick view badge */}
          {parseInt(recipe.cookingTime, 10) <= 15 && (
            <span className="absolute top-2 left-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#65A30D]/90 text-white">
              <IoFastFood className="mr-1" />
              Quick
            </span>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4 flex-grow flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-lg font-bold text-[#1F2937] group-hover:text-[#D97706] transition-colors line-clamp-2">
              {recipe.title}
            </h2>
            <div className="flex items-center bg-[#F43F5E]/10 px-2 py-1 rounded-full ml-2">
              <FaStar className={`text-sm ${parseFloat(averageRating) >= 4 ? "text-[#D97706]" : "text-[#1F2937]/60"}`} />
              <span className="text-xs font-semibold text-[#1F2937] ml-1">
                {averageRating}
              </span>
            </div>
          </div>

          {/* Meta Information */}
          <div className="space-y-2 mb-3">
            <div className="flex items-center text-[#1F2937]/80">
              <FaClock className="mr-2 text-[#D97706]" size={14} />
              <span className="text-sm">{recipe.cookingTime} mins</span>
            </div>

            <div className="flex items-center text-[#1F2937]/80">
              <FaFire className="mr-2" size={14} />
              <span className={`text-sm capitalize ${difficultyColors[recipe.difficulty.toLowerCase()] || "text-[#1F2937]"}`}>
                {recipe.difficulty}
              </span>
            </div>
          </div>

          {/* Tags */}
          {recipe.tags?.length > 0 && (
            <div className="mt-auto pt-2">
              <div className="flex flex-wrap gap-2">
                {recipe.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-[#65A30D]/10 text-[#65A30D]"
                  >
                    {tag.length > 12 ? `${tag.substring(0, 10)}...` : tag}
                  </span>
                ))}
                {recipe.tags.length > 3 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-[#1F2937]/10 text-[#1F2937]">
                    +{recipe.tags.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;