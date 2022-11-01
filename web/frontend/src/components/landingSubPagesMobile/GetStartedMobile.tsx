import React from 'react';
import { Box, Typography, IconButton, Paper } from '@mui/material';
import { Link } from 'react-scroll';
import { KeyboardArrowDown as KeyboardArrowDownIcon } from '@mui/icons-material';
import { StyledParagraph } from '../styledComponents/StyledComponents';
import '../../stylesheets/get-started-mobile.css';
import TransparentOrange from '../../assets/Transparent_Orange.svg';
import theme from '../../theme';

interface GetStartedProps {
  viewWidth: number;
}

function GetStartedMobile({ viewWidth }: GetStartedProps) {
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
        <Box
          className="getStartedMobileTitle"
          sx={{
            bgcolor: 'primary.main',
            [theme.breakpoints.up('md')]: { width: '100%' },
          }}
        >
          <Box className="getStartedMobileImageContainer">
            <img src={TransparentOrange} alt="DEVisible" />
          </Box>
          <Typography color="white" id="subTitle">
            Make tracking your micro-frontend architecture a micro-hassle
          </Typography>
          {viewWidth > 1600 && (
            <StyledParagraph className="sectionText">
              As micro-frontend architectures rise to prominence so do the
              problems with tracking such complex systems. <br /> Introducing
              DEVisible, a monitoring tool that works alongside your testing,
              build, and deployment process to produce powerful visualizations
              on crucial metadata for your DevOps teams to make profitable
              time-saving decisions.
            </StyledParagraph>
          )}
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
