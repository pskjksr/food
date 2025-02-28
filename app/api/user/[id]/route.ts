import { NextRequest, NextResponse } from "next/server";
import prisma from "../../db/prisma"; // ใช้ Prisma ในการดึงข้อมูล
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    

    const userId = params.id;
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
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