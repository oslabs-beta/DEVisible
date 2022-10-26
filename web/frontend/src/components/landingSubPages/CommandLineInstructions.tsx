/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import '../../stylesheets/installation.css';
import { Button, Divider, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import * as Scroll from 'react-scroll';
import Grid from '@mui/system/Unstable_Grid';
import {
  StyledHeader,
  GridItem,
  StyledGrid,
} from '../styledComponents/StyledComponents';
import theme from '../../theme';
import RegisterGif from '../../assets/RegisterGif.gif';

function Installation() {
  const Scroller = Scroll.Link;

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
            </GridItem>
          </Grid>

          <Grid xs={12} sm={4}>
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
                node <b>PATH_TO_DEVISIBLE</b> --apiKey <b>API_KEY</b>{' '}
                --buildPath <b>RELATIVE_PATH_TO_BUILD_FOLDER</b> --command{' '}
                <b>BUILD_COMMAND</b>
              </Box>
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
                node <b>./node_modules/devisible</b> --apiKey <b>acbd_1234</b>{' '}
                --buildPath <b>/dist</b> --command <b>"npm run build"</b>
              </Box>
              <p id="globalInstallDemo">For Global DEVisible Installation:</p>
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
                npx <b>devisible</b> --apiKey <b>acbd_1234</b> --buildPath{' '}
                <b>/dist</b> --command <b>"npm run build"</b>
              </Box>
            </GridItem>
          </Grid>
        </StyledGrid>
        <Button
          variant="contained"
          id="nextSteps"
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            marginTop: '2%',
            width: '10%',
            [theme.breakpoints.between('sm', 'lg')]: {
              width: '12%',
              marginTop: '5%',
              fontSize: '1.5em',
              padding: '1.5% 1%',
            },
            [theme.breakpoints.down('sm')]: {
              width: '150px',
              height: '40%',
              marginTop: '1.5%',
            },
          }}
        >
          <Scroller to="howToUse" spy smooth offset={0} duration={500}>
            Next Steps
          </Scroller>
        </Button>
      </div>
    </Box>
  );
}

export default Installation;
