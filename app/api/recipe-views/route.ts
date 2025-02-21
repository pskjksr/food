import { NextRequest, NextResponse } from "next/server";
import prisma from "../utils/prismaClient"; // ตรวจสอบ path

export async function GET(req: NextRequest) {
  try {
    // ดึงข้อมูลการเข้าชมจากฐานข้อมูล
    const categories = ["Japanese", "Thai", "Chinese", "Western", "Clean Eating"];
    
    // สร้างผลลัพธ์การเข้าชมสำหรับแต่ละหมวดหมู่
    const categoryVisits = await Promise.all(
      categories.map(async (category) => {
        const count = await prisma.recipe.count({
          where: {
            category: {
              name: category, // ใช้ชื่อหมวดหมู่จาก Prisma schema
            },
          },
        });
        return count;
      })
    );

    // ส่งข้อมูลการเข้าชมแต่ละหมวดหมู่กลับไป
    return NextResponse.json({
      categories,
      categoryVisits,
    });
  } catch (error) {
    console.error("Error fetching recipe views:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: String(error) },
      { status: 500 }
    );
  }
}
