import React from 'react';
import { Button, Divider, Box } from '@mui/material';
import { Link } from 'react-scroll';
import {
  StyledTitle,
  StyledSubTitle,
  StyledHeader,
  StyledParagraph,
} from '../styledComponents/StyledComponents';
import theme from '../../theme';
import RepoTile from '../../assets/RepoTile.png';
import '../../stylesheets/getstarted.css';

function GetStarted() {
  return (
    <Box className="getStarted">
      <Box
        className="getStartedContainer"
        style={{
          backgroundColor: `${theme.palette.secondary.main}`,
        }}
      >
        <Box className="textContainer">
          <StyledTitle variant="h2" color="primary.main">
            DEV<span style={{ color: 'white' }}>isible</span>
          </StyledTitle>
          <StyledSubTitle color="white">
            Make tracking your micro-frontend architecture a micro-hassle
          </StyledSubTitle>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img className="repoItemImage" src={RepoTile} alt="RepoTile" />
        </Box>
        <Box className="getStartedButtonContainer">
          <Button
            className="getStartedButton"
            variant="contained"
            sx={{
              color: 'white',
              [theme.breakpoints.between('sm', 'md')]: {
                width: '25%',
                fontSize: '3em',
                padding: '2% 0%',
              },
            }}
          >
            <Link to="installation" spy smooth offset={0} duration={500}>
              Get Started
            </Link>
          </Button>
        </Box>
      </Box>
      <div
        id="quickGlance"
        style={{ backgroundColor: `${theme.palette.primary.dark}` }}
      >
        <section>
          <StyledHeader
            className="sectionTitle"
            variant="h2"
            style={{ color: `${theme.palette.secondary.main}` }}
          >
            Built by Developers, for Developers
          </StyledHeader>
          <Divider
            sx={{
              bgcolor: 'secondary.main',
              marginBottom: '2%',
              width: '60%',
              borderBottomWidth: { desktop4k: 3 },
            }}
          />
          <StyledParagraph className="sectionText">
            As micro-frontend architectures rise to prominence so do the
            problems with tracking such complex systems. <br /> Introducing
            DEVisible, a monitoring tool that works alongside your testing,
            build, and deployment process to produce powerful visualizations on
            crucial metadata for your DevOps teams to make profitable
            time-saving decisions.
          </StyledParagraph>
        </section>
      </div>
    </Box>
  );
}

export default GetStarted;
