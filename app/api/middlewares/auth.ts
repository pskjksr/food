import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  console.log("Middleware Token:", token); // ✅ Debug Token

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number; role: string };

    console.log("Decoded Token:", decoded); // ✅ Debug JWT payload

    // ตรวจสอบ Role (Admin เท่านั้น)
    if (decoded.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden: Admins only' }, { status: 403 });
    }

    // ส่งข้อมูลไปยัง request
    const response = NextResponse.next();
    response.cookies.set('userId', decoded.id.toString());
    response.cookies.set('userRole', decoded.role);
    return response;
  } catch (error) {
    console.error("JWT Error:", error);
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}

export const config = {
  matcher: ['/api/admin/:path*'], // ✅ ป้องกันเฉพาะ API สำหรับแอดมิน
};
