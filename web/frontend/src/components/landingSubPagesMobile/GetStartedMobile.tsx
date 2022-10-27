import React from 'react';
import {
  Button,
  Divider,
  Box,
  Typography,
  IconButton,
  Paper,
} from '@mui/material';
import { Link } from 'react-scroll';
import theme from '../../theme';
import RepoTile from '../../assets/RepoTile.png';
import { KeyboardArrowDown as KeyboardArrowDownIcon } from '@mui/icons-material';
import '../../stylesheets/get-started-mobile.css';
import TransparentOrange from '../../assets/Transparent_Orange.svg';
function GetStartedMobile() {
  return (
    <Paper
      className="getStartedMobileContainer"
      sx={{ bgcolor: 'primary.light' }}
      elevation={0}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box className="getStartedMobileTitle" sx={{ bgcolor: 'primary.main' }}>
          <Box className="getStartedMobileImageContainer">
            <img src={TransparentOrange} alt="DEVisible" />
          </Box>
          <Typography color="white">
            Make tracking your micro-frontend architecture a micro-hassle
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          color: 'primary.main',
          position: 'absolute',
          top: '87.5%',
        }}
      >
        <Link
          to="builtByDevelopersContainer"
          spy
          smooth
          offset={0}
          duration={500}
        >
          <IconButton className="scrollDown" size="large">
            <KeyboardArrowDownIcon
              fontSize="large"
              sx={{ color: 'secondary.main' }}
            />
          </IconButton>
        </Link>
      </Box>
    </Paper>
  );
}

export default GetStartedMobile;
