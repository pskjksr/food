import { NextResponse } from "next/server";
import prisma from "../db/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required!" }, { status: 400 });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found!" }, { status: 404 });
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid password!" }, { status: 401 });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    return NextResponse.json({ message: "Login successful!", token, user }, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
