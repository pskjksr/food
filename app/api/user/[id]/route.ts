import { NextRequest, NextResponse } from "next/server";
import prisma from "../../db/prisma"; // ใช้ Prisma ในการดึงข้อมูล

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // ใช้ await เพื่อรอให้ params เสร็จสมบูรณ์ก่อน
    const { id } = await params;  // ใช้ await กับ params

    const userId = Number(id);  // แปลง id เป็นตัวเลข
    const user = await prisma.user.findUnique({
      where: { id: userId },  // ค้นหาผู้ใช้จาก id
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
