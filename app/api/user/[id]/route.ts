import { NextRequest, NextResponse } from "next/server";
import prisma from "../../db/prisma"; // ตรวจสอบ path ของ prisma ให้ถูกต้อง

export async function GET(request: NextRequest, context: { params: { id: string } }) {
  const { id } = await context.params; // await เพื่อให้สามารถใช้ `id` ได้

  if (!id) {
    return NextResponse.json({ error: "User ID is missing" }, { status: 400 });
  }

  const userId = Number(id); // แปลง id เป็นตัวเลข

  try {
    // ค้นหาผู้ใช้จาก id
    const user = await prisma.user.findUnique({
      where: { id: userId }, // ค้นหาผู้ใช้จาก id
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
