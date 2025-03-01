// pages/api/recipes/by-ingredients.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../db/prisma"; 

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const ingredients = url.searchParams.getAll("ingredients");

    if (!ingredients.length) {
      return NextResponse.json({ recipes: [] }); 
    }

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
            ingredient: true, 
          },
        },
        cuisine: true, 
        category: true, 
      },
    });

    return NextResponse.json({ recipes });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return NextResponse.json({ error: "Failed to fetch recipes" }, { status: 500 });
  }
}
