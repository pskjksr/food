import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { auth } from '@/config/auth'; // Assuming you have authentication setup
import prisma from "@/utils/prismaClient"; // Prisma client

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("image");

    // ตรวจสอบว่าไฟล์ที่อัพโหลดเป็นไฟล์จริง
    if (!(file instanceof File)) {
      console.error("File is not valid", file);
      return NextResponse.json({ error: "อัพโหลดไฟล์ไม่ถูกต้อง โปรดลองใหม่" }, { status: 400 });
    }

    // ตรวจสอบประเภทไฟล์ (JPEG หรือ PNG)
    const allowedTypes = ["image/jpeg", "image/png"];
    const allowedExtensions = [".jpg", ".jpeg", ".png"];
    const fileExtension = path.extname(file.name).toLowerCase();
    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
      console.error("Invalid file type", file.type);
      return NextResponse.json({ error: `ประเภทไฟล์ไม่ถูกต้อง รองรับแค่ JPEG และ PNG เท่านั้น` }, { status: 400 });
    }

    // สร้างชื่อไฟล์ที่ไม่ซ้ำกัน
    const fileName = `${Date.now()}-${file.name}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(process.cwd(), "public", "uploads", fileName);

    // เขียนไฟล์ลงในโฟลเดอร์ uploads
    await writeFile(filePath, buffer);

    // สร้าง URL สำหรับไฟล์ที่อัพโหลด
    const imageUrl = `/uploads/${fileName}`;

    // ตรวจสอบ session หรือ user ID
    const userId = req.headers.get("user-id"); // ตรวจสอบ header หรืออาจดึงจาก session, JWT
    if (!userId) {
      console.error("User ID missing in request headers");
      return NextResponse.json({ error: "ต้องการ user ID สำหรับการอัพโหลดไฟล์" }, { status: 400 });
    }

    // อัพเดตข้อมูลโปรไฟล์ในฐานข้อมูล
    const updatedUser = await prisma.user.update({
      where: { id: Number(userId) },
      data: { profileImage: imageUrl },
    });

    console.log("Image uploaded successfully:", updatedUser);
    return NextResponse.json({ imageUrl }, { status: 200 });
  } catch (error: any) {
    console.error("เกิดข้อผิดพลาดในการอัพโหลด:", error);
    return NextResponse.json({ error: "การอัพโหลดล้มเหลว", details: error.message || error }, { status: 500 });
  }
}
