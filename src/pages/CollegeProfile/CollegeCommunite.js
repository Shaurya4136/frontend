// src/pages/ClubCommunity.js

import React from 'react';
import Community from '../../components/Community';
import CollegeNavbar from '../../components/CollegeNavbar';
import CommunityData from '../../components/CommunityData.json'

const CollegeCommunity = () => (
  <Community data={CommunityData} Navbar={CollegeNavbar} />
);

export default CollegeCommunity;
