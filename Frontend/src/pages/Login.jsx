import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To show error messages

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      // 1. Send the data to your Backend
      const response = await axios.post(
        "https://netflix-backend-u33z.onrender.com/login",
        {
          email,
          password,
        }
      );

      // 2. If successful, console log the token
      console.log("Login Success! Token:", response.data.token);

      // 3. Save the token in the browser's local storage (The Pocket)
      localStorage.setItem("token", response.data.token);

      // 4. Move to Home Page
      navigate("/");
    } catch (err) {
      // 5. If password is wrong, show error
      console.error(err);
      setError("Invalid email or password. Please try again.");
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

      <Header login={true} />

      <div className="flex justify-center items-center h-full">
        <div className="bg-black/75 p-12 w-full max-w-md rounded-md text-white">
          <h2 className="text-3xl font-bold mb-8">Sign In</h2>

          {/* Show Error Message if it exists */}
          {error && <p className="text-red-500 font-bold mb-4">{error}</p>}

          <form className="flex flex-col gap-6" onSubmit={handleLogin}>
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
              Sign In
            </button>

            <div className="flex justify-between text-sm text-gray-400">
              <label>
                <input type="checkbox" className="mr-1" /> Remember me
              </label>
              <p className="hover:underline cursor-pointer">Need help?</p>
            </div>
          </form>

          <div className="mt-10 text-gray-400 text-sm">
            New to Netflix?{" "}
            <span
              onClick={() => navigate("/signup")} // <--- This was missing!
              className="text-white hover:underline cursor-pointer font-bold"
            >
              Sign up now.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
