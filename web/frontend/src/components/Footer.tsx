import React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import '../stylesheets/footer.css';
import { styled } from '@mui/system';
import theme from '../theme';

function Footer() {
  return (
    <Box className="footerContainer">
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
            opacity: 0.2,
          }}
        />
      </Box>
    </Box>
  );
}

export default Footer;
