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
    console.error("Error fetching latest recipes:", error);
    return NextResponse.json({ error: "Failed to fetch recipes" }, { status: 500 });
  }
}
