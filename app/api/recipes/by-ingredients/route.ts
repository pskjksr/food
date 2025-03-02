import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const ingredients = url.searchParams.getAll("ingredients");

    // Validate ingredients array: ensure it is not empty or malformed
    if (!ingredients || ingredients.length === 0) {
      return NextResponse.json({ recipes: [] });
    }

    // Optional: limit the number of ingredients to query to avoid performance issues
    if (ingredients.length > 50) {
      return NextResponse.json({ error: "Too many ingredients provided. Please limit to 50." }, { status: 400 });
    }

    // Fetch recipes that match the ingredients
    const recipes = await prisma.recipe.findMany({
      where: {
        ingredients: {
          some: {
            ingredient: {
              name: { in: ingredients },
            },
          },
        },
      },
      include: {
        ingredients: {
          include: {
            ingredient: true, // Include ingredient details
          },
        },
        cuisine: true, // Include cuisine details
        category: true, // Include category details
      },
    });

    // Return the fetched recipes
    return NextResponse.json({ recipes });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return NextResponse.json({ error: "Failed to fetch recipes. Please try again later." }, { status: 500 });
  }
}
