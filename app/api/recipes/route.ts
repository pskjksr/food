import { NextResponse } from 'next/server';
import prisma from '../utils/prismaClient';

// ดึงข้อมูลทั้งหมด (GET)
export async function GET() {
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        cuisine: true, // รวมข้อมูล cuisine
        category: true, // รวมข้อมูล category
        ingredients: true, // รวมข้อมูล ingredients
      },
    });
    return NextResponse.json(recipes); // ส่งข้อมูลกลับ
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch recipes', details: error.message },
      { status: 500 }
    );
  }
}

// เพิ่มข้อมูลใหม่ (POST)
export async function POST(req: Request) {
  try {
    const body = await req.json(); // รับข้อมูลจาก Body
    const newRecipe = await prisma.recipe.create({
      data: body,
    });
    return NextResponse.json(newRecipe, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create recipe', details: error.message },
      { status: 500 }
    );
  }
}
