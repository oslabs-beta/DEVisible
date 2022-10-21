import React from 'react';
import { Link } from 'react-router-dom';
import { Divider } from '@mui/material';
import theme from '../../theme';
import '../../stylesheets/howtouse.css';

function HowToUse() {
  return (
    <div className="howToUse">
      <div
        className="installation"
        style={{
          backgroundColor: `${theme.palette.primary.dark}`,
        }}
      >
        <div className="installContainer">
          <div
            className="title"
            style={{ color: `${theme.palette.secondary.main}` }}
          >
            How To Use Our Product
          </div>
          <Divider
            sx={{
              bgcolor: 'secondary.main',
              marginTop: '-2.5%',
              width: '60%',
            }}
          />
          <div className="instructions">
            <ul
              style={{
                color: `${theme.palette.secondary.main}`,
              }}
            >
              <li className="instruction">
                <Link
                  to="/login"
                  style={{ color: `${theme.palette.secondary.main}` }}
                >
                  Sign in
                </Link>
              </li>
              <li className="instruction">step2</li>
              <li className="instruction">step3</li>
              <li className="instruction">step4</li>
              <li className="instruction">step5</li>
              <li className="instruction">step6</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowToUse;
