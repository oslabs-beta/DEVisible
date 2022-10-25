import React from 'react';
import { Button, Divider, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import * as Scroll from 'react-scroll';
import Grid from '@mui/system/Unstable_Grid';
import styled from '@mui/system/styled';
import theme from '../../theme';
import dashboard from '../../assets/dashboard.png';
import '../../stylesheets/howtouse.css';

function HowToUse() {
  const Scroller = Scroll.Link;

  const GridItem = styled('div')(() => ({
    border: '1px solid',
    borderColor: 'black',
    borderRadius: '4px',
    height: '100%',
    width: '100%',
    padding: '5%',
    boxShadow: '5px 5px 5px black',
    backgroundColor: `${theme.palette.primary.main}`,
  }));

  return (
    <div
      className="howToUse"
      style={{
        backgroundColor: `${theme.palette.primary.main}`,
      }}
    >
      <div className="installContainer">
        <div className="titleContainer">
          <div
            className="title"
            style={{ color: `${theme.palette.secondary.main}` }}
          >
            Running in GitHub Actions
          </div>
          <Divider
            sx={{
              bgcolor: 'secondary.main',
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
              <span>
                Step 3: Create a YAML file in the .github/workflows directory of
                your repo
              </span>
            </GridItem>
          </Grid>

          <Grid xs={2} sm={4}>
            <GridItem className="instruction">
              <span>
                Step 4: Set up your file to install DEVisible through NPM and
                build your application.{' '}
              </span>
              The below example invokes DEVisible on pushes to the "main" branch
              (your build process will likely be different).
              <Box
                className="codeBlock2"
                bgcolor={theme.palette.primary.light}
                color="black"
              >
                <pre>{`on: 
  push: 
    branches:
     - main
 steps:
      - name: Checkout Repo
        uses: actions/checkout@v3
      - name: Setup Node
        uses: actions/setup-node@v3
      - name: Install dependencies
        run: npm ci
      - name: Install DEVisible package
        run: npm i -g devisible
      - name: Check for files
        run: ls
      - name: Run DEVisible NPM package
        env:
          API_KEY: \${{ secrets.devisibleKey }}
        run: >
          npx devisible --apiKey "$API_KEY" --buildPath client/dist 
          --command "npm run build"`}</pre>
              </Box>
            </GridItem>
          </Grid>

          <Grid xs={2} sm={5}>
            <GridItem className="instruction">
              <span>
                Step 5: Configure a{' '}
                <a
                  style={{
                    color: `${theme.palette.secondary.dark}`,
                    fontWeight: '600',
                  }}
                  href="https://docs.github.com/en/actions/security-guides/encrypted-secrets"
                >
                  Repository Secret
                </a>{' '}
                with the name API_KEY, and the value of your DEVisible API key
                in the repos that you wish to track.
              </span>
              <hr />
              <span>
                Step 6: Navigate to the{' '}
                <Link
                  style={{
                    color: `${theme.palette.secondary.dark}`,
                    fontWeight: '600',
                  }}
                  to="/home"
                >
                  Dashboard
                </Link>{' '}
                to view your build statistics and manage your tracked
                dependencies!
              </span>
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
          <Scroller to="howToUse" spy smooth offset={0} duration={500} />
        </Grid>
      </div>
    </div>
  );
}

export default HowToUse;
