import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation(); // To check which page we are on
  
  // Check if user is logged in (has a token)
  const isLoggedIn = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Don't show header on Login/Signup pages if you prefer, 
  // or simple show 'Sign In' button logic:
  const showSignInButton = location.pathname === '/' || location.pathname === '/account';

  return (
    <div className="flex items-center justify-between px-4 py-4 md:px-12 z-50 absolute w-full top-0">
      <img
        className="w-32 md:w-44 cursor-pointer"
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix Logo"
        onClick={() => navigate("/")}
      />

      {isLoggedIn ? (
        <div>
          <button 
            onClick={() => navigate('/account')} 
            className="text-white pr-4 font-bold"
          >
            Account
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-1.5 rounded font-bold hover:bg-red-700 transition duration-200"
          >
            Logout
          </button>
        </div>
      ) : (
        // Only show Sign In button if we are NOT on login/signup page already
        showSignInButton && (
          <button
            onClick={() => navigate("/login")}
            className="bg-red-600 text-white px-4 py-1.5 rounded font-bold hover:bg-red-700 transition duration-200"
          >
            Sign In
          </button>
        )
      )}
    </div>
  );
}