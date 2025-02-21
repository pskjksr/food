"use client";

import React, { useState } from "react";
import Image from "next/image";

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ตรวจสอบความยาวและตัวเลขใน password
  const isValidLength = password.length >= 6;
  const containsNumber = /\d/.test(password);
  const isValid = isValidLength && containsNumber;

  // อัปเดตค่ารหัสผ่าน
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // ส่งข้อมูลไป API
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) return;

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Reset failed");

      alert("Password reset successful!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to reset password");
    }
  };

  return (
    <div className="relative w-screen h-screen flex">
      {/* Left Image */}
      <div className="absolute top-[-71px] left-0 w-1/3 h-[700px] z-0">
        <Image src="/l.png" alt="Background" fill className="object-cover" unoptimized />
      </div>

      {/* Reset Password Form */}
      <div className="flex flex-col ml-[570px] mt-10 h-screen">
        <h1 className="text-shadow-xl text-[40px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFB100] to-[#FFE6AD]">
          Reset your password
        </h1>
        <p className="text-[30px] text-[#FFC94E] mb-4">Please enter your new password</p>

        <form className="w-full max-w-[420px]" onSubmit={handleSubmit}>
          {/* Password Input */}
          <div className="mb-5 w-full relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              className="mt-1 block w-full px-4 py-1 text-[20px] border-2 border-[#FFC84B] bg-[#FFE6AD] text-[#A97500] hover:bg-[#FFECC1] hover:border-[#FEFEFE] rounded-md shadow-sm focus:outline-none focus:ring-2"
              placeholder="Enter your password"
              required
            />
            {/* Toggle Password Visibility */}
            {password && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#A97500] hover:text-[#FFB100]"
              >
                <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            )}
          </div>

          {/* Password Validation Checks */}
          <div className="space-y-2">
            <div className="flex items-center">
              <i
                className={`fa-solid fa-check border-2 p-1 mr-2 rounded-full w-6 h-6 flex items-center justify-center text-sm ${
                  isValidLength ? "bg-[#EFBD4C] border-[#EFBD4C]" : "bg-[#C8C1B0] border-[#C8C1B0]"
                }`}
              ></i>
              <p className="text-[#A97500] text-[15px]">At least 6 characters</p>
            </div>
            <div className="flex items-center">
              <i
                className={`fa-solid fa-check border-2 p-1 mr-2 rounded-full w-6 h-6 flex items-center justify-center text-sm ${
                  containsNumber ? "bg-[#EFBD4C] border-[#EFBD4C]" : "bg-[#C8C1B0] border-[#C8C1B0]"
                }`}
              ></i>
              <p className="text-[#A97500] text-[15px]">Contains a number</p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-center w-full mt-8">
            <button
              type="submit"
              className="w-full border-2 text-[23px] border-[#FFECC1] bg-[#EFBD4C] text-[#fbfbfb] hover:text-[#FFB100] hover:bg-[#FFECC1] hover:border-[#EFBD4C] active:bg-[#F8F8F8] rounded-xl py-1 text-center"
              disabled={!isValid}
            >
              Done
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
