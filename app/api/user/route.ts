import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import prisma from '../db/prisma'; // Prisma Client
import { auth } from '@/config/auth';

// ฟังก์ชันตรวจสอบ JWT Token ในคุกกี้


export async function GET(request: NextRequest) {

  try {

      const session = await auth();

      return NextResponse.json(session?.user); // ส่งข้อมูลผู้ใช้

  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ message: 'Failed to fetch user', error: error }, { status: 500 });
  }
}