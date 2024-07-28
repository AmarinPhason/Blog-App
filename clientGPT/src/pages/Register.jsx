import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // เพิ่ม state สำหรับข้อผิดพลาด
  const [success, setSuccess] = useState(null); // เพิ่ม state สำหรับข้อความสำเร็จ
  const navigate = useNavigate(); // ใช้ useNavigate เพื่อเปลี่ยนหน้า

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { username, email, password };

    try {
      const response = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to register");
      }

      console.log("Registration successful:", data);
      setError(null); // ลบข้อผิดพลาดถ้าการลงทะเบียนสำเร็จ
      setSuccess("✅ Register success! Redirecting to login page..."); // ตั้งค่าข้อความสำเร็จ
    } catch (error) {
      setError(error.message); // ตั้งค่าข้อความข้อผิดพลาด
      setSuccess(null); // ลบข้อความสำเร็จถ้ามีข้อผิดพลาด
      console.error("Error:", error.message);
    }
  };

  // ใช้ useEffect เพื่อเปลี่ยนหน้าไปยัง /login หลังจาก 3 วินาที
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);

      return () => clearTimeout(timer); // ล้าง timeout เมื่อ component ถูก unmount
    }
  }, [success, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}{" "}
        {/* แสดงข้อผิดพลาด */}
        {success && <div className="text-green-500 mb-4">{success}</div>}{" "}
        {/* แสดงข้อความสำเร็จ */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Register
          </button>
          <div className="mt-2">
            {" "}
            <OAuth />
          </div>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
