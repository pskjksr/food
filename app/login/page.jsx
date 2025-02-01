"use client";

import Link from "next/link";
import Background from "../components/Background";

function LoginPage() {

  return (
    <>
      <Background />
      <div className="flex flex-col items-center mt-14 ml-24 relative z-10">
        <h1 className="text-shadow-xl text-[64px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFB100] to-[#FFE6AD]">
          Welcome Back!
        </h1>
        <div className="flex items-center mt-5">
          <p className="text-[32px] text-[#FFC94E]">Don’t have an account?</p>
          <Link
            className="ml-2 text-[32px] font-bold text-[#A97500] underline decoration-[#A97500] hover:text-[#FFB100] hover:decoration-[#FFB100]"
            href="/signup"
          >
            Sign Up
          </Link>
        </div>

        <form>

          <div className=" my-6 w-full max-w-full">
            <label htmlFor="email"></label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full pl-4 pr-44 py-2 text-[23px] border-2 border-[#FFC84B] bg-[#FFE6AD] text-[#A97500] focus:ring-[#FFE6AD] hover:bg-[#FFECC1] hover:border-[#FEFEFE] rounded-md shadow-sm focus:outline-none focus:ring-2"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="my-6 w-full max-w-full">
            <label htmlFor="password"></label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full pl-4  py-2 text-[23px] border-2 border-[#FFC84B] bg-[#FFE6AD] text-[#A97500] focus:ring-[#FFE6AD] hover:bg-[#FFECC1] hover:border-[#FEFEFE] rounded-md shadow-sm focus:outline-none focus:ring-2"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="ml-2 mb-8">
            <Link
              className="text-[20px] font-bold text-[#A97500] hover:text-[#FFB100] cursor-pointer"
              href="/recovery"
            >
              Forgot your password?
            </Link>
          </div>

          <div className="flex items-center justify-center w-full mt-6">
            <button
              className="w-full border-2 text-[24px] border-[#FFECC1] bg-[#EFBD4C] text-[#fbfbfb] hover:text-[#FFB100] hover:bg-[#FFECC1] hover:border-[#EFBD4C] active:bg-[#F8F8F8] rounded-xl py-1 text-center"

            >Sign in
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
