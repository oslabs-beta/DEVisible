import React from 'react';
import '../../stylesheets/installation.css';
// import { styled } from '@mui/system';
// import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import theme from '../../theme';

function Installation() {
  // const StyledGridItem = styled(Grid)({
  //   gap: '1fr',
  // });
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
              <Link
                to="/signup"
                style={{ color: `${theme.palette.secondary.main}` }}
              >
                Make an Account
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
  );
}

export default Installation;
