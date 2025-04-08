"use client";

import React, { useState, useEffect, useContext } from "react";
import RecipeContext from "../../../lib/context/RecipeContext";
import { FaUtensils, FaClock, FaImage, FaListUl, FaBookOpen, FaTags } from "react-icons/fa";
import { GiCook } from "react-icons/gi";
import { toast } from 'sonner';

const RecipeForm = ({ recipe = null, onSubmit }) => {
  const { addRecipe, updateRecipe } = useContext(RecipeContext);
  const [formData, setFormData] = useState({
    title: "",
    cookingTime: "",
    image: "",
    ingredients: "",
    instructions: "",
    difficulty: "",
    tags: "",
  });

  useEffect(() => {
    if (recipe) {
      setFormData({
        title: recipe.title || "",
        cookingTime: recipe.cookingTime || "",
        image: recipe.image || "",
        ingredients: recipe.ingredients?.join(", ") || "",
        instructions: recipe.instructions || "",
        difficulty: recipe.difficulty || "",
        tags: recipe.tags?.join(", ") || "",
      });
    }
  }, [recipe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const recipeData = {
        title: formData.title,
        cookingTime: formData.cookingTime,
        image: formData.image,
        ingredients: formData.ingredients.split(",").map((i) => i.trim()),
        instructions: formData.instructions,
        difficulty: formData.difficulty,
        tags: formData.tags.split(",").map((t) => t.trim()),
      };

      if (!recipeData.title || !recipeData.cookingTime || !recipeData.ingredients.length ||
        !recipeData.instructions || !recipeData.difficulty) {
        throw new Error("Please fill all required fields");
      }

      if (recipe) {
        await updateRecipe(recipe._id, recipeData);
        toast.success("Recipe updated successfully!", {
          style: {
            background: '#65A30D',
            color: '#FFFBEF',
            border: 'none'
          }
        });
      } else {
        await addRecipe(recipeData);
        toast.success("Recipe added successfully!", {
          style: {
            background: '#65A30D',
            color: '#FFFBEF',
            border: 'none'
          }
        });
        setFormData({
          title: "",
          cookingTime: "",
          image: "",
          ingredients: "",
          instructions: "",
          difficulty: "",
          tags: "",
        });
      }

      if (onSubmit) onSubmit();
    } catch (err) {
      toast.error(err.message || "Something went wrong", {
        style: {
          background: '#F43F5E',
          color: '#FFFBEF',
          border: 'none'
        }
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-[#FFFBEF] min-h-screen py-8 ">

      <div className="max-w-2xl mx-auto  bg-white rounded-lg shadow-md p-6 my-4">
        <h1 className="text-2xl font-bold text-[#1F2937] mb-6 flex items-center">
          <FaUtensils className="mr-2 text-[#D97706]" />
          {recipe ? "Edit Recipe" : "Add a New Recipe"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaUtensils className="absolute left-3 top-3 text-[#1F2937]/50" />
            <input
              name="title"
              placeholder="Recipe Title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-2 border border-[#D97706]/30 rounded-lg focus:ring-2 focus:ring-[#D97706]/50 focus:border-[#D97706]"
              required
            />
          </div>

          <div className="relative">
            <FaClock className="absolute left-3 top-3 text-[#1F2937]/50" />
            <input
              name="cookingTime"
              type="number"
              placeholder="Cooking Time (minutes)"
              value={formData.cookingTime}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-2 border border-[#D97706]/30 rounded-lg focus:ring-2 focus:ring-[#D97706]/50 focus:border-[#D97706]"
              required
            />
          </div>

          <div className="relative">
            <FaImage className="absolute left-3 top-3 text-[#1F2937]/50" />
            <input
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-2 border border-[#D97706]/30 rounded-lg focus:ring-2 focus:ring-[#D97706]/50 focus:border-[#D97706]"
            />
          </div>

          <div className="relative">
            <FaListUl className="absolute left-3 top-3 text-[#1F2937]/50" />
            <textarea
              name="ingredients"
              placeholder="Ingredients (comma separated)"
              value={formData.ingredients}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-2 border border-[#D97706]/30 rounded-lg focus:ring-2 focus:ring-[#D97706]/50 focus:border-[#D97706] h-24"
              required
            />
          </div>

          <div className="relative">
            <FaBookOpen className="absolute left-3 top-3 text-[#1F2937]/50" />
            <textarea
              name="instructions"
              placeholder="Instructions"
              value={formData.instructions}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-2 border border-[#D97706]/30 rounded-lg focus:ring-2 focus:ring-[#D97706]/50 focus:border-[#D97706] h-32"
              required
            />
          </div>

          <div className="relative">
            <GiCook className="absolute left-3 top-3 text-[#1F2937]/50" />
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-2 border border-[#D97706]/30 rounded-lg focus:ring-2 focus:ring-[#D97706]/50 focus:border-[#D97706] bg-white"
              required
            >
              <option value="">Select Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="relative">
            <FaTags className="absolute left-3 top-3 text-[#1F2937]/50" />
            <input
              name="tags"
              placeholder="Tags (comma separated)"
              value={formData.tags}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-2 border border-[#D97706]/30 rounded-lg focus:ring-2 focus:ring-[#D97706]/50 focus:border-[#D97706]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#D97706] hover:bg-[#B65D04] text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            {recipe ? "Update Recipe" : "Add Recipe"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;