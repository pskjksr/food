"use client";

import { useState } from "react";
import Image from "next/image";

function Recovery() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); 
    setSuccess(false); 

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send recovery email.");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
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

      {/* ฟอร์มกู้คืนรหัสผ่าน */}
      <div className="flex flex-col ml-[570px] mt-14 h-screen">
        <h1 className="text-[40px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFB100] to-[#FFE6AD]">
          Password Recovery
        </h1>
        <p className="text-[30px] text-[#FFC94E] ml-2 mt-5">
          Enter your email to recover your password
        </p>
        <form onSubmit={handleSubmit} className="my-4 w-fit">
          <input
            type="email"
            className="mt-1 block w-full px-4 py-1 pr-40 text-[20px] border-2 border-[#FFC84B] bg-[#FFE6AD] text-[#A97500] 
            focus:ring-[#FFE6AD] hover:bg-[#FFECC1] hover:border-[#FEFEFE] rounded-md shadow-sm focus:outline-none"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
            required
          />
          {error && <p className="text-red-500 text-[16px] mt-2">{error}</p>}
          {success && (
            <p className="text-green-500 text-[16px] mt-2">
              Success! A password recovery email has been sent.
            </p>
          )}
          <button
            type="submit"
            className={`w-full mt-10 py-1 text-[20px] border-2 border-[#FFECC1] bg-[#EFBD4C] text-[#fbfbfb] 
              hover:text-[#FFB100] hover:bg-[#FFECC1] hover:border-[#EFBD4C] active:bg-[#F8F8F8] rounded-xl 
              ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Sending..." : "Password recovery"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Recovery;
