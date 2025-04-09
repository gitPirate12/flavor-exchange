"use client";

import React, { useContext, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import RecipeForm from "../../../components/RecipeForm";
import RecipeContext from "../../../lib/context/RecipeContext";

const Page = () => {
  const { id } = useParams();
  const router = useRouter();
  const { recipes } = useContext(RecipeContext);
  const [recipe, setRecipe] = useState(null);

  // Find the recipe when the component mounts
  useEffect(() => {
    if (recipes.length > 0) {
      const foundRecipe = recipes.find(r => r._id === id);
      setRecipe(foundRecipe || null);
    }
  }, [id, recipes]);

  const handleSubmit = () => {
    // Redirect back to recipe details after successful submission
    router.push(`/recipes/${id}`);
  };

  return (
    <div className="bg-[#FFFBEF] min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <RecipeForm recipe={recipe} onSubmit={handleSubmit} />
    </div>
  );
};

export default Page;
