import { NextResponse } from 'next/server';
import prisma from '../utils/prismaClient';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');  // รับคำค้นจาก URL

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is missing' }, { status: 400 });
  }

  try {
    // ค้นหาจากชื่อเมนู
    const recipes = await prisma.recipe.findMany({
      where: {
        name: {
          contains: query, // ค้นหาคำที่ตรงกับชื่อ // ค้นหาที่ไม่สนใจตัวพิมพ์ใหญ่หรือเล็ก
        },
      },
    });

    if (recipes.length === 0) {
      return NextResponse.json({ message: 'No recipes found' }, { status: 404 });
    }

    return NextResponse.json(recipes);  // ส่งข้อมูลที่ค้นหาได้
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
