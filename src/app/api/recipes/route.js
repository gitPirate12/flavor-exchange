import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import Recipe from "../../../models/Recipe";
import { auth } from "../../../../src/auth";

export async function GET(request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized - Please sign in" },
      { status: 401 }
    );
  }
  try {
    await connectDB();
    // Populate author server-side
    const recipes = await Recipe.find({}).populate(
      "author",
      "name email image"
    );
    return NextResponse.json(recipes, { status: 200 });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipes" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
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

    const newRecipe = await Recipe.create({
      title,
      cookingTime,
      image,
      ingredients,
      instructions,
      author: session.user.id, // Use ObjectId from session
      difficulty,
      tags,
    });

    return NextResponse.json(newRecipe, { status: 201 });
  } catch (error) {
    console.error("Error creating new recipe:", error);
    return NextResponse.json(
      { error: "Failed to create new recipe" },
      { status: 500 }
    );
  }
}
