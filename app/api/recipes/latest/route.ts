import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prismaClient"; // ตรวจสอบ path ให้ถูกต้อง

export async function GET(req: NextRequest) {
  try {
    const latestRecipes = await prisma.recipe.findMany({
      orderBy: [{ createdAt: "desc" }],
      take: 5,
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    });

    return NextResponse.json(latestRecipes);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching latest recipes:", error.message);
      return NextResponse.json({ error: "An error occurred while fetching the latest recipes.", details: error.message }, { status: 500 });
    }
    // Handle case where error is not an instance of Error (unexpected error type)
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
