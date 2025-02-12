// app/api/recipes/[name]/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../db/prisma"; // ตรวจสอบ path ของ prisma ให้ถูกต้อง

export async function GET(request: NextRequest, context: { params: { name: string } }) {
  // ใช้ await เพื่อดึงข้อมูลจาก params
  const { name } = await context.params; // รอให้ params เสร็จสมบูรณ์
  const recipeName = decodeURIComponent(name); // แปลงชื่อสูตรจาก URL

  
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
