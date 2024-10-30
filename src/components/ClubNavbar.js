// src/components/ClubNavbar.js
import React, { useState, useEffect, useRef } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ClubNavbar = () => {
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleProfileOptions = () => {
    setShowProfileOptions((prev) => !prev);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setShowProfileOptions(false); // Close dropdown after navigation
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 shadow-lg">
      <h1 className="text-2xl font-bold">Club Community</h1>
      <div className="relative" ref={dropdownRef}>
        <FaUserCircle
          className="text-4xl cursor-pointer"
          onClick={toggleProfileOptions}
        />
        {showProfileOptions && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-700 shadow-md rounded-lg">
            <ul className="py-2">
              <li
                className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                onClick={() => handleNavigation('/club-community')}
              >
                Club Community
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                onClick={() => handleNavigation('/club-profile')}
              >
                Profile
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                onClick={() => handleNavigation('/club-post')}
              >
                Post
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                onClick={handleLogout}
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

export default ClubNavbar;
