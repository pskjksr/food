"use client";

import React, { useState } from "react";
import Image from "next/image";

function Resetpassword() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // state สำหรับซ่อน/แสดงรหัสผ่าน
  const [isValidLength, setIsValidLength] = useState(false);
  const [containsNumber, setContainsNumber] = useState(false);
  const [isValid, setIsValid] = useState(false);

 
  const validatePassword = (password) => {
    const validLength = password.length >= 6;
    const hasNumber = /\d/.test(password);
    setIsValidLength(validLength);
    setContainsNumber(hasNumber);
    return validLength && hasNumber;
  };

  
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsValid(validatePassword(newPassword));
  };

  return (
    <div className="relative w-screen h-screen flex">
      
      <div className="absolute top-[-71px] left-0 w-1/3 h-[700px] z-0">
        <Image
          src="/l.png"
          alt="Background image on the left"
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      
      <div className="flex flex-col ml-[570px] mt-10  h-screen">
        <h1 className="text-shadow-xl text-[40px] mb-3 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFB100] to-[#FFE6AD]">
          Reset your password
        </h1>
        <p className="text-[30px] text-[#FFC94E]  mb-4">Please enter your new password</p>

       
        <form className="w-full max-w-[420px]">
          <div className="mb-5 w-full relative">
            <input
              type={showPassword ? "text" : "password"} 
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className="mt-1 block w-full px-4 py-1 text-[20px] border-2 border-[#FFC84B] bg-[#FFE6AD] text-[#A97500] focus:ring-[#FFE6AD] hover:bg-[#FFECC1] hover:border-[#FEFEFE] rounded-md shadow-sm focus:outline-none focus:ring-2"
              placeholder="Enter your password"
              required
            />
            
            {password && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#A97500] hover:text-[#FFB100]"
              >
                {showPassword ? (
                  <i className="fa-solid fa-eye-slash"></i>
                ) : (
                  <i className="fa-solid fa-eye"></i> 
                )}
              </button>
            )}
          </div>

          
          <div className="space-y-2">
            <div className="flex items-center">
              <i
                className={`fa-solid fa-check border-2 p-1 mr-2 rounded-full w-6 h-6 flex items-center justify-center text-sm ${
                  isValidLength
                    ? "bg-[#EFBD4C] border-[#EFBD4C]"
                    : "bg-[#C8C1B0] border-[#C8C1B0]"
                }`}
              ></i>
              <p className="text-[#A97500] text-[15px]">
                At least 6 characters
              </p>
            </div>
            <div className="flex items-center">
              <i
                className={`fa-solid fa-check border-2 p-1 mr-2 rounded-full w-6 h-6 flex items-center justify-center text-sm ${
                  containsNumber
                    ? "bg-[#EFBD4C] border-[#EFBD4C]"
                    : "bg-[#C8C1B0] border-[#C8C1B0]"
                }`}
              ></i>
              <p className="text-[#A97500] text-[15px]">Contains a number</p>
            </div>
          </div>

          
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
}

export default Resetpassword;