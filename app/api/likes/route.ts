import { NextResponse } from 'next/server';
import prisma from "@/utils/prismaClient";
import { auth } from '@/config/auth';

// 📌 GET - ดึงข้อมูล Likes ทั้งหมด
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ message: "Missing userId" }, { status: 400 });
    }

    const likes = await prisma.like.findMany({
      where: { userId: Number(userId) },
      include: {
        recipe: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    const formattedLikes = likes.map((like) => ({
      id: like.id,
      recipeId: like.recipe.id,
      name: like.recipe.name || "Unknown Recipe",
      recipeImage: like.recipe.image || "/fallback-image.jpg",
    }));

    return NextResponse.json({ likes: formattedLikes });
  } catch (error) {
    console.error("Error fetching likes:", error);
    return NextResponse.json({ error: "Failed to fetch likes" }, { status: 500 });
  }
}

// 📌 POST - เพิ่ม Like สำหรับผู้ใช้
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { recipeId } = await req.json();
    const userId = Number(session.user.id);
    const parsedRecipeId = Number(recipeId);

    if (isNaN(userId) || isNaN(parsedRecipeId)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    console.log("✅ POST /api/likes -> userId:", userId, "recipeId:", parsedRecipeId);

    // ตรวจสอบว่าผู้ใช้ได้ Like สูตรอาหารนี้แล้วหรือยัง
    const existingLike = await prisma.like.findFirst({
      where: { userId, recipeId: parsedRecipeId },
    });

    if (existingLike) {
      return NextResponse.json({ message: "Recipe already liked" }, { status: 400 });
    }

    // เพิ่ม Like ใหม่
    const newLike = await prisma.like.create({
      data: { userId, recipeId: parsedRecipeId },
    });

    return NextResponse.json({ message: "Recipe liked", like: newLike });
  } catch (error) {
    console.error("❌ Error adding like:", error);
    return NextResponse.json({ error: "Failed to like recipe" }, { status: 500 });
  }
}

// 📌 DELETE - ลบ Like ของผู้ใช้
export async function DELETE(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { recipeId } = await req.json();
    const userId = Number(session.user.id);
    const parsedRecipeId = Number(recipeId);


    // ตรวจสอบว่ามี Like หรือไม่
    const existingLike = await prisma.like.findFirst({
      where: { userId, recipeId: parsedRecipeId },
    });

    if (!existingLike) {
      return NextResponse.json({ message: "Like not found" }, { status: 404 });
    }

    // ลบ Like
    await prisma.like.delete({
      where: { id: existingLike.id },
    });

    return NextResponse.json({ message: "Like removed" });
  } catch (error) {
    console.error("❌ Error removing like:", error);
    return NextResponse.json({ error: "Failed to remove like" }, { status: 500 });
  }
}
