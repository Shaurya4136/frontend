import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaEdit, FaSignOutAlt } from 'react-icons/fa';
import StudentNavbar from '../../components/StudentNavbar';
import axios from 'axios';

const StudentProfile = () => {
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    activities: [],
  });
  const [editProfileData, setEditProfileData] = useState({
    name: '',
    email: '',
    activities: [],
  });

  // Fetch student profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
          const token = localStorage.getItem('token');
          if (!token) {
              throw new Error("No token found");
          }
  
          const response = await axios.get('http://localhost:5000/api/student/profile', {
              headers: {
                  Authorization: `Bearer ${token}`,
              }
          });
  
          setProfileData(response.data);
          setEditProfileData(response.data);
      } catch (error) {
          console.error("Error fetching profile:", error);
          if (error.response && error.response.status === 401) {
              window.location.href = '/login';
          } else {
              alert("Something went wrong. Please try again later.");
          }
      }
  };
  

    fetchProfile();
}, []);


  const toggleEditPopup = () => {
    setShowEditPopup(!showEditPopup);
    setEditProfileData(profileData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleActivitiesChange = (e, index) => {
    const newActivities = [...editProfileData.activities];
    newActivities[index] = e.target.value;
    setEditProfileData({
      ...editProfileData,
      activities: newActivities,
    });
  };

  const addActivity = () => {
    setEditProfileData({
      ...editProfileData,
      activities: [...(editProfileData.activities || []), ''],
    });
  };

  const removeActivity = (index) => {
    const newActivities = [...editProfileData.activities];
    newActivities.splice(index, 1);
    setEditProfileData({
      ...editProfileData,
      activities: newActivities,
    });
  };

  const updateProfile = async () => {
    if (!editProfileData.name || !editProfileData.email) {
        alert("Please fill in both name and email.");
        return;
    }

    try {
        const token = localStorage.getItem('token');
        const response = await axios.put('http://localhost:5000/api/student/profile', editProfileData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        setProfileData(response.data);
        setShowEditPopup(false);
    } catch (error) {
        console.error("Error updating profile:", error);
        if (error.response && error.response.status === 401) {
            window.location.href = '/login';
        } else {
            alert("Error updating profile. Please try again.");
        }
    }
};


  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <StudentNavbar />

      <div className="flex items-center justify-between p-8">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">Student Profile</h1>
        <button onClick={handleLogout} className="flex items-center bg-gradient-to-r from-red-600 to-red-500 px-4 py-2 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300">
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>

      <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center md:items-start">
        <div className="md:w-1/4 flex justify-center mb-6 md:mb-0">
          <img
            src={profileData.avatar}
            alt="avatar"
            className="w-40 h-40 rounded-full border-4 border-gray-700 shadow-lg"
          />
        </div>

        <div className="md:w-3/4 md:pl-6">
          <h2 className="text-3xl font-semibold mb-2">{profileData.name}</h2>
          <p className="text-gray-400">{profileData.email}</p>
          <p className="mt-4 text-gray-300">{profileData.bio}</p>
          <p className="mt-2 text-sm text-gray-500">Joined: {profileData.joinedDate}</p>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-100">Activities</h3>
            <ul className="mt-2">
              {(profileData.activities || []).map((activity, index) => (
                <li key={index} className="bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md mb-2">{activity}</li>
              ))}
            </ul>
          </div>

          <button
            onClick={toggleEditPopup}
            className="mt-6 flex items-center bg-gradient-to-r from-blue-600 to-green-600 px-4 py-2 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300"
          >
            <FaEdit className="mr-2" /> Edit Profile
          </button>
        </div>
      </div>

      {showEditPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg md:max-w-3xl mx-4 overflow-auto h-auto max-h-screen">
            <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

            <div className="mb-4">
              <label className="block text-gray-400 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={editProfileData.name}
                onChange={handleInputChange}
                className="bg-gray-700 text-white p-2 rounded-lg w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-400 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={editProfileData.email}
                onChange={handleInputChange}
                className="bg-gray-700 text-white p-2 rounded-lg w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-400 mb-2">Activities</label>
              {(editProfileData.activities || []).map((activity, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={activity}
                    onChange={(e) => handleActivitiesChange(e, index)}
                    className="bg-gray-700 text-white p-2 rounded-lg w-full"
                  />
                  <button
                    type="button"
                    onClick={() => removeActivity(index)}
                    className="bg-red-600 text-white ml-2 px-4 py-2 rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addActivity}
                className="bg-green-600 text-white mt-2 px-4 py-2 rounded-lg"
              >
                Add Activity
              </button>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={toggleEditPopup}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={updateProfile}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-all"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
