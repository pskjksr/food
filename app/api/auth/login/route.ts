import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../utils/prismaClient"; // Prisma Client

export async function POST(req: NextRequest) {
  try {
    // รับข้อมูลจาก body
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }

    // ค้นหาผู้ใช้จากฐานข้อมูล
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // ตรวจสอบรหัสผ่าน
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // ตรวจสอบการตั้งค่า JWT_SECRET
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return NextResponse.json({ error: "JWT secret is not defined" }, { status: 500 });
    }

    // สร้าง JWT Token
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, jwtSecret, {
      expiresIn: "1h", // Token หมดอายุใน 1 ชั่วโมง
    });

    // สร้าง response พร้อมข้อมูลผู้ใช้
    const response = NextResponse.json(
      { message: "Login successful", token, user: { id: user.id, email: user.email, role: user.role } },
      { status: 200 }
    );

    // ตั้งค่าคุกกี้ authToken ในฝั่ง client
    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // ใช้ secure เมื่ออยู่ใน production
      maxAge: 60 * 60, // 1 ชั่วโมง
      path: "/",
    });

    return response;
  } catch (error: any) {
    // จัดการข้อผิดพลาด
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal Server Error", details: String(error) }, { status: 500 });
  }
}
