import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import '../stylesheets/footer.css';
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
            display: 'flex',
            flexWrap: 'wrap',
            // opacity: 0.2,
          }}
          showLabels
        >
          <BottomNavigationAction
            className="label"
            label="Get Started"
            component={Link}
            to="/"
          />
          <BottomNavigationAction
            className="label"
            label="Meet the Team"
            component={Link}
            to="/about"
          />
          <BottomNavigationAction className="label" label="DEVisible © 2022" />
        </BottomNavigation>
      </Box>
    </div>
  );
}

export default Footer;
