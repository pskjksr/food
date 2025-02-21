import { NextRequest, NextResponse } from "next/server";
import prisma from "../../db/prisma"; // ✅ ตรวจสอบ path ให้ถูกต้อง

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // 🔹 ค้นหาผู้ใช้ในฐานข้อมูล
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 🔹 สร้าง Token รีเซ็ตรหัสผ่าน (จำเป็นต้องเข้ารหัส)
    const resetToken = Math.random().toString(36).substr(2, 8); // ตัวอย่าง (ควรใช้ JWT หรือ crypto)
    await prisma.user.update({
      where: { email },
      data: { resetPasswordToken: resetToken, resetPasswordExpires: new Date(Date.now() + 3600000) }, // 1 ชั่วโมง
    });

    // 🔹 ส่งอีเมล (ต้องใช้บริการส่งอีเมล เช่น Nodemailer, SendGrid)
    console.log(`Send reset email to ${email} with token: ${resetToken}`);

    return NextResponse.json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
