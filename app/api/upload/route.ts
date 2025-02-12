import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // ปิดการใช้งาน bodyParser เพื่อจัดการไฟล์รูปภาพ
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => {
      chunks.push(chunk);
    });

    req.on('end', () => {
      const buffer = Buffer.concat(chunks);
      const filePath = path.join(process.cwd(), 'public', 'uploads', 'profile.jpg');
      fs.writeFileSync(filePath, buffer);
      res.status(200).json({ imageUrl: '/uploads/profile.jpg' });
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}