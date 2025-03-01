import { NextResponse } from "next/server";
import prisma from "../../db/prisma"; // เชื่อมต่อ Prisma

export async function GET() {
  try {
    // ดึงข้อมูลหมวดหมู่ทั้งหมด
    const cuisines = await prisma.cuisine.findMany();

    // ดึงข้อมูลไลก์รวมถึงสูตรอาหาร
    const likes = await prisma.like.findMany({
      include: {
        recipe: {
          include: {
            cuisine: true, // ดึงชื่อหมวดหมู่
          },
        },
      },
    });

    // สร้าง Object เก็บจำนวนไลก์โดยใช้ชื่อ Cuisine
    const likeCountByCuisine: Record<string, number> = {};

    // เริ่มต้นให้ทุก Cuisine มีค่า 0
    cuisines.forEach((cuisine) => {
      likeCountByCuisine[cuisine.name] = 0;
    });

    // นับจำนวนไลก์ตามชื่อ Cuisine
    likes.forEach((like) => {
      const cuisineName = like.recipe.cuisine.name;
      if (likeCountByCuisine[cuisineName] !== undefined) {
        likeCountByCuisine[cuisineName]++;
      }
    });

    // จัดรูปแบบข้อมูลสำหรับกราฟ
    const cuisineNames = Object.keys(likeCountByCuisine);
    const cuisineLikes = cuisineNames.map((name) => likeCountByCuisine[name]);

    return NextResponse.json({
      cuisineNames, // ชื่อหมวดหมู่
      cuisineLikes, // จำนวนไลก์
    });
  } catch (error) {
    console.error("Error fetching cuisine like stats:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
