import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number; role: string };

    // ส่งข้อมูลไปยัง request
    const response = NextResponse.next();
    response.cookies.set('userId', decoded.userId.toString());
    response.cookies.set('userRole', decoded.role);
    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}

export const config = {
  matcher: ['/api/protected-route/:path*'], // ใช้กับ API ที่ต้องการป้องกัน
};
