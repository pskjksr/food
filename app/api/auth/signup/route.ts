// app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/utils/prismaClient"; 

export async function POST(req: NextRequest) {
  try {
    // อ่านข้อมูลจาก request body เป็น JSON
    const body = await req.json();
    console.log("Received request body:", body);

    const { name, email, password } = body;
    
    // ตรวจสอบว่าข้อมูลครบถ้วนหรือไม่
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // ตรวจสอบว่า email นี้มีผู้ใช้งานอยู่แล้วหรือไม่
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }
    
    // เข้ารหัสรหัสผ่านก่อนบันทึกลงฐานข้อมูล
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // สร้างผู้ใช้งานใหม่ในฐานข้อมูล
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    
    return NextResponse.json(
      { message: "User registered successfully", user },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
