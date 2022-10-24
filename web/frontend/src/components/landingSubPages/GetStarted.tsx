import React from 'react';
import { Button, Divider } from '@mui/material';
import { Link } from 'react-scroll';
import theme from '../../theme';
import Demo from '../../assets/Demo.png';
import RepoTile from '../../assets/RepoTile.png';
import '../../stylesheets/getstarted.css';

function GetStarted() {
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
            <p id="first" style={{ color: theme.palette.primary.main }}>
              DEV
            </p>
            <p id="second">isible</p>
          </div>
          <div id="text">
            <p>Make tracking your microservice architecture a micro-hassle</p>
          </div>
        </div>
        <div className="imgContainer">
          <img src={RepoTile} className="demo" alt="DEVisible Chart Example" />
        </div>
        <Button
          variant="contained"
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            maxWidth: '30%',
            height: '30%',
            fontSize: '1.2vw',
            justifySelf: 'center',
            alignSelf: 'center',
          }}
        >
          <Link to="installation" spy smooth offset={0} duration={500}>
            Get Started
          </Link>
        </Button>
      </div>
      <div
        id="quickGlance"
        style={{ backgroundColor: `${theme.palette.primary.dark}` }}
      >
        <section>
          <p
            className="sectionTitle"
            style={{ color: `${theme.palette.secondary.main}` }}
          >
            Built by Developers, for Developers
          </p>
          <Divider
            sx={{
              bgcolor: 'secondary.main',
              marginBottom: '2%',
              marginTop: '-1.8%',
              width: '60%',
            }}
          />
          <p
            className="sectionText"
            style={{ color: `${theme.palette.primary.light}` }}
          >
            As micro-frontend architectures rise to prominence so do the
            problems with tracking such complex systems. <br /> Introducing
            DEVisible, a monitoring tool that works alongside your testing,
            build, and deployment process to produce powerful visualizations
            <br /> on crucial metadata for your DevOps teams to make profitable
            time-saving decisions.
          </p>
        </section>
      </div>
    </div>
  );
}

export default GetStarted;
