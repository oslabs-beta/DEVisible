import React from 'react';
import { Link } from 'react-scroll';
import { Box } from '@mui/material';
import '../stylesheets/landing.css';
import { GetStarted, Installation, HowToUse } from './landingSubPages/Exporter';
import theme from '../theme';

function Landing() {
  return (
    <Box id="landingContainer" bgcolor="white">
      <GetStarted />
      <Installation />
      <HowToUse />
      <div
        id="sidebar"
        style={{
          backgroundColor: `${theme.palette.primary.light}`,
          color: `${theme.palette.primary.main}`,
        }}
      >
        <div className="sidebarItem">
          <Link to="getStarted" spy smooth offset={-100} duration={500}>
            Get Started
          </Link>
        </div>
        <div className="sidebarItem">
          <Link to="installation" spy smooth offset={0} duration={500}>
            Installation
          </Link>
        </div>
        <div className="sidebarItem">
          <Link to="howToUse" spy smooth offset={0} duration={500}>
            How To Use
          </Link>
        </div>
        <div className="sidebarItem">
          <Link to="contactUs" spy smooth offset={0} duration={500}>
            Contact Us
          </Link>
        </div>
      </div>
    </Box>
  );
}

export default Landing;
