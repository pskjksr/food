"use client";

import Link from "next/link";
import Background from "../components/Background";

function SignupPage() {
  return (
    <div>
      <Background />
      <div className="flex flex-col justify-center items-center ml-52 mt-14">
        <h1 className="text-shadow-xl text-[55px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFB100] to-[#FFE6AD]">
          Welcome to FoodFusion!
        </h1>
        <div className="flex items-center mt-3">
          <p className="text-[32px] text-[#FFC94E]">Already Have an account?</p>
          <Link
            className="ml-2 text-[32px] font-bold text-[#A97500] underline decoration-[#A97500] hover:text-[#FFB100] hover:decoration-[#FFB100]"
            href="/login"
          >
            Log in
          </Link>
        </div>

        <form >

          {/* Name input */}
          <div className="my-6 w-full">
            <label htmlFor="name"></label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full px-4 pr-48 text-[23px] py-2 border-2 border-[#FFC84B] bg-[#FFE6AD] text-[#A97500] focus:ring-[#FFE6AD] hover:bg-[#FFECC1] hover:border-[#FEFEFE] rounded-md shadow-sm focus:outline-none focus:ring-2"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email input */}
          <div className="mb-6 w-full">
            <label htmlFor="email"></label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-4 py-2 text-[23px] border-2 border-[#FFC84B] bg-[#FFE6AD] text-[#A97500] focus:ring-[#FFE6AD] hover:bg-[#FFECC1] hover:border-[#FEFEFE] rounded-md shadow-sm focus:outline-none focus:ring-2"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password input */}
          <div className="mb-6 w-full">
            <label htmlFor="password"></label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-4 py-2 text-[23px] border-2 border-[#FFC84B] bg-[#FFE6AD] text-[#A97500] focus:ring-[#FFE6AD] hover:bg-[#FFECC1] hover:border-[#FEFEFE] rounded-md shadow-sm focus:outline-none focus:ring-2"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="ml-2 mb-8">
            <Link className="text-[20px] font-bold text-[#A97500] hover:text-[#FFB100] cursor-pointer" href="/recovery">
              Forgot your password?
            </Link>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-center w-full mt-5">
            <button
              className="w-full border-2 text-[24px] border-[#FFECC1] bg-[#EFBD4C] text-[#fbfbfb] hover:text-[#FFB100] hover:bg-[#FFECC1] hover:border-[#EFBD4C] active:bg-[#F8F8F8] rounded-xl py-1 text-center"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
