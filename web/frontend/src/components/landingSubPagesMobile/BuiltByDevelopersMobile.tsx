import React from 'react';
import { Box, Typography, IconButton, Paper } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { Link } from 'react-scroll';
import { KeyboardArrowDown as KeyboardArrowDownIcon } from '@mui/icons-material';
import theme from '../../theme';
import '../../stylesheets/built-by-developers.css';
import PlotsDev from '../../assets/PlotsDev.gif';
import RedRepo from '../../assets/RedRepo.gif';
import TrackedDeps from '../../assets/TrackedDeps.gif';

interface CarouselItemProps {
  name: string;
  image: string;
}

function Item({ name, image }: CarouselItemProps) {
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
        maxHeight: '60vh',
      }}
    >
      <Box className="carouselHeader">
        <Typography variant="h6" sx={{ mt: '2%', mb: '2%', color: 'white' }}>
          <span style={{ color: theme.palette.secondary.main }}>
            <strong>{name.split(' ')[0]}</strong>
          </span>
          &nbsp;
          {name.split(' ').slice(1).join(' ')}
        </Typography>
      </Box>
      <Box
        component="img"
        sx={{
          height: '50vh',
          width: 'auto',
          borderRadius: '15px',
          mb: '10%',
        }}
        alt={name}
        src={image}
      />
    </Paper>
  );
}
function BuiltByDevelopersMobile() {
  const items = [
    {
      name: 'Track build times and build size',
      image: PlotsDev,
    },
    {
      name: 'Monitor tracked dependencies',
      image: TrackedDeps,
    },
    {
      name: 'Visualize out-of-date dependencies',
      image: RedRepo,
    },
  ];
  return (
    <Box className="builtByDevelopersContainer">
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
          className="builtByDevelopersTitle"
          sx={{ bgcolor: 'secondary.main' }}
        >
          <Box>
            <Typography variant="h3" color="primary.main" sx={{ mb: '5%' }}>
              <strong>
                <span style={{ color: 'white' }}>
                  <strong> By </strong>
                </span>
                Developers
                <br />
                <span style={{ color: 'white' }}> For </span>
                Developers
              </strong>
            </Typography>
          </Box>
          <Carousel
            interval={10000}
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
              <Item
                key={item.name + i.toString()}
                name={item.name}
                image={item.image}
              />
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
          top: '187.5%',
        }}
      >
        <Link
          to="gitHubInstructionsMobileContainer"
          spy
          smooth
          offset={0}
          duration={500}
        >
          <IconButton className="scrollDown">
            <KeyboardArrowDownIcon
              fontSize="large"
              sx={{ color: 'primary.main' }}
            />
          </IconButton>
        </Link>
      </Box>
    </Box>
  );
}

export default BuiltByDevelopersMobile;
