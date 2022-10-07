import React from 'react';
import theme from '../../theme';
import '../../stylesheets/installation.css';

function AboutTheTeam() {
  return (
    <div className="aboutTheTeam">
      <div
        className="installation"
        style={{
          backgroundColor: `${theme.palette.primary.dark}`,
        }}
      >
        <div className="installContainer">
          <div className="title">Meet The Team</div>
          <div className="instructions">
            <ul
              id="team"
              style={{
                color: `${theme.palette.secondary.dark}`,
              }}
            >
              <li className="instruction">Justin</li>
              <li className="instruction">Tanner</li>
              <li className="instruction">Michael</li>
              <li className="instruction">Eden</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutTheTeam;
