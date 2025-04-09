import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import Recipe from "../../../../models/Recipe";
import { auth } from "../../../../auth";

export async function GET(request, { params }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized - Please sign in" },
      { status: 401 }
    );
  }

  try {
    await connectDB();
    const recipe = await Recipe.findById(params.id).populate(
      "author",
      "name email image"
    );
    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }
    return NextResponse.json(recipe, { status: 200 });
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipe" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized - Please sign in" },
      { status: 401 }
    );
  }

  try {
    await connectDB();
    const body = await request.json();
    const {
      title,
      cookingTime,
      image,
      ingredients,
      instructions,
      difficulty,
      tags,
    } = body;

    // Validate required fields
    if (
      !title ||
      !cookingTime ||
      !ingredients ||
      !instructions ||
      !difficulty
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const recipe = await Recipe.findById(params.id);
    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }
    if (recipe.author.toString() !== session.user.id) {
      return NextResponse.json(
        { error: "Forbidden - Not the author" },
        { status: 403 }
      );
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      params.id,
      {
        title,
        cookingTime,
        image,
        ingredients,
        instructions,
        difficulty,
        tags,
      },
      { new: true, runValidators: true }
    );
    return NextResponse.json(updatedRecipe, { status: 200 });
  } catch (error) {
    console.error("Error updating recipe:", error);
    return NextResponse.json(
      { error: "Failed to update recipe" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized - Please sign in" },
      { status: 401 }
    );
  }

  try {
    await connectDB();
    const recipe = await Recipe.findById(params.id);
    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }
    if (recipe.author.toString() !== session.user.id) {
      return NextResponse.json(
        { error: "Forbidden - Not the author" },
        { status: 403 }
      );
    }

    await Recipe.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Recipe deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return NextResponse.json(
      { error: "Failed to delete recipe" },
      { status: 500 }
    );
  }
}
