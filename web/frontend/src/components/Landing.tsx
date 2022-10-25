import React from 'react';
import { Link } from 'react-scroll';
import { Box } from '@mui/material';
import '../stylesheets/landing.css';
import { GetStarted, Installation, HowToUse } from './landingSubPages/Exporter';
import theme from '../theme';

/**
 * function to render landing page and all of its components
 * @returns JSX.Element
 */
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
            Install Locally
          </Link>
        </div>
        <div className="sidebarItem">
          <Link to="howToUse" spy smooth offset={0} duration={500}>
            Run in GitHub Actions
          </Link>
        </div>
      </div>
    </Box>
  );
}

export default Landing;
