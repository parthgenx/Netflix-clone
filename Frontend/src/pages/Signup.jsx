import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1. Send data to the Signup Endpoint
      await axios.post("http://localhost:5000/signup", {
        email,
        password,
      });

      // 2. If successful, redirect to Login page so they can sign in
      alert("Account created! Please log in.");
      navigate("/login");
      
    } catch (err) {
      console.error(err);
      // Check if the error is "User already exists"
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to create account. Try again.");
      }
    }
  };

  return (
    <div className="relative w-full h-screen">
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
        alt="background"
        className="absolute w-full h-full object-cover -z-10 opacity-50"
      />
      <div className="absolute w-full h-full bg-black/60 -z-10"></div>

      {/* Pass login={false} so header shows 'Sign In' button */}
      <Header login={false} />

      <div className="flex justify-center items-center h-full">
        <div className="bg-black/75 p-12 w-full max-w-md rounded-md text-white">
          <h2 className="text-3xl font-bold mb-8">Sign Up</h2>

          {error && <p className="text-red-500 font-bold mb-4">{error}</p>}

          <form className="flex flex-col gap-6" onSubmit={handleSignup}>
            <input
              type="email"
              placeholder="Email address"
              className="p-3 rounded bg-[#333] placeholder-gray-400 outline-none focus:bg-[#454545]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="p-3 rounded bg-[#333] placeholder-gray-400 outline-none focus:bg-[#454545]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <button className="bg-red-600 py-3 rounded font-bold hover:bg-red-700 transition duration-200">
              Sign Up
            </button>
          </form>

          <div className="mt-10 text-gray-400 text-sm">
            Already have an account?{" "}
            <span 
              onClick={() => navigate("/login")}
              className="text-white hover:underline cursor-pointer font-bold"
            >
              Sign in now.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}