import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const auth = getAuth();

export default function OAuth() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const { email, displayName, photoURL } = user;

      // ส่งข้อมูลผู้ใช้ไปยัง backend
      const response = await fetch("/api/v1/auth/google-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, displayName, photoURL }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to login");
      }
      console.log("Login successful:", response);

      navigate("/");
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg mt-4"
    >
      Login with Google
    </button>
  );
}
