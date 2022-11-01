import React from 'react';
import { Button, Box, Typography, IconButton, Paper } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { Link } from 'react-scroll';
import '../../stylesheets/github-instructions-mobile.css';
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  GitHub as GitHubIcon,
} from '@mui/icons-material';
import theme from '../../theme';

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
        bgcolor: 'secondary.main',
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
          <span style={{ color: theme.palette.primary.main }}>
            <strong>{name.split(' ')[0]}</strong>
          </span>
          &nbsp;
          {name.split(' ').slice(1).join(' ')}
        </Typography>
      </Box>
      <Button
        variant="contained"
        endIcon={<GitHubIcon />}
        onClick={openInNewTab}
      >
        See Docs
      </Button>
    </Paper>
  );
}
function GitHubInstructionsMobile() {
  const items = [
    {
      name: 'Make an account',
    },
    {
      name: 'Navigate to your account page',
    },
    {
      name: 'Create a YAML file in the .github/workflows directory of your repo',
    },
    {
      name: 'Set up your file to install DEVisible through NPM and build your application',
    },
    {
      name: 'Configure a repository secret',
    },
    {
      name: 'Navigate to the Dashboard to view your build statistics and manage your tracked dependencies',
    },
  ];
  return (
    <Box className="gitHubInstructionsMobileContainer">
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
          className="gitHubInstructionsMobileTitle"
          sx={{ bgcolor: 'primary.main' }}
        >
          <Box>
            <Typography variant="h3" color="white" sx={{ mb: '5%' }}>
              <strong>
                <span style={{ color: theme.palette.secondary.main }}>
                  GitHub{' '}
                </span>
                Actions
                <br />
                {/* <span style={{ color: theme.palette.secondary.main }}>
                  {' '}
                  For{' '}
                </span> */}
                <span style={{ color: theme.palette.secondary.main }}>Dep</span>
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
            navButtonsAlwaysVisible
          >
            {items.map((item, i) => (
              <Item key={item.name + i.toString()} name={item.name} />
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
        <Link
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
        </Link>
      </Box>
    </Box>
  );
}

export default GitHubInstructionsMobile;
