import React from 'react';
import { Link } from 'react-scroll';
import { Box } from '@mui/material';
import '../stylesheets/landing.css';
import {
  GetStarted,
  Installation,
  HowToUse,
  Footer,
} from './landingSubPages/Exporter';

function Landing() {
  return (
    <Box id="landingContainer" bgcolor="white">
      <GetStarted />
      <Installation />
      <HowToUse />
      <Footer />
      <div id="sidebar">
        <ul id="sidebarActive">
          <li className="sidebarItem">
            <Link to="getStarted" spy smooth offset={-100} duration={500}>
              Get Started
            </Link>
          </li>
          <li className="sidebarItem">
            <Link to="installation" spy smooth offset={0} duration={500}>
              Installation
            </Link>
          </li>
          <li className="sidebarItem">
            <Link to="howToUse" spy smooth offset={0} duration={500}>
              How To Use
            </Link>
          </li>
          <li className="sidebarItem">
            <Link to="contactUs" spy smooth offset={0} duration={500}>
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </Box>
  );
}

export default Landing;
