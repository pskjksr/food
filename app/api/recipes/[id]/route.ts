import { NextRequest, NextResponse } from "next/server";
import prisma from "../../db/prisma"; // Make sure the path to Prisma is correct

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // Log to verify the received id
    console.log("Received Recipe ID:", id);

    // Ensure the id is a valid number
    if (!id || isNaN(Number(id)) || Number(id) <= 0) {
      console.error("Invalid Recipe ID received");
      return NextResponse.json({ error: "Invalid Recipe ID" }, { status: 400 });
    }

    const recipeId = Number(id);

    // 🔍 Query the recipe using Prisma
    const recipe = await prisma.recipe.findUnique({
      where: { id: recipeId },
      include: {
        category: true,  // If you're linking related tables, include them like this
        cuisine: true, 
        ingredients: true, 
      },
    });

    // Handle case if recipe not found
    if (!recipe) {
      return NextResponse.json({ message: "Recipe not found" }, { status: 404 });
    }

    // Return the found recipe as JSON
    return NextResponse.json(recipe);

  } catch (error: any) {
    console.error("API Error:", error);  // Log the error for debugging
    return NextResponse.json({ 
      error: "Something went wrong", 
      details: error.message,  // Provide error message for debugging
    }, { status: 500 });
  }
}
