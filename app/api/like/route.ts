import { NextResponse } from "next/server";
import prisma from "../db/prisma";

export async function POST(req: Request) {
    try {
      const { userId, recipeId } = await req.json();
  
      if (!userId || !recipeId) {
        return NextResponse.json({ error: 'Missing userId or recipeId' }, { status: 400 });
      }
  
      // ✅ ตรวจสอบว่าผู้ใช้เคยกด Like หรือไม่
      const existingLike = await prisma.like.findFirst({
        where: { userId, recipeId },
      });
  
      if (existingLike) {
        // ✅ ถ้าเคยกดแล้ว → ให้ยกเลิก (Unlike)
        await prisma.like.delete({ where: { id: existingLike.id } });
        return NextResponse.json({ message: 'Unliked successfully' });
      } else {
        // ✅ ถ้ายังกด Like ไม่เคย → ให้เพิ่ม Like ใหม่
        await prisma.like.create({
          data: { userId, recipeId },
        });
        return NextResponse.json({ message: 'Liked successfully' });
      }
    } catch (error) {
      return NextResponse.json(
        { error: 'Failed to update like', details: error.message },
        { status: 500 }
      );
    }
  }
  