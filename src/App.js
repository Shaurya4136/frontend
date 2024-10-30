import React from 'react';
import { BrowserRouter as  Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import OptPageSignin from './pages/OptpageSignin.js';
import LoginRegisterPageCollege from './pages/LoginRegisterpageCollege.js';
import LoginRegisterPageStudent from './pages/LoginRegisterpageStudent.js';
import LoginRegisterPageClub from './pages/LoginRegisterpageClub.js';
import StudentCommunity from './pages/StudentProfile/StudentCommunity.js';
import StudentProfile from './pages/StudentProfile/StudentProfile.js';
import StudentQuestions from './pages/StudentProfile/StudentsQuestion.js';
import ClubCommunity from './pages/ClubHeadProfile/ClubCommunity.js';
import ClubProfile from './pages/ClubHeadProfile/ClubProfile.js';
import ClubPostPage from './pages/ClubHeadProfile/ClubPost.js';
import CollegeCommunity from './pages/CollegeProfile/CollegeCommunite.js';
import CollegeProfile from './pages/CollegeProfile/CollegeProfile.js';
import CollegePostPage from './pages/CollegeProfile/CollegePost.js';
import CollegePassword from './pages/CollegeProfile/Collegepassword.js';
import ProtectedRoute from './components/ProtectedRoute.js';

const App = () => {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/SignUp" element={<OptPageSignin />} />
        <Route path="/Login" element={<OptPageSignin />} />
        <Route path="/CollegeLoginRegister" element={<LoginRegisterPageCollege />} />
        <Route path="/StudentLoginRegister" element={<LoginRegisterPageStudent />} />
        <Route path="/ClubHeadLoginRegister" element={<LoginRegisterPageClub />} />

        {/* Protected Routes */}
        <Route
          path="/student-community"
          element={
            <ProtectedRoute>
              <StudentCommunity />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student-profile"
          element={
            <ProtectedRoute>
              <StudentProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student-questions"
          element={
            <ProtectedRoute>
              <StudentQuestions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/club-community"
          element={
            <ProtectedRoute>
              <ClubCommunity />
            </ProtectedRoute>
          }
        />
        <Route
          path="/club-profile"
          element={
            <ProtectedRoute>
              <ClubProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/club-post"
          element={
            <ProtectedRoute>
              <ClubPostPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/college-community"
          element={
            <ProtectedRoute>
              <CollegeCommunity />
            </ProtectedRoute>
          }
        />
        <Route
          path="/college-profile"
          element={
            <ProtectedRoute>
              <CollegeProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/college-post"
          element={
            <ProtectedRoute>
              <CollegePostPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/college-password"
          element={
            <ProtectedRoute>
              <CollegePassword />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
