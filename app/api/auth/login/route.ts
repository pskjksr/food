// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../utils/prismaClient"; // ตรวจสอบว่าไฟล์นี้อยู่ใน /utils/prismaClient.ts

export async function POST(req: NextRequest) {
  try {
    // อ่านข้อมูลจาก request เป็น raw text
    const rawBody = await req.text();
    console.log("Raw body received:", rawBody);

    // แปลง raw text เป็น JSON
    let body;
    try {
      body = JSON.parse(rawBody);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      return NextResponse.json(
        { error: "Invalid JSON input", details: String(parseError) },
        { status: 400 }
      );
    }
    
    console.log("Parsed body:", body);
    
    // ดึงข้อมูล email และ password จาก body
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // ค้นหาผู้ใช้จากฐานข้อมูลด้วย email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }
    
    // เปรียบเทียบรหัสผ่าน (password ที่รับมาจะต้องตรงกับที่ถูกเข้ารหัสในฐานข้อมูล)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }
    
    // สร้าง JWT token (ตรวจสอบว่าได้ตั้งค่า JWT_SECRET ใน .env แล้ว)
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    
    return NextResponse.json(
      { message: "Login successful", token },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: String(error) },
      { status: 500 }
    );
  }
}
