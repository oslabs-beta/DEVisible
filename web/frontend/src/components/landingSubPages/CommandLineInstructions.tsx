/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import '../../stylesheets/installation.css';
import { Divider, Box } from '@mui/material';
import { Link } from 'react-router-dom';
// import * as Scroll from 'react-scroll';
import Grid from '@mui/system/Unstable_Grid';
import {
  StyledHeader,
  GridItem,
  StyledGrid,
} from '../styledComponents/StyledComponents';
import theme from '../../theme';
import RegisterGif from '../../assets/RegisterGif.gif';

function Installation() {
  return (
    <Box
      className="installation"
      style={{
        backgroundColor: `${theme.palette.secondary.main}`,
      }}
    >
      <div className="installContainer">
        <div className="titleContainer">
          <StyledHeader
            className="title"
            style={{
              color: `${theme.palette.primary.main}`,
            }}
            sx={{
              [theme.breakpoints.down('sm')]: {
                fontSize: '7.5em',
                marginBottom: '0%',
                marginTop: '-0.5%%',
                lineHeight: '1',
              },
            }}
          >
            Running From the Command Line
          </StyledHeader>
          <Divider
            sx={{
              bgcolor: 'primary.dark',
              width: '70%',
              height: '1px',
              justifySelf: 'center',
            }}
          />
        </div>
        <StyledGrid
          container
          spacing={{ xs: 2, sm: 4, md: 4 }}
          columns={{ xs: 4, sm: 6, md: 12, lg: 12 }}
          sx={{
            [theme.breakpoints.down('sm')]: {
              marginTop: '-16%',
              fontSize: '0.6em',
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

          <Grid xs={12} sm={3}>
            <GridItem className="instruction">
              <span>Step 3: run </span>
              <Box
                className="codeBlock"
                bgcolor={theme.palette.primary.light}
                color="black"
                display="inline"
                style={{
                  fontFamily:
                    'Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New',
                }}
              >
                npm install devisible
              </Box>
              <span> inside the root directory of your project(s)</span>
              <p id="or"> OR </p>
              <span> Install devisible globally: </span>
              <br />
              <Box
                className="codeBlock"
                bgcolor={theme.palette.primary.light}
                color="black"
                display="inline"
                style={{
                  fontFamily:
                    'Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New',
                }}
              >
                npm install -g devisible
              </Box>
              <p>
                <span>
                  For more detailed information please visit our{' '}
                  <a
                    href="https://www.npmjs.com/package/devisible"
                    style={{
                      color: theme.palette.secondary.main,
                      stroke: 'black',
                    }}
                  >
                    npm
                  </a>{' '}
                  package page
                </span>
              </p>
            </GridItem>
          </Grid>

          <Grid xs={12} sm={2}>
            <GridItem className="instruction">
              Step 4: Run from CLI:
              <Box
                className="codeBlock2"
                bgcolor={theme.palette.primary.light}
                color="black"
                style={{
                  fontFamily:
                    'Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New',
                  fontSize: '1em',
                }}
              >
                npx devisible --apiKey <i>your-api-key</i> --buildPath{' '}
                <i>/dist</i> --command <i>"npm run build"</i>
              </Box>
            </GridItem>
          </Grid>
        </StyledGrid>
      </div>
    </Box>
  );
}

export default Installation;
