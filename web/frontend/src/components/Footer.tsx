import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import '../stylesheets/footer.css';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import theme from '../theme';

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
            <a
              href="https://github.com/oslabs-beta/DEVisible"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
            </a>
            <a
              href="https://www.linkedin.com/company/devisible/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon />
            </a>
            <a
              href="https://twitter.com/DEVisible_app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterIcon />
            </a>
          </div>
        </BottomNavigation>
      </Box>
    </div>
  );
}

export default Footer;
