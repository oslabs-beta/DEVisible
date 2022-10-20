/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import '../../stylesheets/installation.css';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import * as Scroll from 'react-scroll';
import Grid from '@mui/system/Unstable_Grid';
import styled from '@mui/system/styled';
import theme from '../../theme';
import cicd from '../../assets/cicd.png';

function Installation() {
  const Scroller = Scroll.Link;

  const GridItem = styled('div')(() => ({
    border: '1px solid',
    borderColor: 'black',
    borderRadius: '4px',
    height: '100%',
    width: '100%',
    padding: '5%',
    boxShadow: '5px 5px 5px black',
  }));
  return (
    <div
      className="installation"
      style={{
        backgroundColor: `${theme.palette.primary.dark}`,
      }}
    >
      <div className="installContainer">
        <div className="title">Installation</div>
        <Grid
          style={{
            color: `${theme.palette.secondary.main}`,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
          container
          spacing={{ xs: 2, md: 4 }}
          columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
        >
          <Grid xs={2} sm={3}>
            <GridItem className="instruction">
              <span>Step 1: </span>
              <Link
                to="/signup"
                style={{ color: `${theme.palette.secondary.main}` }}
              >
                Make An Account
              </Link>
              <span> to Receive an API Key</span>
            </GridItem>
          </Grid>

          <Grid xs={2} sm={3}>
            <GridItem className="instruction">
              <span>Step 2: Navigate to your </span>
              <Link
                to="/account"
                style={{ color: `${theme.palette.secondary.main}` }}
              >
                Account Page
              </Link>
              <span> to view your API Key</span>
            </GridItem>
          </Grid>

          <Grid xs={2} sm={3}>
            <GridItem className="instruction">
              <span>Step 3: run </span>
              <Box
                className="codeBlock"
                bgcolor={theme.palette.primary.light}
                color="black"
                display="inline"
              >
                npm install devisible
              </Box>
              <span> inside the root directory of your project/s</span>
            </GridItem>
          </Grid>

          <Grid xs={2} sm={4}>
            <GridItem className="instruction">
              Step 4: Run from CLI:
              <Box
                className="codeBlock2"
                bgcolor={theme.palette.primary.light}
                color="black"
              >
                <code>
                  node devisible.js --apiKey api_key_goes_here --buildPath
                  dist/--command "npm run build"
                </code>
              </Box>
            </GridItem>
          </Grid>

          <Grid xs={2} sm={5}>
            <GridItem className="instruction">
              Step 5: Run from GitHub Actions:
              <Box
                className="codeBlock"
                color="black"
                style={{ width: '100%' }}
              >
                <img src={cicd} alt="CICD installation instructions" />
              </Box>
            </GridItem>
          </Grid>
          <Scroller to="howToUse" spy smooth offset={0} duration={500} />
        </Grid>
        <Button
          variant="contained"
          sx={{ backgroundColor: theme.palette.primary.main, marginTop: '2%' }}
        >
          Next Steps
        </Button>
      </div>
    </div>
  );
}

export default Installation;
