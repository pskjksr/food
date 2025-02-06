"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

function PhonePage() {
  const [code, setCode] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(180);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (timer === 0) {
      setIsExpired(true);
      return; 
    }

    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleInputChange = (e, index) => {
    const newCode = [...code];
    newCode[index] = e.target.value;
    setCode(newCode);
  };

  const handleVerify = () => {
    alert(`Verifying code: ${code.join("")}`);
  };

  const handleSendAgain = () => {
    setTimer(180);
    setCode(["", "", "", ""]);
    setIsExpired(false);
  };

  return (
    <div className="relative w-screen h-screen flex items-center justify-center">
      <div className="absolute top-[-71px] left-0 w-1/3 h-[700px] z-0">
        <Image
          src="/l.png"
          alt="Background image on the left"
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      <div className="flex flex-col items-center ml-[250px] mt-16 h-screen">
        <h1 className="text-shadow-xl text-[40px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFB100] to-[#FFE6AD]">
          Check your phone
        </h1>
        <div className="flex items-center mt-5">
          <p className="text-[30px] text-[#FFC94E]">We’ve sent the code to your phone</p>
        </div>

        <div className="flex justify-center items-center mt-8 gap-6">
          {code.map((digit, index) => (
            <div key={index} className="relative w-fit h-full mx-2">
              <input
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(e, index)}
                className="border-2 w-16 h-16 rounded-md border-[#FFC84B] bg-[#FFE6AD] text-[#A97500] focus:ring-[#FFE6AD] hover:bg-[#FFECC1] hover:border-[#FEFEFE] shadow-inner text-[30px] text-center"
                type="text"
              />
              <div className="absolute w-full px-3 bottom-3 -translate-x-1/2 left-1/2">
                <div className="h-[1px] border-2 border-[#FFC84B] bg-[#FFE6AD] text-[#A97500] focus:ring-[#FFE6AD] hover:bg-[#FFECC1] hover:border-[#FEFEFE] w-full"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-16">
          <p className="text-[20px] font-bold text-[#A97500]">
            Code expires in: {`${Math.floor(timer / 60)}:${timer % 60 < 10 ? "0" : ""}${timer % 60}`}
          </p>
        </div>

        <div className="flex items-center justify-center w-full max-w-[470px] my-8">
          <button
            onClick={handleVerify}
            className="w-full border-2 text-[23px] border-[#FFECC1] bg-[#EFBD4C] text-[#fbfbfb] hover:text-[#FFB100] hover:bg-[#FFECC1] hover:border-[#EFBD4C] active:bg-[#F8F8F8] rounded-xl py-1 text-center"
          >
            Verify
          </button>
        </div>

        <div className="flex items-center justify-center w-full max-w-[470px]">
          <button
            onClick={handleSendAgain}
            disabled={isExpired}
            className={`w-full border-2 text-[23px] border-[#EFBD4C] ${isExpired ? 'bg-[#FFE6AD] text-[#BFBFBF]' : 'bg-[#FFECC1] text-[#FFB100]'} hover:text-[#fbfbfb] hover:bg-[#EFBD4C] hover:border-[#FFECC1] active:bg-[#FFB100] rounded-xl py-1 text-center`}
          >
            Send again
          </button>
        </div>
      </div>
    </div>
  );
}

export default PhonePage;
