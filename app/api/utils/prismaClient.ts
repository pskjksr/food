// /utils/prismaClient.ts
import { PrismaClient } from '@prisma/client';

// สร้าง Prisma Client
const prisma = new PrismaClient();

// ใช้ `prisma` ในการติดต่อกับฐานข้อมูล เช่น สร้าง, อ่าน, อัปเดต, ลบ
export default prisma;
