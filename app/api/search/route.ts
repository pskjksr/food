import { NextResponse } from 'next/server';
import prisma from '@/utils/prismaClient'; // Ensure the correct path for prismaClient

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');  // รับคำค้นจาก URL

  // ตรวจสอบว่า query parameter มีอยู่ใน request หรือไม่
  if (!query) {
    return NextResponse.json({ error: 'Query parameter is missing' }, { status: 400 });
  }

  try {
    // ค้นหาจากชื่อเมนู, ตัวอย่างนี้ใช้ `contains` เพื่อหาคำที่ตรงกับชื่อ
    const recipes = await prisma.recipe.findMany({
      where: {
        name: {
          contains: query, // ค้นหาคำที่ตรงกับชื่อ
          
        },
      },
      select: {
        id: true,
        name: true,
        description: true,  // คุณสามารถปรับเลือกข้อมูลตามที่ต้องการ
        createdAt: true,
      },
    });

    // หากไม่พบสูตรอาหาร
    if (recipes.length === 0) {
      return NextResponse.json({ message: 'No recipes found' }, { status: 404 });
    }

    return NextResponse.json(recipes);  // ส่งข้อมูลที่ค้นหาได้
  } catch (error) {
    // พิมพ์ข้อผิดพลาดเพื่อการดีบัก
    console.error('Error fetching recipes:', error);

    // หากเกิดข้อผิดพลาดที่ไม่สามารถคาดเดาได้
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
