import { NextResponse } from "next/server";
import prisma from "../db/prisma"; // ตรวจสอบให้แน่ใจว่าคุณ import Prisma ไว้
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // เช็คว่าอีเมลนี้มีอยู่แล้วหรือไม่
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    // เข้ารหัสรหัสผ่านก่อนบันทึก
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword, // เก็บรหัสผ่านที่เข้ารหัสแล้ว
      },
    });

    return NextResponse.json({ message: "User created successfully", user }, { status: 201 });

  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
