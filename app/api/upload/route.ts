import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import prisma from "../db/prisma"; // Prisma client

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("image");

    // ตรวจสอบว่า file เป็น instance ของ File
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Invalid file upload" }, { status: 400 });
    }

    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    const fileName = `${Date.now()}-${file.name}`; // Add a unique timestamp to the filename
    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(process.cwd(), "public", "uploads", fileName);

    // บันทึกไฟล์ลงใน public/uploads
    await writeFile(filePath, buffer);

    const imageUrl = `/uploads/${fileName}`;

    // อัปเดต URL ของรูปภาพในฐานข้อมูล
    const userId = req.headers.get("user-id"); // หาค่า userId จาก request header หรือวิธีการอื่น ๆ ที่คุณใช้
    if (userId) {
      await prisma.user.update({
        where: { id: Number(userId) },
        data: {
          profileImage: imageUrl,
        },
      });
    }

    return NextResponse.json({ imageUrl }, { status: 200 });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed", details: error.message }, { status: 500 });
  }
}
