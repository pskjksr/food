import { NextRequest, NextResponse } from "next/server";
import prisma from "../utils/prismaClient"; // Ensure the path to your Prisma Client is correct

interface RecipeQueryConditions {
  categoryId?: number;
  cuisineId?: number;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("categoryId");
  const cuisineId = searchParams.get("cuisineId");

  // Validate categoryId and cuisineId
  if ((categoryId && isNaN(Number(categoryId))) || (cuisineId && isNaN(Number(cuisineId)))) {
    return NextResponse.json(
      { error: "Invalid or missing categoryId or cuisineId. Please provide valid numeric values." },
      { status: 400 }
    );
  }

  try {
    // Initialize query conditions
    const queryConditions: RecipeQueryConditions = {};

    if (categoryId) queryConditions.categoryId = Number(categoryId); // Filter by categoryId if present
    if (cuisineId) queryConditions.cuisineId = Number(cuisineId); // Filter by cuisineId if present

    // Fetch recipes based on the provided filters
    const recipes = await prisma.recipe.findMany({
      where: queryConditions,
      include: {
        cuisine: true,  // Include related cuisine
        category: true, // Include related category
        ingredients: true, // Include related ingredients
      },
    });

    // Return 404 if no recipes are found
    if (recipes.length === 0) {
      return NextResponse.json({ error: "No recipes found for the given filters." }, { status: 404 });
    }

    // Return the recipes if found
    return NextResponse.json(recipes);
  } catch (error: any) {
    // Log and return detailed error if any
    console.error("Error fetching recipes:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later.", details: error.message },
      { status: 500 }
    );
  }
}
