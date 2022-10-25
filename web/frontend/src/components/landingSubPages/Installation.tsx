/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import '../../stylesheets/installation.css';
import { Button, Divider, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import * as Scroll from 'react-scroll';
import Grid from '@mui/system/Unstable_Grid';
import styled from '@mui/system/styled';
import theme from '../../theme';
import dashboard from '../../assets/dashboard.png';

function Installation() {
  const Scroller = Scroll.Link;

  const GridItem = styled('div')(() => ({
    border: '1px solid',
    borderColor: 'black',
    borderRadius: '4px',
    height: '100%',
    width: '100%',
    padding: '5%',
    fontWeight: '600',
    boxShadow: '5px 5px 5px black',
    backgroundColor: `${theme.palette.primary.main}`,
  }));
  return (
    <div
      className="installation"
      style={{
        backgroundColor: `${theme.palette.secondary.main}`,
      }}
    >
      <div className="installContainer">
        <div className="titleContainer">
          <div
            className="title"
            style={{ color: `${theme.palette.primary.main}` }}
          >
            Install Locally
          </div>
          <Divider
            sx={{
              bgcolor: 'primary.dark',
              width: '70%',
              height: '1px',
              justifySelf: 'center',
            }}
          />
        </div>
        <Grid
          style={{
            color: 'white',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignSelf: 'start',
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
                style={{
                  color: `${theme.palette.secondary.dark}`,
                  fontWeight: '600',
                }}
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
                style={{
                  color: `${theme.palette.secondary.dark}`,
                  fontWeight: '600',
                }}
              >
                Account Page
              </Link>
              <span> to view your API Key</span>
            </GridItem>
          </Grid>

          <Grid xs={2} sm={3}>
            <GridItem className="instruction">
              <span>Step 3: Install the DEVisible NPM package </span>
              <hr />
              <Box
                className="codeBlock"
                bgcolor={theme.palette.primary.light}
                color="black"
                display="inline"
              >
                <code>npm install -g devisible</code>
              </Box>
            </GridItem>
          </Grid>

          <Grid xs={2} sm={4}>
            <GridItem className="instruction">
              Step 4: Set your build script to use DEVisible to run your build
              process (e.g., in package.json)
              <p className="subtext">
                Specifying your API key, build path, and build command are
                required. To see other options, run{' '}
                <code>npx devisible -h</code>
              </p>
              <hr />
              <Box
                className="codeBlock2"
                bgcolor={theme.palette.primary.light}
                color="black"
              >
                <code>
                  npx devisible --apiKey <i>your-api-key</i> --buildPath
                  <i> dist/</i> --command <i>"npm run build"</i>
                </code>
              </Box>
            </GridItem>
          </Grid>

          <Grid xs={2} sm={5}>
            <GridItem className="instruction">
              Step 5: Navigate to the{' '}
              <Link
                to="/home"
                style={{
                  color: `${theme.palette.secondary.dark}`,
                  fontWeight: '600',
                }}
              >
                Dashboard
              </Link>{' '}
              to view your build statistics and manage your tracked
              dependencies!
              <Box
                className="imageContainer"
                color="black"
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <img src={dashboard} alt="DEVisible dashboard screenshot" />
              </Box>
            </GridItem>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          id="nextSteps"
          sx={{ backgroundColor: theme.palette.primary.main, marginTop: '2%' }}
        >
          <Scroller to="howToUse" spy smooth offset={0} duration={500}>
            Run in GitHub Actions
          </Scroller>
        </Button>
      </div>
    </div>
  );
}

export default Installation;
