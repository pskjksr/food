import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formStatus, setFormStatus] = useState({ message: "", type: "" });
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

  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      // Redirect based on user role
      if (session.user.role === "ADMIN") {
        router.push("/Recipevisitsgraph");
      } else {
        router.push("/homepage");
      }
    }
  }, [session, sessionStatus, router]);

  const handleLogin = async () => {
    if (validateForm()) {
      const result = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,  // Prevents redirect after login, handle it manually
      });

      if (result?.error) {
        setFormStatus({ message: "Invalid credentials", type: "error" });
      }
    }
  };

  return (
    <div className="login-container">
      <h1>Welcome Back to FoodFusion!</h1>
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <button onClick={handleLogin}>Log In</button>
        {formStatus.message && (
          <div className={formStatus.type === "error" ? "error" : "success"}>
            {formStatus.message}
          </div>
        )}
      </div>
      <div>
        <Link href="/signup">Dont have an account? Sign up</Link>
      </div>
    </div>
  );
}

export default LoginPage;
