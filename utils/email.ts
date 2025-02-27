import nodemailer from "nodemailer";

export async function sendResetEmail(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",  // ใช้ Gmail
    auth: {
      user: process.env.EMAIL_USER,  // อีเมลผู้ใช้
      pass: process.env.EMAIL_PASS,  // รหัสผ่าน
    },
    tls: {
      rejectUnauthorized: false,  // ยกเลิกการตรวจสอบใบรับรอง
    },
  });

  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Your Password",
      html: `<p>Click the link below to reset your password:</p>
             <a href="${resetLink}">${resetLink}</a>`,
    });
    console.log("✅ Reset email sent to:", email);
  } catch (error) {
    console.error("❌ Failed to send reset email:", error.message);  // แสดงข้อความข้อผิดพลาด
    if (error.response) {
      console.error("❌ Error response:", error.response);  // แสดงรายละเอียดการตอบกลับจาก SMTP
    }
    throw new Error("Failed to send recovery email");
  }
}
