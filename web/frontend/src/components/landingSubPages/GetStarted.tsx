import React from 'react';
import { Button } from '@mui/material';
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
        <span
          className="title1"
          style={{ color: `${theme.palette.secondary.main}` }}
        >
          DEV
        </span>
        <span className="title2" style={{ color: 'white' }}>
          isible
        </span>
        <div id="devisible">Input some cool phrase to draw audience in</div>
        <Button
          style={{
            backgroundColor: `${theme.palette.secondary.dark}`,
            color: `${theme.palette.primary.light}`,
            top: '35%',
            marginLeft: '44.7%',
            width: '10%',
            height: '10%',
            fontSize: '1.3em',
          }}
        >
          Get Started
        </Button>
      </div>
      <div
        id="quickGlance"
        style={{ backgroundColor: `${theme.palette.secondary.dark}` }}
      >
        <ul id="explanation">
          <li className="explanationTopics">Thing 1</li>
          <li className="explanationTopics">Thing 2</li>
          <li className="explanationTopics">Thing 3</li>
          <li className="explanationTopics">Thing 4</li>
        </ul>
      </div>
    </div>
  );
}

export default GetStarted;
