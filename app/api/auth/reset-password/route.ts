import { NextRequest, NextResponse } from "next/server";
import prisma from "../../utils/prismaClient"; // ตรวจสอบ path ให้ถูกต้อง
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Reset Password API - Received body:", body);

    const { token, newPassword } = body;
    if (!token || !newPassword) {
      return NextResponse.json(
        { error: "Token and new password are required" },
        { status: 400 }
      );
    }

    // ตรวจสอบ token (ในตัวอย่างนี้ใช้ JWT)
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (err) {
      console.error("Token verification error:", err);
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // สมมุติว่า decoded มีค่า id ของผู้ใช้
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // เข้ารหัสรหัสผ่านใหม่
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // อัปเดตรหัสผ่านใหม่และล้างค่า reset token (ถ้ามี)
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword, resetPasswordToken: null, resetPasswordExpires: null },
    });

    return NextResponse.json({ message: "Password reset successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again.", details: error.message },
      { status: 500 }
    );
  }
}
