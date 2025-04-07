import { NextResponse } from "next/server";
import { connectDB } from "../../../../../../lib/db";
import User from "../../../../../../models/User";
import { auth } from "../../../../../auth";

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
    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const recipeId = params.id;
    // Remove recipeId from favorites
    const initialLength = user.favorites.length;
    user.favorites = user.favorites.filter(
      (fav) => fav.toString() !== recipeId
    );

    // Only save if something was removed
    if (user.favorites.length !== initialLength) {
      await user.save();
    }

    return NextResponse.json(
      { message: "Recipe removed from favorites" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing favorite:", error);
    return NextResponse.json(
      { error: "Failed to remove favorite" },
      { status: 500 }
    );
  }
}
