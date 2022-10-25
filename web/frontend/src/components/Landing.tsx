import React from 'react';
import { Link } from 'react-scroll';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import '../stylesheets/landing.css';
import { GetStarted, Installation, HowToUse } from './landingSubPages/Exporter';
import theme from '../theme';

/**
 * function to render landing page and all of its components
 * @returns JSX.Element
 */
function Landing() {
  const StyledSideBar = styled(Box)({
    position: 'fixed',
    right: '0.5%',
    top: '15%',
    fontSize: '1em',
    height: '14%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: '6',
    fontWeight: '600',
    borderRadius: '10px',
    cursor: 'pointer',
    textAlign: 'center',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0.19)',
    [theme.breakpoints.up('desktopfullhd')]: {
      width: '6%',
    },
    [theme.breakpoints.down('desktopfullhd')]: {
      width: '8%',
      fontSize: '1em',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '1.2em',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '2em',
      width: '50%',
      height: '5%',
      flexDirection: 'row',
      position: 'fixed',
      top: '90vh',
      left: '25vw',
    },
  });
  return (
    <Box id="landingContainer" bgcolor="white">
      <GetStarted />
      <Installation />
      <HowToUse />
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
    </Box>
  );
}

export default Landing;
