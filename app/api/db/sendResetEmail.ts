import nodemailer from "nodemailer";

// สร้าง transporter สำหรับส่งอีเมล
const transporter = nodemailer.createTransport({
  service: "gmail", // หรือบริการอื่นๆ
  auth: {
    user: process.env.EMAIL_USER, // อีเมลที่ใช้ส่ง
    pass: process.env.EMAIL_PASS, // รหัสผ่านอีเมล
  },
  tls: {
    rejectUnauthorized: false, // ปิดการตรวจสอบ SSL (ไม่แนะนำใน production)
  },
});

// ฟังก์ชันส่งอีเมล
export async function sendResetEmail(email: string, resetToken: string) {
  const resetUrl = `${process.env.FRONTEND_URL}/resetpassword?token=${resetToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Reset your password",
    html: `
      <h2>Password Reset</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}">Reset Password</a>
    `,
  };

  try {
    // ส่งอีเมล
    await transporter.sendMail(mailOptions);
    console.log("📩 Password reset email sent successfully!");
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    throw error;
  }
}
