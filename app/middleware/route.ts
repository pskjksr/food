import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // ถ้าไม่มี Token ให้ Redirect ไปหน้า Login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next(); // อนุญาตให้เข้าหน้าอื่นได้
}

// ใช้ Middleware ทุกหน้า ยกเว้น /login และ /register
export const config = {
  matcher: ["/((?!login|register|api/public).*)"], // อนุญาตให้เข้าหน้า login, register และ API สาธารณะ
};
