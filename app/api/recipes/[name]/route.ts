import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prismaClient"; // ตรวจสอบ path ของ prisma ให้ถูกต้อง

// การสร้าง API Route สำหรับค้นหาสูตรอาหารตามชื่อ
export async function GET(request: NextRequest,{params} :{params: Promise <{name : string}>} ) {
  const { name } = await params ; // ใช้ `params` เพื่อดึง `name` จาก URL

  // ตรวจสอบว่า `name` ถูกส่งมาหรือไม่
  if (!name) {
    return NextResponse.json({ message: "No recipe name provided" }, { status: 400 });
  }

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
