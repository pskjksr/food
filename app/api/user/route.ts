import { NextApiRequest, NextApiResponse } from 'next';

interface UserData {
  name: string;
  imageUrl?: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<UserData>) {
  if (req.method === 'GET') {
    // ส่งข้อมูลผู้ใช้กลับ
    res.status(200).json({ name: 'John Doe', imageUrl: '/shin.jpg' });
  } else if (req.method === 'PUT') {
    // อัปเดตชื่อผู้ใช้
    const { name } = req.body;
    res.status(200).json({ name });
  } else {
    res.status(405).json({ name: 'Method not allowed' });
  }
}