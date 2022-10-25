import React from 'react';
import { Button, Divider, Typography } from '@mui/material';
import { Link } from 'react-scroll';
import { styled } from '@mui/system';
import theme from '../../theme';
import RepoTile from '../../assets/RepoTile.png';
import '../../stylesheets/getstarted.css';

function GetStarted() {
  const StyledTitle = styled(Typography)({
    [theme.breakpoints.down('sm')]: {
      fontSize: '3.5em',
      marginTop: '3%',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      marginTop: '10%',
    },
    [theme.breakpoints.between('md', 'xl')]: {
      marginTop: '5%',
    },
  });

  const StyledSubTitle = styled(Typography)({
    [theme.breakpoints.between('md', 'lg')]: {
      marginTop: '2%',
      fontSize: '1.5em',
      fontWeight: 500,
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      fontSize: '1.2em',
      marginTop: '1%',
    },
  });

  const StyledHeader = styled(Typography)({
    [theme.breakpoints.down('sm')]: {
      fontSize: '5em',
      marginTop: '3%',
      marginBottom: '1%',
      fontWeight: '500',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: '4em',
      marginTop: '5%',
      marginBottom: '0.5%',
    },
    [theme.breakpoints.between('md', 'xl')]: {
      fontSize: '3.5em',
      marginTop: '2%',
      marginBottom: '0.75%',
    },
  });

  const StyledParagraph = styled(Typography)({
    color: theme.palette.primary.light,
    [theme.breakpoints.down('sm')]: {
      fontSize: '4em',
      marginTop: '5%',
      marginLeft: '2%',
      marginRight: '2%',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: '3em',
      marginTop: '3%',
      marginLeft: '2%',
      marginRight: '2%',
    },
    [theme.breakpoints.between('md', 'lg')]: {
      fontSize: '2.5em',
      marginTop: '3%',
      marginLeft: '15%',
      marginRight: '15%',
    },
    [theme.breakpoints.between('md', 'xl')]: {
      fontSize: '2em',
      marginLeft: '25%',
      marginRight: '25%',
    },
  });

  const StyledButton = styled(Button)({
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    maxWidth: '30%',
    height: '30%',
    fontSize: '1vw',
    justifySelf: 'center',
    alignSelf: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.5vw',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: '1.5vw',
    },
    [theme.breakpoints.between('md', 'lg')]: {
      fontSize: '1.75vw',
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: '0.75vw',
    },
  });

  return (
    <div className="getStarted">
      <div
        className="getStartedContainer"
        style={{
          backgroundColor: `${theme.palette.secondary.main}`,
        }}
      >
        <div className="textContainer">
          <div id="title">
            <StyledTitle
              variant="h2"
              id="first"
              sx={{
                color: theme.palette.primary.main,
              }}
            >
              DEV
            </StyledTitle>
            <div>
              <StyledTitle variant="h2" id="second">
                isible
              </StyledTitle>
            </div>
          </div>
          <div id="text">
            <StyledSubTitle>
              Make tracking your microservice architecture a micro-hassle
            </StyledSubTitle>
          </div>
        </div>
        <div className="imgContainer">
          <img src={RepoTile} className="demo" alt="DEVisible Chart Example" />
        </div>
        <StyledButton variant="contained">
          <Link to="installation" spy smooth offset={0} duration={500}>
            Get Started
          </Link>
        </StyledButton>
      </div>
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
    </div>
  );
}

export default GetStarted;
