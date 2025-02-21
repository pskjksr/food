import { NextRequest, NextResponse } from "next/server";
import prisma from "../utils/prismaClient";

// ฟังก์ชัน GET สำหรับดึงข้อมูลสูตรอาหาร
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("categoryId");
  const cuisineId = searchParams.get("cuisineId");

  // ตรวจสอบว่า categoryId และ cuisineId เป็นตัวเลขที่ถูกต้องหรือไม่
  if (
    (categoryId && isNaN(Number(categoryId))) ||
    (cuisineId && isNaN(Number(cuisineId)))
  ) {
    return NextResponse.json(
      { error: "Invalid categoryId or cuisineId." },
      { status: 400 }
    );
  }

  try {
    // สร้างเงื่อนไขการค้นหาตาม categoryId และ cuisineId
    const queryConditions: { categoryId?: number; cuisineId?: number } = {};

    if (categoryId) {
      queryConditions.categoryId = Number(categoryId); // แปลงเป็นตัวเลข
    }
    if (cuisineId) {
      queryConditions.cuisineId = Number(cuisineId); // แปลงเป็นตัวเลข
    }

    // ดึงข้อมูลสูตรจาก Prisma
    const recipes = await prisma.recipe.findMany({
      where: queryConditions,
      include: {
        cuisine: true,   // รวมข้อมูล cuisine
        category: true,  // รวมข้อมูล category
        ingredients: true, // รวมข้อมูล ingredients
      },
    });

    // หากไม่พบสูตร
    if (recipes.length === 0) {
      return NextResponse.json({ error: "No recipes found." }, { status: 404 });
    }

    // ส่งกลับข้อมูลสูตร
    return NextResponse.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("📥 Received Data:", body); // Log ข้อมูลที่รับเข้ามา

    const { name, description, ingredientDetails, instructions, image, cuisineId, categoryId, ingredients } = body;

    if (!name || !cuisineId || !categoryId || !ingredients || ingredients.length === 0) {
      return NextResponse.json(
        { error: "กรุณากรอก Name, Cuisine, Category และ Ingredients ให้ครบ" },
        { status: 400 }
      );
    }

    console.log("🛠 Creating Recipe...");

    const newRecipe = await prisma.recipe.create({
      data: {
        name,
        description,
        ingredientDetails,
        instructions,
        image,
        cuisineId: Number(cuisineId),
        categoryId: Number(categoryId),
        ingredients: {
          create: ingredients.map((ingredient: { name: string; quantity: number }) => ({
            ingredient: { connectOrCreate: { where: { name: ingredient.name }, create: { name: ingredient.name } } },
            quantity: ingredient.quantity,
          })),
        },
      },
    });

    console.log("✅ Recipe Created:", newRecipe); // Log ข้อมูลที่สร้างสำเร็จ
    return NextResponse.json(newRecipe, { status: 201 });

  } catch (error: any) {
    console.error("❌ Error adding recipe:", error);

    return NextResponse.json(
      { error: error.message || "เกิดข้อผิดพลาดในการเพิ่มสูตรอาหาร" },
      { status: 500 }
    );
  }
}
