
"use client"; 
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const searchParams = useSearchParams(); // ใช้เพื่อดึง token จาก URL
  const router = useRouter();

  useEffect(() => {
    console.log("Token from URL:", searchParams.get("token")); // Debugging token
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = searchParams.get("token"); // ดึง token จาก URL
    if (!token) {
      alert("Token is missing!");
      return;
    }

    if (!password) {
      alert("Password cannot be empty!");
      return;
    }

    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, password }), // ตรวจสอบว่าข้อมูลถูกส่งไปถูกต้อง
    });

    const data = await response.json();
    if (!response.ok) {
      alert(data.error || "Something went wrong");
    } else {
      alert("Password reset successfully!");
      router.push("/login"); // ส่งกลับไปหน้า Login หลังจากสำเร็จ
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Reset Password</h2>
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Reset Password</button>
    </form>
  );
}
