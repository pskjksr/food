"use client"; 
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // ตัวแปรในการเปิดดูรหัส
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // ตัวแปรในการเปิดดูรหัสยืนยัน
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

    if (!password || !confirmPassword) {
      alert("Password cannot be empty!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
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
    <div className="relative w-screen h-screen flex">
      {/* รูปด้านซ้าย */}
      <div className="absolute top-[-71px] left-0 w-1/3 h-[700px] z-0">
        <Image
          src="/l.png"
          alt="Background image on the left"
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* ฟอร์มรีเซ็ตรหัสผ่าน */}
      <div className="flex flex-col ml-[570px] mt-14 h-screen">
        <h1 className="text-[40px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFB100] to-[#FFE6AD]">
          Reset Password
        </h1>
        <form onSubmit={handleSubmit} className="my-4 w-fit">
          <input
            type={showPassword ? "text" : "password"} // แสดงรหัสผ่านหรือซ่อนรหัสผ่าน
            className="mt-1 block w-full px-4 py-1 pr-40 text-[20px] border-2 border-[#FFC84B] bg-[#FFE6AD] text-[#A97500] 
            focus:ring-[#FFE6AD] hover:bg-[#FFECC1] hover:border-[#FEFEFE] rounded-md shadow-sm focus:outline-none"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)} // เปลี่ยนสถานะการแสดง/ซ่อนรหัสผ่าน
            className="text-sm text-[#FFC94E] mt-2"
          >
            {showPassword ? "Hide Password" : "Show Password"}
          </button>

          <input
            type={showConfirmPassword ? "text" : "password"} // แสดงรหัสยืนยันหรือซ่อนรหัสยืนยัน
            className="mt-4 block w-full px-4 py-1 pr-40 text-[20px] border-2 border-[#FFC84B] bg-[#FFE6AD] text-[#A97500] 
            focus:ring-[#FFE6AD] hover:bg-[#FFECC1] hover:border-[#FEFEFE] rounded-md shadow-sm focus:outline-none"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)} // เปลี่ยนสถานะการแสดง/ซ่อนรหัสยืนยัน
            className="text-sm text-[#FFC94E] mt-2"
          >
            {showConfirmPassword ? "Hide Confirm Password" : "Show Confirm Password"}
          </button>

          <button
            type="submit"
            className="w-full mt-10 py-1 text-[20px] border-2 border-[#FFECC1] bg-[#EFBD4C] text-[#fbfbfb] 
            hover:text-[#FFB100] hover:bg-[#FFECC1] hover:border-[#EFBD4C] active:bg-[#F8F8F8] rounded-xl"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
