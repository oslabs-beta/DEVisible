import React from 'react';
import { Button } from '@mui/material';
import theme from '../../theme';

function GetStarted() {
  return (
    <div className="getStarted">
      <div id="devisible"> put logo here later</div>
      <Button
        style={{
          backgroundColor: `${theme.palette.secondary.main}`,
          color: `${theme.palette.primary.main}`,
        }}
      />
      <div id="quickGlance">
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
