// src/components/ClubNavbar.js
import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CollegeNavbar = () => {
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleProfileOptions = () => {
    setShowProfileOptions(!showProfileOptions);
  };

  // Function to handle navigation
  const handleNavigation = (path1) => {
    navigate(path1); // Navigate to the selected path
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 shadow-lg">
      <h1 className="text-2xl font-bold">College Community</h1>
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
                onClick={() => handleNavigation('/college-community')} // Navigate to Club Community
              >
                College Community
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                onClick={() => handleNavigation('/college-profile')} // Navigate to Profile
              >
                Profile
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                onClick={() => handleNavigation('/college-post')} // Navigate to Logout (Login/Register Page)
              >
                Post
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                onClick={() => handleNavigation('/college-password')} // Navigate to Logout (Login/Register Page)
              >
                Admin
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                onClick={() => handleNavigation('/college-logout')} // Navigate to Logout (Login/Register Page)
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

export default CollegeNavbar;
