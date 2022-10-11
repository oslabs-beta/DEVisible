import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-scroll';
import MovingText from 'react-moving-text';
import theme from '../../theme';
import '../../stylesheets/getstarted.css';

function GetStarted() {
  return (
    <div className="getStarted">
      <div
        className="getStartedContainer"
        style={{
          backgroundColor: `${theme.palette.primary.dark}`,
        }}
      >
        <div className="textContainer">
          <MovingText
            type="fadeInFromLeft"
            duration="1000ms"
            delay="0s"
            direction="normal"
            timing="ease"
            iteration="1"
            fillMode="none"
            className="title1"
          >
            <span
              className="title1"
              style={{ color: `${theme.palette.secondary.main}` }}
            >
              DEV
            </span>
          </MovingText>

          <MovingText
            type="fadeInFromRight"
            duration="1500ms"
            delay="0s"
            direction="normal"
            timing="ease-in"
            iteration="1"
            fillMode="none"
            className="title2"
          >
            <span className="title2" style={{ color: 'white' }}>
              isible
            </span>
          </MovingText>
        </div>
        <div id="devisible">
          Make tracking your microservice architecture a micro-hassle
        </div>
        <Button
          style={{
            backgroundColor: `${theme.palette.secondary.dark}`,
            color: 'white',
            top: '15%',
            marginLeft: '44.5%',
            width: '10%',
            height: '10%',
            fontSize: '1.3em',
          }}
        >
          <Link to="installation" spy smooth offset={0} duration={500}>
            Get Started
          </Link>
        </Button>
      </div>
      <div
        id="quickGlance"
        style={{ backgroundColor: `${theme.palette.secondary.dark}` }}
      >
        <section>
          <p className="sectionTitle">Built by Developers, for Developers</p>
          <p className="sectionText">
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
