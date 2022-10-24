import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import '../stylesheets/footer.css';
import theme from '../theme';
import Twitter from '../assets/Twitter Icons/Twitter social icons - rounded square - blue.png';
import GithubIcon from '../assets/GitHub-Mark-120px-plus.png';
import GithubLogo from '../assets/GitHub_Logo.png';
import LinkedIn from '../assets/LI-Logo.png';

/**
 * function to render footer
 * @returns JSX.Element
 */
function Footer() {
  return (
    <div className="footerContainer">
      <Box className="footerBox">
        <BottomNavigation
          style={{
            backgroundColor: theme.palette.primary.light,
            borderTopLeftRadius: '30px',
            borderTopRightRadius: '30px',
            borderBottomLeftRadius: '30px',
            borderBottomRightRadius: '30px',
            borderColor: theme.palette.primary.main,
            border: '1px solid',
            display: 'grid',
            width: '100%',
            gridTemplateRows: '1fr 1fr',
            gridTemplateColumns: '1fr 1fr',
            justifyContent: 'center',
            alignItems: 'center',
            // opacity: 0.2,
          }}
          showLabels
        >
          <Link to="/" id="getStarted">
            Get Started
          </Link>
          <Link to="/about" id="meetTheTeam">
            Meet The Team
          </Link>
          <div id="copyright">
            <p>DEVisible © 2022</p>
          </div>
          <div className="socials">
            Socials:
            <a
              href="https://github.com/oslabs-beta/DEVisible"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="githubIcon" src={GithubIcon} alt="Github Icon" />
            </a>
            <a
              href="https://www.linkedin.com/company/devisible/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="LinkedInLogo"
                src={LinkedIn}
                alt="LinkedIn Logo"
              />
            </a>
            <a
              href="https://twitter.com/DEVisible_app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="twitterLogo" src={Twitter} alt="Twitter Logo" />
            </a>
          </div>
        </BottomNavigation>
      </Box>
    </div>
  );
}

export default Footer;
