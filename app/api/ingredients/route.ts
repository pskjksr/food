import { NextRequest, NextResponse } from "next/server";
import prisma from "../db/prisma";

export async function GET(req: NextRequest) {
  try {
    const ingredients = await prisma.ingredient.findMany(); // ดึงวัตถุดิบทั้งหมดจาก DB
    return NextResponse.json(ingredients, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching ingredients" }, { status: 500 });
  }
}
