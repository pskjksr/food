// app/api/like/[id]/route.ts

import { NextResponse } from "next/server";
import prisma from "../../db/prisma"; // สมมติว่าใช้ Prisma

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params; // รับค่า id จาก URL params

  try {
    // ดึงข้อมูลจากฐานข้อมูล
    const likes = await prisma.like.findMany({
      where: { userId: parseInt(id) }, // สมมติว่า userId เป็นตัวเลข
      include: {
        recipe: true, // รวมข้อมูลสูตรอาหาร
      },
    });

    if (likes.length === 0) {
      // ถ้าไม่พบข้อมูลใดๆ ส่งข้อความ 404
      return NextResponse.json({ message: "No likes found" }, { status: 404 });
    }

    return NextResponse.json({ likes });
  } catch (error) {
    console.error("Error fetching likes:", error);
    // ส่งข้อมูลผิดพลาดที่เหมาะสม
    return NextResponse.json(
      { error: "Failed to fetch likes", details: error.message },
      { status: 500 }
    );
  }
}
