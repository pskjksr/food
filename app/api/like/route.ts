// app/api/likes/route.ts

import { NextResponse } from 'next/server';
import  prisma  from '../db/prisma'; // หากใช้ Prisma สำหรับการเชื่อมต่อฐานข้อมูล

export async function GET() {
  try {
    // ดึงข้อมูลจากฐานข้อมูล หรือใช้ข้อมูลจำลอง (mock data)
    const likes = await prisma.like.findMany({
      include: {
        recipe: true, // หากคุณมีความสัมพันธ์กับสูตรอาหาร
      },
    });

    return NextResponse.json({ likes });
  } catch (error) {
    console.error("Error fetching likes:", error);
    return NextResponse.json({ error: "Failed to fetch likes" }, { status: 500 });
  }
}
