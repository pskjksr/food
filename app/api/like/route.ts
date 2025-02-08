// /pages/api/like.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "../db/prisma"; // Adjust the path accordingly

export async function GET(request: NextRequest) {
  try {
    // Fetch all liked recipes for the logged-in user (assumed user ID)
    const userId = 1; // Replace with actual user ID logic
    const likes = await prisma.like.findMany({
      where: { userId },
      include: {
        recipe: true, // Include recipe details
      },
    });

    // Format the response
    const formattedLikes = likes.map((like) => ({
      id: like.id,
      recipeId: like.recipeId,
      recipeName: like.recipe.name, // Assuming the recipe has a 'name' field
    }));

    return NextResponse.json(formattedLikes);
  } catch (error) {
    console.error("Error fetching likes:", error.message);
    return NextResponse.json({ error: "Failed to fetch likes" }, { status: 500 });
  }
}
