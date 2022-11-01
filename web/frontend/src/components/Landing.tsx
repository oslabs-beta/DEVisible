import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Box } from '@mui/material';
import '../stylesheets/landing.css';
import { useInView } from 'react-intersection-observer';
import { StyledSideBar } from './styledComponents/StyledComponents';
import {
  GetStarted,
  CommandLineInstructions,
  HowToUse,
} from './landingSubPages/Exporter';
import {
  GetStartedMobile,
  BuiltByDevelopersMobile,
  GitHubInstructionsMobile,
  CommandLineInstructionsMobile,
} from './landingSubPagesMobile/ExporterMobile';
import theme from '../theme';

/**
 * function to render landing page and all of its components
 * @returns JSX.Element
 */
function Landing() {
  const { ref: footerRef, inView: footerRefIsVisible } = useInView();
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResizeWindow = () => setWindowWidth(window.innerWidth);
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener('resize', handleResizeWindow);
  }, []);
  return (
    <Box>
      {windowWidth < 10000 ? (
        <Box>
          <GetStartedMobile viewWidth={windowWidth} />
          <BuiltByDevelopersMobile />
          <GitHubInstructionsMobile />
          <CommandLineInstructionsMobile />
        </Box>
      ) : (
        <Box id="landingContainer" bgcolor="white">
          <GetStarted />
          <CommandLineInstructions />
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
                  Running in CLI
                </Link>
              </div>
              <div className="sidebarItem">
                <Link to="howToUse" spy smooth offset={0} duration={500}>
                  Running in CI/CD
                </Link>
              </div>
            </StyledSideBar>
          )}
          <div ref={footerRef} style={{ opacity: 0 }} />
        </Box>
      )}
    </Box>
  );
}

export default Landing;
