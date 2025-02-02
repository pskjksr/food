"use client";

import React from 'react';
import Link from 'next/link';
import Background from "../components/Background";

function Resetpassword() {
  return (
    <div>
      <Background />
      <div className="flex flex-col justify-center items-center ml-40 mt-10">
        <h1 className="text-shadow-xl text-[55px] font-bold  text-transparent bg-clip-text bg-gradient-to-r from-[#FFB100] to-[#FFE6AD]">
          Reset your password
        </h1>
        <div className="flex items-center mr-20 mt-5">
          <p className="text-[32px] text-[#FFC94E] mb-6">Please enter your new password</p>
        </div>

        {/* Password input */}
        <div className="mb-7  w-full mr-20 max-w-[450px] ">
          <label htmlFor="password" className="block  font-medium text-[#A97500]"></label>
          <input
            type="password"
            id="password"
            name="password"
            className="mt-1 block w-full px-4 py-2 text-[23px] border-2 border-[#FFC84B] bg-[#FFE6AD] text-[#A97500] focus:ring-[#FFE6AD] hover:bg-[#FFECC1] hover:border-[#FEFEFE] rounded-md shadow-sm focus:outline-none focus:ring-2"
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="space-y-2 mr-14">
          <div className="flex items-center">
            <i className="fa-solid fa-check border-2 text-[#FFFFFF] border-[#EFBD4C] bg-[#EFBD4C] p-1 mr-2 rounded-full w-6 h-6 flex items-center justify-center text-sm"></i>
            <p className="text-[#A97500] text-[20px] ">Your password must contain: At least 6 characters</p>
          </div>
          <div className="flex items-center ">
            <i className="fa-solid fa-check border-2 border-[#C8C1B0] bg-[#C8C1B0] text-[#FFFFFF] p-1 mr-2 rounded-full w-6 h-6 flex items-center justify-center text-sm"></i>
            <p className="text-[#A97500] text-[20px]">Contains a number</p>
          </div>
        </div>

        <div className="flex items-center justify-center w-full mr-20 max-w-[450px] mt-8">
          <button
            className="w-full border-2 text-[24px] border-[#FFECC1] bg-[#EFBD4C] text-[#fbfbfb] hover:text-[#FFB100] hover:bg-[#FFECC1] hover:border-[#EFBD4C] active:bg-[#F8F8F8] rounded-xl py-1 text-center"
            
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
 export default Resetpassword ;