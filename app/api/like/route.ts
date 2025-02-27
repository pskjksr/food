// app/api/likes/route.ts

import { NextResponse } from 'next/server';
import  prisma  from '../db/prisma'; // หากใช้ Prisma สำหรับการเชื่อมต่อฐานข้อมูล
import { auth } from '@/config/auth';

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

export async function POST(req: Request) {
  try {
    const session = await auth();
    // ดึงข้อมูลจากฐานข้อมูล
    if(!session?.user.id){
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const likes = await prisma.like.findMany({
      where: { userId: parseInt(session.user.id) }, // สมมติว่า userId เป็นตัวเลข
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
      { error: "Failed to fetch likes", details: error },
      { status: 500 }
    );
  }
}
