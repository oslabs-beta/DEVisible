import React from 'react';
import '../../stylesheets/installation.css';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import theme from '../../theme';

function Installation() {
  return (
    <div
      className="installation"
      style={{
        backgroundColor: `${theme.palette.primary.dark}`,
      }}
    >
      <div className="installContainer">
        <div className="title">Installation</div>
        <div className="instructions">
          <ul
            style={{
              color: `${theme.palette.secondary.main}`,
            }}
          >
            <li className="instruction">
              <span>Step 1: </span>
              <Link
                to="/signup"
                style={{ color: `${theme.palette.secondary.main}` }}
              >
                Make An Account
              </Link>
              <span> to Receive an API Key</span>
            </li>
            <li className="instruction">
              <span>Step 2: Navigate to your </span>
              <Link
                to="/account"
                style={{ color: `${theme.palette.secondary.main}` }}
              >
                Account Page
              </Link>
              <span> to view your API Key</span>
            </li>
            <li className="instruction">
              <span>Step 3: run </span>
              <Box
                className="codeBlock"
                bgcolor={theme.palette.primary.light}
                color="black"
                display="inline"
              >
                npm install devisible
              </Box>
            </li>
            <li className="instruction">step4</li>
            <li className="instruction">step5</li>
            <li className="instruction">step6</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Installation;
