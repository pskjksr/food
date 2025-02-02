"use client";

import Background from "../components/Background";

function Recovery() {

  return (
    <div>
      <Background />
      <div className="flex flex-col justify-center items-center ml-48  mt-10">
        <h1 className="text-[64px]  font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFB100] to-[#FFE6AD]">
          Password Recovery
        </h1>
        <div className="flex items-center mt-5">
        <p className="text-[32px] text-[#FFC94E] ml-2">Enter your email to recover your password</p>
      </div>
          <div className="my-4 w-fit mr-24 ">
            <input
              type="email"
              className="mt-1 block w-full px-4 py-2 pr-44 text-[23px]  border-2 border-[#FFC84B] bg-[#FFE6AD] text-[#A97500] focus:ring-[#FFE6AD] hover:bg-[#FFECC1] hover:border-[#FEFEFE] rounded-md shadow-sm focus:outline-none"
              placeholder="Enter your email"
              required
            />
            <button
              className="w-full mt-10 py-1 text-[24px] border-2 border-[#FFECC1] bg-[#EFBD4C] text-[#fbfbfb] hover:text-[#FFB100] hover:bg-[#FFECC1] hover:border-[#EFBD4C] active:bg-[#F8F8F8] rounded-xl "
              
            >
              Password recovery
            </button>
          </div>
      </div>
    </div>
  );
}

export default Recovery;
