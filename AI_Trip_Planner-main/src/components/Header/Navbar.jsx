import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { firebaseLogout } from "../../firebase/auth";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();


  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 shadow-md backdrop-blur-md"
          : "bg-white"
      }`}
    >
      <nav className="h-20 max-w-7xl mx-auto flex justify-between items-center px-4 md:px-10 py-3">
        {/* ✅ Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://www.svgrepo.com/show/494022/travel.svg"
            alt="TripMate Logo"
            className="h-10 w-auto rounded-md"
          />
          <span className="text-2xl font-semibold text-emerald-700">
            тᖇเ𝐏ｍ𝕒𝓉ᵉ
          </span>
        </Link>

        {/* ✅ Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          {["Discover", "Trips","Reviews", "Contact"].map((page) => (
            <NavLink
              key={page}
              to={page === "Discover" ? "/" : `/${page.toLowerCase()}`}
              className={({ isActive }) =>
                `relative text-[16px] font-medium transition duration-200 
                ${
                  isActive
                    ? "text-emerald-700 after:w-full"
                    : "text-gray-700 hover:text-emerald-600 after:w-0 hover:after:w-full"
                } 
                after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-emerald-700 after:transition-all`
              }
            >
              {page}
            </NavLink>
          ))}
        </div>

        {/* ✅ Desktop Buttons */}
        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-700">
              Hi, {user?.email?.split("@")[0]}
            </span>
        
            <button
              onClick={() => firebaseLogout()}
              className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-emerald-50"
            >
              Log out
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-emerald-50"
            >
              Log in
            </Link>
        
            <Link
              to="/sign-up"
              className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700"
            >
              Sign Up
            </Link>
          </div>
        )}

        {/* ✅ Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-gray-700 hover:text-emerald-600 focus:outline-none transition"
        >
          {menuOpen ? (
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* ✅ Mobile Dropdown */}
      {menuOpen && (
        <div className="lg:hidden bg-white shadow-md border-t animate-slideDown">
          <div className="flex flex-col items-center py-4 space-y-3">
            {["Discover", "Trips", "Contact", "My Trips"].map((page) => (
              <NavLink
                key={page}
                to={page === "Discover"? "/": "/" + page.toLowerCase().replace(" ", "-")}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block w-full text-center py-2 rounded-md text-[15px] ${
                    isActive
                      ? "font-semibold bg-emerald-50 text-emerald-700"
                      : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                  } transition`
                }
              >
                {page}
              </NavLink>
            ))}

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-700">
                  Hi, {user?.email?.split("@")[0]}
                </span>
            
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-emerald-50"
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-emerald-50"
                >
                  Log in
                </Link>
            
                <Link
                  to="/sign-up"
                  className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700"
                >
                  Sign Up
                </Link>
              </div>
            )}

          </div>
        </div>
      )}
    </header>
  );
}
