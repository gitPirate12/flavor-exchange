import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import Recipe from "../../../../../models/Recipe";
import { auth } from "../../../../../auth";

// POST: Add a new rating
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
      return NextResponse.json(
        { error: "You have already rated this recipe. Use PUT to update your rating." },
        { status: 400 }
      );
    }

    // Add new rating
    recipe.rating.push({ userId: session.user.id, value });
    await recipe.save();

    // Calculate average rating
    const totalRatings = recipe.rating.length;
    const sumRatings = recipe.rating.reduce((sum, r) => sum + r.value, 0);
    const averageRating = totalRatings > 0 ? (sumRatings / totalRatings).toFixed(1) : 0;

    const responseData = {
      ...recipe.toObject(),
      averageRating,
      userRating: value,
      totalRatings
    };

    return NextResponse.json(responseData, { status: 201 }); // 201 for created
  } catch (error) {
    console.error("Error adding rating:", error);
    return NextResponse.json(
      { error: "Failed to add rating" },
      { status: 500 }
    );
  }
}

// PUT: Update an existing rating
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

    // Check if user has rated
    const existingRatingIndex = recipe.rating.findIndex(
      (r) => r.userId.toString() === session.user.id
    );

    if (existingRatingIndex === -1) {
      return NextResponse.json(
        { error: "You haven't rated this recipe yet. Use POST to add a rating." },
        { status: 400 }
      );
    }

    // Update existing rating
    recipe.rating[existingRatingIndex].value = value;
    await recipe.save();

    // Calculate average rating
    const totalRatings = recipe.rating.length;
    const sumRatings = recipe.rating.reduce((sum, r) => sum + r.value, 0);
    const averageRating = totalRatings > 0 ? (sumRatings / totalRatings).toFixed(1) : 0;

    const responseData = {
      ...recipe.toObject(),
      averageRating,
      userRating: value,
      totalRatings
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error("Error updating rating:", error);
    return NextResponse.json(
      { error: "Failed to update rating" },
      { status: 500 }
    );
  }
}

// GET: Fetch recipe with ratings
export async function GET(request, { params }) {
  try {
    await connectDB();
    const recipe = await Recipe.findById(params.id).lean();
    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    // Calculate average rating
    const totalRatings = recipe.rating.length;
    const sumRatings = recipe.rating.reduce((sum, r) => sum + r.value, 0);
    const averageRating = totalRatings > 0 ? (sumRatings / totalRatings).toFixed(1) : 0;

    const responseData = {
      ...recipe,
      averageRating,
      totalRatings
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipe" },
      { status: 500 }
    );
  }
}