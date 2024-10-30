import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaLock, FaUser } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const LoginRegisterPageStudent = () => {
  const location = useLocation();
  const { role } = location.state || {}; // Get role from location state
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
        role, // Include role in the login request
      });

      console.log("Login successful:", response.data);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token); // Store token for authentication
        navigate(response.data.redirectUrl); // Navigate to the role-based community
      }
    } catch (error) {
      console.error("Error logging in:", error.response?.data || error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/register", {
        name,
        email,
        password,
        role, // Include role in the registration request
      });

      console.log("Registration successful:", response.data);

      if (response.data.success) {
        setIsLogin(true);
      }
    } catch (error) {
      console.error("Error registering:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center animated-gradient">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl text-cyan-500 font-bold mb-4">
          {role ? role.toUpperCase() : "STUDENT"}
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-4 rounded-lg shadow-lg max-w-lg w-full"
      >
        <div className="flex mb-4">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-1/2 p-3 rounded-t-lg font-bold text-lg ${
              isLogin ? "bg-cyan-500 text-white" : "bg-gray-700 text-gray-400"
            } transition duration-300`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`w-1/2 p-3 rounded-t-lg font-bold text-lg ${
              !isLogin ? "bg-cyan-500 text-white" : "bg-gray-700 text-gray-400"
            } transition duration-300`}
          >
            Register
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, x: isLogin ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900 rounded-b-lg p-8"
        >
          {isLogin ? (
            <form onSubmit={handleLogin} className="flex flex-col space-y-4">
              <div className="mb-4">
                <label className="block text-gray-400 mb-2">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300 ease-in-out"
                    placeholder="Enter your email"
                    required
                  />
                  <FaUser className="absolute top-3 right-3 text-gray-500" />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-400 mb-2">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300 ease-in-out"
                    placeholder="Enter your password"
                    required
                  />
                  <FaLock className="absolute top-3 right-3 text-gray-500" />
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full p-3 bg-cyan-500 text-white font-bold rounded-lg shadow-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300 ease-in-out"
              >
                Login
              </motion.button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="flex flex-col space-y-4">
              <div className="mb-4">
                <label className="block text-gray-400 mb-2">Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300 ease-in-out"
                    placeholder="Enter your name"
                    required
                  />
                  <FaUser className="absolute top-3 right-3 text-gray-500" />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 mb-2">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300 ease-in-out"
                    placeholder="Enter your email"
                    required
                  />
                  <FaUser className="absolute top-3 right-3 text-gray-500" />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-400 mb-2">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300 ease-in-out"
                    placeholder="Enter your password"
                    required
                  />
                  <FaLock className="absolute top-3 right-3 text-gray-500" />
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full p-3 bg-cyan-500 text-white font-bold rounded-lg shadow-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300 ease-in-out"
              >
                Register
              </motion.button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginRegisterPageStudent;
