import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const LoginRegisterPageclub = () => {
  const location = useLocation();
  const { role } = location.state || {};
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://backend-1-w4pq.onrender.com/auth/login", {
        email,
        password,
        role, // Include role in the login request
      });

      console.log("Login successful:", response.data);

      if (response.data.success) {
        localStorage.setItem('token', response.data.token); // Store token for authentication
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
        <h1 className="text-4xl text-cyan-500 font-bold mb-4">{role ? role.toUpperCase() : "USER"}</h1>
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

        <form onSubmit={isLogin ? handleLogin : handleRegister} className="flex flex-col space-y-4">
          {!isLogin && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
              className="p-3 rounded bg-gray-700 text-white"
            />
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="p-3 rounded bg-gray-700 text-white"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="p-3 rounded bg-gray-700 text-white"
          />
          <button
            type="submit"
            className="w-full p-3 bg-cyan-500 rounded text-white font-bold transition duration-300 hover:bg-cyan-600"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginRegisterPageclub;
