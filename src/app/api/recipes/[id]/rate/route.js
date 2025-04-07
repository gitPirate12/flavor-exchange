import { NextResponse } from "next/server";
import { connectDB } from "../../../../../../lib/db";
import Recipe from "../../../../../../models/Recipe";
import { auth } from "../../../../../auth";

export async function POST(request, { params }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized - Please sign in" },
      { status: 401 }
    );
  }

  try {
    await connectDB();
    const { value } = await request.json();

    // Validate rating value
    if (!Number.isInteger(value) || value < 1 || value > 5) {
      return NextResponse.json(
        { error: "Rating must be an integer between 1 and 5" },
        { status: 400 }
      );
    }

    const recipe = await Recipe.findById(params.id);
    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    // Check if user already rated
    const existingRatingIndex = recipe.rating.findIndex(
      (r) => r.userId.toString() === session.user.id
    );

    if (existingRatingIndex !== -1) {
      // Update existing rating
      recipe.rating[existingRatingIndex].value = value;
    } else {
      // Add new rating
      recipe.rating.push({ userId: session.user.id, value });
    }

    await recipe.save();
    return NextResponse.json(recipe, { status: 200 });
  } catch (error) {
    console.error("Error adding/updating rating:", error);
    return NextResponse.json(
      { error: "Failed to add/update rating" },
      { status: 500 }
    );
  }
}
