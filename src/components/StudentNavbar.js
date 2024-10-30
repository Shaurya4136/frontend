// src/components/StudentNavbar.js

import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 

const StudentNavbar = () => {
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const navigate = useNavigate(); 

  const toggleProfileOptions = () => {
    setShowProfileOptions(!showProfileOptions);
  };

  const handleProfileClick = () => {
    navigate('/student-Profile'); 
  };

  const handleProfileClick2 = () => {
    navigate('/student-Questions'); 
  };

  const handleProfileClick3 = () => {
    navigate('/student-Community'); 
  };
  const handleProfileClick4 = () => {
    navigate('/StudentLoginRegister'); 
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 shadow-lg">
      <h1 className="text-2xl font-bold">Coding Community</h1>
      <div className="relative">
        <FaUserCircle
          className="text-4xl cursor-pointer"
          onClick={toggleProfileOptions}
        />
        {showProfileOptions && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-700 shadow-md rounded-lg">
            <ul className="py-2">
              <li
                className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                onClick={handleProfileClick3} // Correctly handle Community click
              >
                Community
              </li>
              <li 
                className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                onClick={handleProfileClick2} // Correctly handle My Questions click
              >
                My Questions
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                onClick={handleProfileClick} // Correctly handle Profile click
              >
                Profile
              </li>
              <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
              onClick={handleProfileClick4} // Correctly handle Profile click
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentNavbar;
