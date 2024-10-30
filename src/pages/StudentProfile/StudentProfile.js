import React, { useState } from 'react';
import { FaUserCircle, FaEdit, FaSignOutAlt } from 'react-icons/fa';
import StudentNavbar from '../../components/StudentNavbar';

const StudentProfile = () => {
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    bio: 'Software Engineer | Alumni of XYZ College',
    avatar: 'https://via.placeholder.com/150',
    joinedDate: 'January 2021',
    skills: ['JavaScript', 'React', 'Node.js', 'Python'],
  });

  const [editProfileData, setEditProfileData] = useState(profileData);

  const toggleEditPopup = () => {
    setShowEditPopup(!showEditPopup);
    setEditProfileData(profileData); // Reset form on cancel or close
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditProfileData((prevData) => ({
          ...prevData,
          avatar: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSkillsChange = (e, index) => {
    const updatedSkills = [...editProfileData.skills];
    updatedSkills[index] = e.target.value;
    setEditProfileData({ ...editProfileData, skills: updatedSkills });
  };

  const addSkill = () => {
    setEditProfileData({
      ...editProfileData,
      skills: [...editProfileData.skills, ''],
    });
  };

  const removeSkill = (index) => {
    const updatedSkills = editProfileData.skills.filter((_, i) => i !== index);
    setEditProfileData({ ...editProfileData, skills: updatedSkills });
  };

  const updateProfile = () => {
    setProfileData(editProfileData);
    setShowEditPopup(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <StudentNavbar />
      
      {/* Profile Header */}
      <div className="flex items-center justify-between p-8">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">Student Profile</h1>
        <button className="flex items-center bg-gradient-to-r from-red-600 to-red-500 px-4 py-2 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300">
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>

      {/* Profile Section */}
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
            <h3 className="text-lg font-semibold text-gray-100">Skills</h3>
            <div className="flex flex-wrap mt-2">
              {profileData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-700 text-white px-4 py-2 rounded-full mr-2 mb-2 shadow-md hover:scale-105 transform transition-all"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={toggleEditPopup}
            className="mt-6 flex items-center bg-gradient-to-r from-blue-600 to-green-600 px-4 py-2 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300"
          >
            <FaEdit className="mr-2" /> Edit Profile
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
        <ul className="space-y-4">
          {['John Doe answered a question in the Coding Community.', 'John Doe updated his profile picture.', 'John Doe completed a challenge on the coding platform.'].map((activity, index) => (
            <li key={index} className="bg-gray-700 p-4 rounded-lg shadow-md hover:scale-105 transform transition-all duration-300">
              <p className="text-gray-300">
                <span className="font-semibold">{profileData.name}</span> {activity}
              </p>
              <p className="text-sm text-gray-500">{index === 0 ? '2 hours ago' : index === 1 ? '1 day ago' : '3 days ago'}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Edit Profile Popup */}
      {showEditPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg md:max-w-3xl mx-4 overflow-auto h-auto max-h-screen">
            <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

            {/* Avatar Upload */}
            <div className="mb-4">
              <label className="block text-gray-400 mb-2">Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="bg-gray-700 text-white p-2 rounded-lg w-full"
              />
              {editProfileData.avatar && (
                <img
                  src={editProfileData.avatar}
                  alt="avatar"
                  className="w-24 h-24 rounded-full mt-4 border-4 border-gray-700"
                />
              )}
            </div>

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
              <label className="block text-gray-400 mb-2">Bio</label>
              <textarea
                name="bio"
                value={editProfileData.bio}
                onChange={handleInputChange}
                className="bg-gray-700 text-white p-2 rounded-lg w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-400 mb-2">Skills</label>
              {editProfileData.skills.map((skill, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => handleSkillsChange(e, index)}
                    className="bg-gray-700 text-white p-2 rounded-lg w-full mr-2"
                  />
                  <button
                    onClick={() => removeSkill(index)}
                    className="bg-red-600 text-white px-2 py-1 rounded-lg hover:bg-red-500 transition-all"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={addSkill}
                className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition-all"
              >
                Add Skill
              </button>
            </div>

            {/* Buttons */}
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
