import React from "react";
import Link from "next/link";
import { FaClock, FaFire } from "react-icons/fa";
import { GiCookingPot } from "react-icons/gi";

const RecipeCard = ({ recipe }) => {
  return (
    <Link href={`/recipes/${recipe._id}`} className="block w-full">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 border border-[#D97706]/20 hover:border-[#D97706]/40 w-full sm:w-80 md:w-64 h-80 flex flex-col">
        {recipe.image ? (
          <div className="relative h-32 overflow-hidden flex-shrink-0">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#1F2937]/80 to-transparent" />
          </div>
        ) : (
          <div className="relative h-32 overflow-hidden flex-shrink-0 bg-[#FFFBEF] flex items-center justify-center">
            <GiCookingPot className="text-4xl text-[#D97706]/50" />
          </div>
        )}

        <div className="p-3 flex-grow flex flex-col">
          <h2 className="text-lg font-semibold text-[#1F2937] mb-2 truncate hover:text-[#D97706] transition-colors">
            {recipe.title}
          </h2>

          <div className="flex items-center text-[#1F2937]/80 mb-1">
            <FaClock className="mr-2 text-[#D97706]" />
            <span>{recipe.cookingTime} minutes</span>
          </div>

          <div className="flex items-center text-[#1F2937]/80 mb-1">
            <FaFire className="mr-2 text-[#F43F5E]" />
            <span className="capitalize">{recipe.difficulty}</span>
          </div>

          {recipe.tags && recipe.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-auto pt-3">
              {recipe.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#65A30D]/10 text-[#65A30D]"
                >
                  <GiCookingPot className="mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
