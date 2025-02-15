import { NextResponse } from "next/server";
import prisma from "../../db/prisma";
import jwt from "jsonwebtoken";
import { sendResetEmail } from "../../utils/email";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // ตรวจสอบว่าผู้ใช้อยู่ในระบบหรือไม่
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Email not found" }, { status: 404 });
    }

    // สร้าง Token สำหรับรีเซ็ตรหัสผ่าน
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    // บันทึก Token ลงในฐานข้อมูล
    await prisma.user.update({
      where: { id: user.id },
      data: { resetPasswordToken: token },
    });

    // ส่งอีเมลไปให้ผู้ใช้
    await sendResetEmail(user.email, token);

    return NextResponse.json({ message: "Reset link sent to email" }, { status: 200 });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
