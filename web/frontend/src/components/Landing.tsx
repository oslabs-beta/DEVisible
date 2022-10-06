import React from 'react';
import { Link } from 'react-scroll';
// import theme from '../theme';
import { Box } from '@mui/material';
import '../stylesheets/landing.css';
import {
  GetStarted,
  Installation,
  HowToUse,
  AboutTheTeam,
  Footer,
} from './landingSubPages/exporter';

function Landing() {
  return (
    <Box id="landingContainer" bgcolor="secondary.light">
      <GetStarted />
      <Installation />
      <HowToUse />
      <AboutTheTeam />
      <Footer />
      <div id="sidebar">
        <ul id="sidebarActive">
          <li className="sidebarItem">
            <Link to="getStarted" spy smooth offset={50} duration={500}>
              Get Started
            </Link>
          </li>
          <li className="sidebarItem">
            <Link to="installation" spy smooth offset={50} duration={500}>
              Installation
            </Link>
          </li>
          <li className="sidebarItem">
            <Link to="howToUse" spy smooth offset={50} duration={500}>
              How To Use
            </Link>
          </li>
          <li className="sidebarItem">
            <Link to="aboutTheTeam" spy smooth offset={50} duration={500}>
              About The Team
            </Link>
          </li>
          <li className="sidebarItem">
            <Link to="contactUs" spy smooth offset={50} duration={500}>
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </Box>
  );
}

export default Landing;
