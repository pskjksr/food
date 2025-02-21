// app/api/upload/route.ts
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("image");

    console.log("File received:", file);
    console.log("Type of file:", typeof file);

    // ตรวจสอบว่า file เป็น instance ของ File
    if (!(file instanceof File)) {
      console.error("File is not valid:", file);
      return NextResponse.json({ error: "Invalid file upload" }, { status: 400 });
    }

    const fileName = file.name;
    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(process.cwd(), "public", "uploads", fileName);

    await writeFile(filePath, buffer);

    const imageUrl = `/uploads/${fileName}`;
    console.log("File saved at:", filePath);
    return NextResponse.json({ imageUrl }, { status: 200 });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed", details: error.message }, { status: 500 });
  }
}
