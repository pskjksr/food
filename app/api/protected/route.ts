// app/api/protected/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const userId = request.cookies.get('userId')?.value;
  const userRole = request.cookies.get('userRole')?.value;

  if (!userId || !userRole) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({ userId, userRole });
}