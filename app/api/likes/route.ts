import { NextResponse } from 'next/server';
import prisma from '../db/prisma'; // เชื่อมต่อกับ Prisma
import { auth } from '@/config/auth'; // เชื่อมต่อกับระบบ Authentication

// ฟังก์ชัน GET - ดึงข้อมูล Likes ทั้งหมด
export async function GET() {
  try {
    const likes = await prisma.like.findMany({
      include: {
        recipe: {
          select: {
            id: true,
            name: true,   // ✅ ดึงเฉพาะชื่อเมนู
            image: true,  // ✅ ดึงเฉพาะรูปภาพเมนู
          },
        },
      },
    });

    // ✅ จัดโครงสร้างข้อมูลก่อนส่งกลับไปที่ frontend
    const formattedLikes = likes.map((like) => ({
      id: like.id,
      recipeId: like.recipe.id,
      name: like.recipe.name || "Unknown Recipe",  // ✅ ป้องกันกรณี `null`
      recipeImage: like.recipe.image || "/fallback-image.jpg",
    }));

    return NextResponse.json({ likes: formattedLikes });
  } catch (error) {
    console.error("Error fetching likes:", error);
    return NextResponse.json({ error: "Failed to fetch likes" }, { status: 500 });
  }
}

// ฟังก์ชัน POST - เพิ่ม Like สำหรับผู้ใช้
export async function POST(req: Request) {
  try {
    const session = await auth(); // ตรวจสอบ session ของผู้ใช้
    if (!session?.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { recipeId } = await req.json();
    const userId = parseInt(session.user.id, 10);
    const parsedRecipeId = parseInt(recipeId, 10);

    if (isNaN(userId) || isNaN(parsedRecipeId)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    // ตรวจสอบว่า user ได้ทำการ like สูตรอาหารนี้หรือยัง
    const existingLike = await prisma.like.findFirst({
      where: {
        userId,
        recipeId: parsedRecipeId,
      },
    });

    if (existingLike) {
      return NextResponse.json({ message: "Recipe already liked" }, { status: 400 });
    }

    // ถ้ายังไม่เคย like ให้เพิ่ม like ใหม่
    const newLike = await prisma.like.create({
      data: {
        userId,
        recipeId: parsedRecipeId,
      },
    });

    return NextResponse.json({ message: "Recipe liked", like: newLike });
  } catch (error) {
    console.error("Error adding like:", error);
    return NextResponse.json({ error: "Failed to like recipe", details: error }, { status: 500 });
  }
}

// ฟังก์ชัน DELETE - ลบ Like ของผู้ใช้
export async function DELETE(req: Request) {
  try {
    const session = await auth(); // ตรวจสอบ session ของผู้ใช้
    if (!session?.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { recipeId } = await req.json();
    const userId = parseInt(session.user.id, 10);
    const parsedRecipeId = parseInt(recipeId, 10);

    if (isNaN(userId) || isNaN(parsedRecipeId)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    // ตรวจสอบว่ามี like อยู่ในระบบหรือไม่
    const existingLike = await prisma.like.findFirst({
      where: {
        userId,
        recipeId: parsedRecipeId,
      },
    });

    if (!existingLike) {
      return NextResponse.json({ message: "Like not found" }, { status: 404 });
    }

    // ลบ like ที่มีอยู่
    await prisma.like.delete({
      where: {
        id: existingLike.id,
      },
    });

    return NextResponse.json({ message: "Like removed" });
  } catch (error) {
    console.error("Error removing like:", error);
    return NextResponse.json({ error: "Failed to remove like", details: error }, { status: 500 });
  }
}