import React from 'react';
import { Link } from 'react-scroll';
import { Box } from '@mui/material';
import '../stylesheets/landing.css';
import { useInView } from 'react-intersection-observer';
import { StyledSideBar } from './styledComponents/StyledComponents';
import { GetStarted, Installation, HowToUse } from './landingSubPages/Exporter';
import theme from '../theme';

/**
 * function to render landing page and all of its components
 * @returns JSX.Element
 */
function Landing() {
  const { ref: footerRef, inView: footerRefIsVisible } = useInView();

  return (
    <Box id="landingContainer" bgcolor="white">
      <GetStarted />
      <Installation />
      <HowToUse />
      {!footerRefIsVisible && (
        <StyledSideBar
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
        </StyledSideBar>
      )}
      <div ref={footerRef} style={{ opacity: 0 }} />
    </Box>
  );
}

export default Landing;
