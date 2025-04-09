import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import Recipe from "../../../../models/Recipe";
import { auth } from "../../../../auth";

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
    const recipes = await Recipe.find({ author: session.user.id }).populate(
      "author",
      "name email image"
    );

    return NextResponse.json(recipes, { status: 200 });
  } catch (error) {
    console.error("Error fetching user recipes:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipes" },
      { status: 500 }
    );
  }
}
