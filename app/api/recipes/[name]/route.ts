// app/api/recipes/[name]/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../db/prisma"; // ตรวจสอบ path ของ prisma ให้ถูกต้อง

// ฟังก์ชัน GET
export async function GET(request: NextRequest, context: { params: { name: string } }) {
  const { name } = context.params; // ดึงชื่อสูตรอาหารจาก params
  const recipeName = decodeURIComponent(name); // ถอดรหัสชื่อสูตรจาก URL

  try {
    // ค้นหาสูตรอาหารจากชื่อ
    const recipe = await prisma.recipe.findFirst({
      where: {
        name: recipeName, // ค้นหาจากชื่อสูตร
      },
      include: {
        category: true,    // รวมข้อมูลเกี่ยวกับ category
        cuisine: true,     // รวมข้อมูลเกี่ยวกับ cuisine
        ingredients: true, // รวมข้อมูลเกี่ยวกับ ingredients
      },
    });

    // ถ้าไม่พบสูตร
    if (!recipe) {
      return NextResponse.json({ message: "Recipe not found" }, { status: 404 });
    }

    // ส่งข้อมูลสูตรอาหาร
    return NextResponse.json(recipe);
  } catch (error) {
    // ถ้ามีข้อผิดพลาดเกิดขึ้น
    return NextResponse.json(
      { error: "An error occurred", details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// ฟังก์ชัน DELETE
export async function DELETE(req: NextRequest, context: { params: { name: string } }) {
  const { name } = context.params; // ดึงชื่อสูตรอาหารจาก params
  const recipeName = decodeURIComponent(name); // ถอดรหัสชื่อสูตรจาก URL

  try {
    // ค้นหาสูตรอาหารจากชื่อ
    const existingRecipe = await prisma.recipe.findFirst({
      where: { name: recipeName },
    });

    // ถ้าไม่มีสูตรนี้อยู่
    if (!existingRecipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    // ลบสูตรอาหาร
    await prisma.recipe.delete({
      where: { id: existingRecipe.id }, // ใช้ ID ที่ได้จากการค้นหาชื่อ
    });

    return NextResponse.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return NextResponse.json({ error: "Failed to delete recipe" }, { status: 500 });
  }
}
