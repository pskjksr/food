"use client";

import React from 'react'
import Background from "../components/Background";

function PhonePage() {
  return (
    <div>
      <Background  />
    <div className="flex flex-col justify-center items-center ml-40 mt-10">
     
      <h1 className="text-shadow-xl text-[64px] font-bold  text-transparent bg-clip-text bg-gradient-to-r from-[#FFB100] to-[#FFE6AD]">Check your phone</h1>
      <div className="flex items-center mt-5">
        <p className="text-[32px] text-[#FFC94E] ">We’ve sent the code to your phone</p>
      </div>

      {/* Input Grid */}
<div className="grid grid-cols-10  ml-[900px] w-full h-12 mt-8 mx-8">
  {/* First input */}
  <div className="relative w-fit h-full">
    <input
      maxLength={1}
      className="border-2 w-16 h-16 rounded-md border-[#c2c2c2] shadow-inner text-[30px] text-center"
      type="text"
    />
    <div className="absolute w-full px-3 bottom-3 -translate-x-1/2 left-1/2">
      <div className="h-[1px] bg-[#606060] w-full"></div>
    </div>
  </div>

  {/* Second input */}
  <div className="relative w-fit h-full">
    <input
      maxLength={1}
      className="border-2 w-16 min-h-full rounded-md border-[#c2c2c2] shadow-inner text-[30px] text-center"
      type="text"
    />
    <div className="absolute w-full px-3 bottom-3 -translate-x-1/2 left-1/2">
      <div className="h-[1px] bg-[#606060] w-full"></div>
    </div>
  </div>

  {/* Third input */}
  <div className="relative w-fit min-h-full">
    <input
      maxLength={1}
      className="border-2 rounded-md border-[#c2c2c2] shadow-inner px-2 text-[30px] text-center w-16 h-full"
      type="text"
    />
    <div className="absolute w-full px-3 bottom-3 -translate-x-1/2 left-1/2">
      <div className="h-[1px] bg-[#606060] w-full"></div>
    </div>
  </div>

  {/* Fourth input */}
  <div className="relative w-fit min-h-full">
    <input
      maxLength={1}
      className="border-2 rounded-md border-[#c2c2c2] shadow-inner px-2 text-[30px] text-center w-16 h-full"
      type="text"
    />
    <div className="absolute w-full px-3 bottom-3 -translate-x-1/2 left-1/2">
      <div className="h-[1px] bg-[#606060] w-full"></div>
    </div>
  </div>
</div>

    
    <div className="flex justify-center mt-16">
        <p className="text-[20px] font-bold text-[#A97500]  ">Code expires in : 03.12</p>
    </div>

     


      <div className='flex items-center justify-center w-full max-w-[470px] my-8 '>
        <button className='w-full border-2  text-[24px] border-[#FFECC1] bg-[#EFBD4C] text-[#fbfbfb] hover:text-[#FFB100] hover:bg-[#FFECC1] hover:border-[#EFBD4C] active:bg-[#F8F8F8] rounded-xl py-1 text-center'>
        verify</button>
      </div>

        <div className='flex items-center justify-center w-full max-w-[470px] '>
        <button className='w-full border-2  text-[24px] border-[#EFBD4C] bg-[#FFECC1] text-[#FFB100] hover:text-[#fbfbfb] hover:bg-[#EFBD4C] hover:border-[#FFECC1] active:bg-[#FFB100] rounded-xl py-1 text-center'>
        Send again</button>
      </div>
    </div>
    </div>
  )
}
export default  PhonePage ;