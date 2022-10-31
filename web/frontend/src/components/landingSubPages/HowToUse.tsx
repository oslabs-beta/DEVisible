import React from 'react';
import { Divider, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Grid from '@mui/system/Unstable_Grid';
import {
  StyledHeader,
  GridItem,
  StyledGrid,
} from '../styledComponents/StyledComponents';
import theme from '../../theme';
import dashboard from '../../assets/dashboard.png';
import '../../stylesheets/installation.css';
import RegisterGif from '../../assets/RegisterGif.gif';

function HowToUse() {
  return (
    <div
      className="howToUse"
      style={{
        backgroundColor: `${theme.palette.primary.main}`,
        minHeight: '100vh',
      }}
    >
      <div className="installContainer">
        <div className="titleContainer">
          <StyledHeader
            className="title"
            style={{ color: `${theme.palette.secondary.main}` }}
            sx={{
              [theme.breakpoints.down('sm')]: {
                fontSize: '10em',
                marginBottom: '0%',
              },
            }}
          >
            Running in GitHub Actions
          </StyledHeader>
          <Divider
            sx={{
              bgcolor: 'secondary.main',
              width: '70%',
              height: '1px',
              justifySelf: 'center',
            }}
          />
        </div>
        <StyledGrid
          container
          spacing={{ xs: 2, md: 4 }}
          columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
          sx={{
            [theme.breakpoints.down('sm')]: {
              marginTop: '-25%',
            },
          }}
        >
          <Grid xs={12} sm={3}>
            <GridItem className="instruction" style={{ display: 'grid' }}>
              <div id="step1Container">
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
              </div>
              <img
                src={RegisterGif}
                id="registerGif"
                alt="Gif Showing Users how to Create an Account"
              />
            </GridItem>
          </Grid>

          <Grid xs={12} sm={3}>
            <GridItem>
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

          <Grid xs={12} sm={3}>
            <GridItem>
              <span>
                Step 3: Create a YAML file in the .github/workflows directory of
                your repo
              </span>
            </GridItem>
          </Grid>

          <Grid xs={12} sm={6}>
            <GridItem
              sx={{
                display: 'grid',
                justifyContent: 'center',
              }}
            >
              Step 4: Set up your file to install DEVisible through NPM and
              build your application. The below example invokes DEVisible on
              pushes to the &quot;main&quot; branch (your build process will
              likely be different).
              <Box
                className="codeBlock2"
                bgcolor={theme.palette.primary.light}
                color="black"
              >
                <pre
                  id="gaCodeBlock"
                  style={{
                    fontFamily:
                      'Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New',
                  }}
                >{`on: 
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

          <Grid xs={12} sm={5}>
            <GridItem>
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
              with the name of your choice, and the value of your DEVisible API
              key. This can be done in the global scope of your remote hosting
              account, or as a repo-scoped secret in each of the repos that you
              wish to track.
            </GridItem>
          </Grid>
          <Grid xs={12} sm={5}>
            <GridItem>
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
        </StyledGrid>
      </div>
    </div>
  );
}

export default HowToUse;
