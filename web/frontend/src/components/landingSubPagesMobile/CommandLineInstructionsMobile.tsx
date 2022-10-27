import React from 'react';
import { Button, Box, Typography, IconButton, Paper } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { Link } from 'react-scroll';
import theme from '../../theme';
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  GitHub as GitHubIcon,
} from '@mui/icons-material';
import '../../stylesheets/command-line-instructions-mobile.css';

interface CarouselItemProps {
  name: string;
}

function Item({ name }: CarouselItemProps) {
  const openInNewTab = () => {
    const url = 'https://github.com/oslabs-beta/DEVisible';
    window.open(url, '_blank', 'noopener, noreferrer');
  };
  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: 'primary.main',
        borderRadius: '15px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '60vh',
      }}
    >
      <Box className="carouselHeader">
        <Typography
          variant="h6"
          sx={{
            mt: '2%',
            mb: '2%',
            ml: '5%',
            mr: '5%',
            color: 'white',
            textAlign: 'center',
          }}
        >
          <span style={{ color: theme.palette.secondary.main }}>
            <strong>{name.split(' ')[0]}</strong>
          </span>
          &nbsp;
          {name.split(' ').slice(1).join(' ')}
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="secondary"
        // sx={{ color: 'secondary.main' }}
        endIcon={<GitHubIcon />}
        onClick={openInNewTab}
      >
        Examples
      </Button>
    </Paper>
  );
}
function CommandLineInstructionsMobile() {
  var items = [
    {
      name: 'Make an account',
    },
    {
      name: 'Navigate to your account page to view your API key',
    },
    {
      name: "Run 'npm install devisible' inside the root directory of your project(s)",
    },
    {
      name: 'Run from CLI',
    },
  ];
  return (
    <Box className="commandLineInstructionsMobileContainer">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '95%',
          minHeight: '100%',
        }}
      >
        <Box
          className="commandLineInstructionsMobileTitle"
          sx={{ bgcolor: 'secondary.main' }}
        >
          <Box>
            <Typography variant="h3" color="white" sx={{ mb: '5%' }}>
              <strong>
                <span style={{ color: theme.palette.primary.main }}>
                  <strong>Command </strong>
                </span>
                Line
                <br />
                <span style={{ color: theme.palette.primary.main }}>
                  <strong>Dep</strong>
                </span>
                loyment
              </strong>
            </Typography>
          </Box>
          <Carousel
            autoPlay={false}
            sx={{
              justifySelf: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '2.5vw',
            }}
          >
            {items.map((item, i) => (
              <Item key={i} name={item.name} />
            ))}
          </Carousel>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          color: 'primary.main',
          position: 'absolute',
          top: '287.5%',
        }}
      >
        {/* <Link
          to="commandLineInstructionsMobileContainer"
          spy
          smooth
          offset={0}
          duration={500}
        >
          <IconButton className="scrollDown">
            <KeyboardArrowDownIcon
              fontSize="large"
              sx={{ color: 'secondary.main' }}
            />
          </IconButton>
        </Link> */}
      </Box>
    </Box>
  );
}

export default CommandLineInstructionsMobile;
