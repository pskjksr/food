import { NextRequest, NextResponse } from "next/server";
import prisma from "../../db/prisma";  // เปลี่ยน path ตามโครงสร้างโปรเจค
import { sendResetEmail } from "../../utils/email";  // ต้องมีฟังก์ชันส่งอีเมล
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    console.log("📩 Email received:", email);

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    console.log("🔍 User found:", user);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ✅ สร้าง resetToken และหมดอายุ 1 ชั่วโมง
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 ชั่วโมง

    // ✅ บันทึกลงฐานข้อมูล
    await prisma.user.update({
      where: { email },
      data: { resetToken, resetTokenExpiry },
    });

    // ✅ ส่งอีเมลไปยังผู้ใช้
    await sendResetEmail(email, resetToken);

    return NextResponse.json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("❌ Forgot password error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
