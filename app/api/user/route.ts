import { NextResponse } from 'next/server';
import prisma from '../db/prisma';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.pathname.split('/').pop(); // ดึง ID จาก URL

  // ถ้า userId มีค่า, ดึงข้อมูลผู้ใช้ตาม ID
  if (userId && !isNaN(Number(userId))) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(userId) }, // ค้นหาผู้ใช้ที่มี ID นี้
      });

      if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }

      return NextResponse.json(user); // ส่งข้อมูลผู้ใช้ที่ค้นพบ
    } catch (error) {
      console.error('Error fetching user:', error);
      return NextResponse.json({ message: 'Failed to fetch user', error: error.message }, { status: 500 });
    }
  }

  // ถ้าไม่มี userId, ดึงข้อมูลผู้ใช้ทั้งหมด
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users); // ส่งข้อมูลผู้ใช้ทั้งหมด
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ message: 'Failed to fetch users', error: error.message }, { status: 500 });
  }
}
