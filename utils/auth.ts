// utils/auth.ts
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function verifyAuth(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1]; // ดึง token จาก Authorization header

  if (!token) {
    throw new Error("No token provided"); // ถ้าไม่มี token
  }

  try {
    // ตรวจสอบ token โดยใช้ JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return decoded as { id: number; role: "ADMIN" | "USER" }; // คืนค่า user id และ role
  } catch (error) {
    console.error("JWT verification error:", error);
    throw new Error("Invalid or expired token");
  }
}
