import { NextRequest, NextResponse } from "next/server";
import prisma from "../../db/prisma"; // ตรวจสอบ path ให้ถูกต้อง

export async function GET(request: NextRequest, context: { params: { id: string } }) {
  try {
    const recipeId = Number(context.params.id); // ✅ ใช้ context.params แทน
    console.log("Received Recipe ID:", recipeId);

    // Validate the recipe ID
    if (isNaN(recipeId) || recipeId <= 0) {
      return NextResponse.json({ error: "Invalid Recipe ID" }, { status: 400 });
    }

    // Retrieve the recipe from the database
    const recipe = await prisma.recipe.findUnique({
      where: { id: recipeId },
      include: {
        category: true,
        cuisine: true,
        ingredients: true,
      },
    });

    if (!recipe) {
      console.log("Recipe not found");
      return NextResponse.json({ message: "Recipe not found" }, { status: 404 });
    }

    console.log("Fetched Recipe Data:", recipe);
    return NextResponse.json(recipe);

  } catch (error: any) {
    console.error("API error occurred:", error.message);
    return NextResponse.json(
      { error: "An error occurred", details: error.message },
      { status: 500 }
    );
  }
}
