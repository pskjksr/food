import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import prisma from '../db/prisma'; // Prisma Client

// ฟังก์ชันตรวจสอบ JWT Token ในคุกกี้
const verifyToken = (token: string) => {
  return new Promise<any>((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET || '', (err, decoded) => {
      if (err) return reject('Invalid or expired token');
      resolve(decoded);
    });
  });
};

export async function GET(request: NextRequest) {
  const authToken = request.cookies.get('authToken')?.value; // ดึง Token จากคุกกี้และแปลงเป็น string
  if (!authToken) {
    return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
  }

  try {
    const decoded = await verifyToken(authToken); // ตรวจสอบ Token
    const userId = decoded.id; // ดึงข้อมูล userId จาก Token

    const url = new URL(request.url);
    const userIdParam = url.pathname.split('/').pop(); // ดึง ID จาก URL

    if (userIdParam && !isNaN(Number(userIdParam))) {
      // ถ้ามี userId ใน URL, ดึงข้อมูลผู้ใช้ตาม ID
      const user = await prisma.user.findUnique({
        where: { id: parseInt(userIdParam) },
      });

      if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }

      // ตรวจสอบสิทธิ์ของผู้ใช้ (ตัวอย่างเช่น ต้องเป็น admin หรือผู้ใช้ที่มี ID ตรงกับ userId)
      if (decoded.role !== 'ADMIN' && decoded.id !== userId) {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
      }

      return NextResponse.json(user); // ส่งข้อมูลผู้ใช้
    }

    // ถ้าไม่มี userId ใน URL, ดึงข้อมูลผู้ใช้ทั้งหมด
    const users = await prisma.user.findMany();
    return NextResponse.json(users); // ส่งข้อมูลผู้ใช้ทั้งหมด
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ message: 'Failed to fetch user', error: error.message }, { status: 500 });
  }
}
