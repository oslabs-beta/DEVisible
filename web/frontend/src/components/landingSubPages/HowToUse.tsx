import React from 'react';
import { Link } from 'react-router-dom';
import theme from '../../theme';

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
          <div className="title">How To Use Our Product</div>
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
