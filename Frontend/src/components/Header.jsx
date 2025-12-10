import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, Bell, User } from "lucide-react"; 
import toast from 'react-hot-toast'; // <--- Import Toast

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("token");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const showSignInButton = location.pathname === '/' || location.pathname === '/account';

  // Helper for "Coming Soon" links
  const handlePlaceholder = (menuItem) => {
    toast(`The "${menuItem}" page is under construction! 🚧`, {
      icon: '👷',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  return (
    <div className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="flex items-center justify-between px-4 py-4 md:px-10">
        
        {/* LEFT SECTION */}
        <div className="flex items-center gap-8">
          <img
            className="w-24 md:w-32 cursor-pointer"
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix Logo"
            onClick={() => navigate("/")}
          />
          {isLoggedIn && (
            <ul className="hidden md:flex gap-6 text-gray-300 text-sm font-medium">
              {/* NOW THESE HAVE FUNCTIONS */}
              <li 
                onClick={() => navigate("/")} 
                className="hover:text-white cursor-pointer transition"
              >
                Home
              </li>
              <li 
                onClick={() => handlePlaceholder("TV Shows")}
                className="hover:text-white cursor-pointer transition"
              >
                TV Shows
              </li>
              <li 
                onClick={() => handlePlaceholder("Movies")}
                className="hover:text-white cursor-pointer transition"
              >
                Movies
              </li>
              <li 
                onClick={() => handlePlaceholder("New & Popular")}
                className="hover:text-white cursor-pointer transition"
              >
                New & Popular
              </li>
              <li 
                onClick={() => navigate("/account")} // This one goes to Account
                className="hover:text-white cursor-pointer transition"
              >
                My List
              </li>
            </ul>
          )}
        </div>

        {/* RIGHT SECTION (Keep as is) */}
        <div className="flex items-center gap-6 text-white">
          {isLoggedIn ? (
            <>
              <Search className="w-5 h-5 cursor-pointer hover:text-gray-300 hidden sm:block" />
              <p className="cursor-pointer text-sm font-medium hover:text-gray-300 hidden sm:block">Kids</p>
              <Bell className="w-5 h-5 cursor-pointer hover:text-gray-300 hidden sm:block" />
              
              <div className="group relative cursor-pointer flex items-center gap-2">
                 <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center">
                    <User className="w-5 h-5" />
                 </div>
                 
                 <div className="absolute top-8 right-0 bg-black border border-gray-700 p-4 w-48 hidden group-hover:block rounded shadow-lg">
                    <p onClick={() => navigate('/account')} className="text-sm hover:underline cursor-pointer py-1">Account</p>
                    <p onClick={() => navigate('/payment')} className="text-sm hover:underline cursor-pointer py-1">Billing</p>
                    <p className="text-sm hover:underline cursor-pointer py-1">Help Center</p>
                    <hr className="border-gray-600 my-2" />
                    <p onClick={handleLogout} className="text-sm hover:underline cursor-pointer py-1 text-red-500">Sign out</p>
                 </div>
              </div>
            </>
          ) : (
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
      </div>
    </div>
  );
}