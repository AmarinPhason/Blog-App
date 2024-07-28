import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const { isLoggedIn, profilePicture, logout } = useAuth();

  return (
    <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
      <div className="text-lg font-bold">
        <Link to="/" className="hover:text-gray-400">
          Home
        </Link>
      </div>
      <div className="flex items-center">
        {isLoggedIn ? (
          <>
            <img
              src={profilePicture}
              alt="Profile"
              className="w-8 h-8 rounded-full mr-4"
            />
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
