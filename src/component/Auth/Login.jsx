import React from "react";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../../service/firebase";
import { toast } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (result?.user) {
        toast.success("Login successful!");
        navigate("/calculator");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Failed to login. Try again.");
    }
  };

  return (
    <div className="w-screen h-screen m-0 p-0 overflow-hidden flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-2xl shadow-2xl max-w-sm w-full text-center">
        <h1 className="text-3xl font-bold mb-4 text-white drop-shadow-lg">Welcome to GD's Calculator</h1>
        <p className="mb-6 text-white/80">Sign in to continue to your Calculator</p>
        <button
          onClick={handleLogin}
          className="bg-white text-red-600 font-semibold px-6 py-3 rounded-full shadow-md hover:scale-105 transition-all duration-300 hover:bg-red-100"
        >
          Sign in with Google
        </button>
      </div>
      {/* Footer */}
      <footer className="absolute bottom-4 text-sm text-white/70 text-center">
        © 2025 GD's Calculator. All rights reserved by{" "}
        <a
          href="https://github.com/gaurav-dixit35"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white"
        >
          Gaurav Dixit
        </a>.
      </footer>
    </div>
  );
};

export default Login;
