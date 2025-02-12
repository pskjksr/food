import { NextRequest, NextResponse } from "next/server";
import prisma from "../db/prisma"; // ปรับตาม path ที่ถูกต้อง

// Handle GET to fetch liked recipes
export async function GET(request: NextRequest) {
  try {
    const userId = 1; // ใช้ userId จริงๆ จากระบบ
    const likes = await prisma.like.findMany({
      where: { userId },
      include: {
        recipe: true, // รวมข้อมูลของสูตรอาหาร
      },
    });

    // Format the response
    const formattedLikes = likes.map((like) => ({
      id: like.id,
      recipeId: like.recipeId,
      recipeName: like.recipe.name, // ใช้ชื่อสูตรอาหาร
      recipeImage: like.recipe.image, // สามารถเพิ่มภาพสูตรอาหารได้
    }));

    return NextResponse.json(formattedLikes);
  } catch (error) {
    console.error("Error fetching likes:", error.message);
    return NextResponse.json({ error: "Failed to fetch likes" }, { status: 500 });
  }
}

// Handle POST to add a like
export async function POST(request: NextRequest) {
  try {
    const { userId, recipeId } = await request.json(); // ดึงข้อมูลจาก body

    if (!userId || !recipeId) {
      return NextResponse.json({ error: "Missing userId or recipeId" }, { status: 400 });
    }

    // ตรวจสอบว่าผู้ใช้เคยกด like สูตรอาหารนี้หรือไม่
    const existingLike = await prisma.like.findUnique({
      where: { userId_recipeId: { userId, recipeId } },
    });

    if (existingLike) {
      return NextResponse.json({ error: "Recipe already liked" }, { status: 400 });
    }

    // เพิ่ม like ใหม่
    const newLike = await prisma.like.create({
      data: {
        userId,
        recipeId,
      },
    });

    return NextResponse.json(newLike, { status: 201 }); // สร้าง like สำเร็จ
  } catch (error) {
    console.error("Error adding like:", error.message);
    return NextResponse.json({ error: "Failed to add like" }, { status: 500 });
  }
}

// Handle DELETE to remove a like
export async function DELETE(request: NextRequest) {
  try {
    const { userId, recipeId } = await request.json(); // ดึงข้อมูลจาก body

    if (!userId || !recipeId) {
      return NextResponse.json({ error: "Missing userId or recipeId" }, { status: 400 });
    }

    // ค้นหา like ที่มีอยู่
    const existingLike = await prisma.like.findUnique({
      where: { userId_recipeId: { userId, recipeId } },
    });

    if (!existingLike) {
      return NextResponse.json({ error: "Like not found" }, { status: 404 });
    }

    // ลบ like
    await prisma.like.delete({
      where: { userId_recipeId: { userId, recipeId } },
    });

    return NextResponse.json({ message: "Like removed" }, { status: 200 }); // ลบ like สำเร็จ
  } catch (error) {
    console.error("Error removing like:", error.message);
    return NextResponse.json({ error: "Failed to remove like" }, { status: 500 });
  }
}
