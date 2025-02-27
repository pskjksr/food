import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // อ่าน request body
    const { token, password } = body;

    if (!token || !password) {
      return NextResponse.json({ error: "Token and new password are required" }, { status: 400 });
    }

    // *** โค้ดส่วนนี้ควรเป็นการตรวจสอบ token และอัปเดตรหัสผ่านในฐานข้อมูล ***
    console.log("Resetting password for token:", token);

    return NextResponse.json({ message: "Password reset successfully!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
