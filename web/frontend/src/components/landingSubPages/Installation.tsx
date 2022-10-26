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
import cicd from '../../assets/cicd.png';

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
                fontSize: '10em',
                marginBottom: '0%',
              },
            }}
          >
            Installation
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
              gap: '11px',
            },
          }}
        >
          <Grid xs={12} sm={3}>
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
                node devisible.js --apiKey api_key_goes_here --buildPath
                dist/--command "npm run build"
              </Box>
            </GridItem>
          </Grid>

          <Grid xs={12} sm={5}>
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
              marginTop: '8%',
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
