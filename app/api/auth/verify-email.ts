import  prisma  from '../utils/prismaClient';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query;

  if (!token || typeof token !== 'string') {
    return res.status(400).json({ error: 'Token is required' });
  }

  // ใช้ findFirst แทน findUnique เพราะ emailVerificationToken ไม่ได้เป็น unique
  const user = await prisma.user.findFirst({
    where: { emailVerificationToken: token },
  });

  if (!user) {
    return res.status(400).json({ error: 'Invalid token' });
  }

  // เปลี่ยนสถานะอีเมลเป็น verified
  await prisma.user.update({
    where: { id: user.id },
    data: { emailVerified: true, emailVerificationToken: null },
  });

  res.status(200).json({ message: 'Email verified successfully!' });
}
