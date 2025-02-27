import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formStatus, setFormStatus] = useState({ message: "", type: "" });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    if (!email || !password) {
      setFormStatus({ message: "Please complete all inputs!", type: "error" });
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setFormStatus({ message: "Please enter a valid email address!", type: "error" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // ส่งข้อมูลล็อกอินไปยัง API ด้วย JSON
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setFormStatus({ message: data.error || "Login failed. Please try again.", type: "error" });
      } else {
        setFormStatus({ message: "Logged in successfully!", type: "success" });
        // รับ token และ role จาก API
        const { token, user } = await res.json();
        // เก็บ token ใน localStorage
        localStorage.setItem("authToken", token);

        if (user.role === "ADMIN") {
          router.push("/Recipevisitsgraph"); // ไปที่หน้า Recipe Visits Graph สำหรับแอดมิน
        } else {
          router.push("/homepage"); // ไปที่หน้า Profile สำหรับผู้ใช้ทั่วไป
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      setFormStatus({ message: "Something went wrong. Please try again later.", type: "error" });
    }
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

      <div className="flex flex-col ml-[570px] mt-8 h-screen">
        <h1 className="text-shadow-xl text-[40px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFB100] to-[#FFE6AD]">
          Welcome Back to FoodFusion!
        </h1>
        <div className="flex items-center mt-3">
          <p className="text-[30px] text-[#FFC94E]">Dont have an account?</p>
          <Link
            className="ml-2 text-[30px] font-bold text-[#A97500] underline decoration-[#A97500] hover:text-[#FFB100] hover:decoration-[#FFB100]"
            href="/signup"
          >
            Sign up
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="my-6 w-full">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-1 text-[20px] border-2 border-[#FFC84B] bg-[#FFE6AD] text-[#A97500] focus:ring-[#FFE6AD] hover:bg-[#FFECC1] hover:border-[#FEFEFE] rounded-md shadow-sm focus:outline-none focus:ring-2"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6 w-full relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          <div className="ml-2 mb-8">
            <Link className="text-[20px] font-bold text-[#A97500] hover:text-[#FFB100] cursor-pointer" href="/recovery">
              Forgot your password?
            </Link>
          </div>

          <div className="flex items-center justify-center w-full mt-5">
            <button
              type="submit"
              className="w-full border-2 text-[23px] border-[#FFECC1] bg-[#EFBD4C] text-[#fbfbfb] hover:text-[#FFB100] hover:bg-[#FFECC1] hover:border-[#EFBD4C] active:bg-[#F8F8F8] rounded-xl py-1 text-center"
            >
              Log In
            </button>
          </div>
        </form>

        {formStatus.message && (
          <div className={`mt-4 text-xl ${formStatus.type === "error" ? "text-red-500" : "text-green-500"}`}>
            {formStatus.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
