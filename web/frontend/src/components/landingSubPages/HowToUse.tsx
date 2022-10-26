import React from 'react';
import { Divider, Box } from '@mui/material';
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
import '../../stylesheets/howtouse.css';

function HowToUse() {
  const Scroller = Scroll.Link;
  return (
    <div
      className="howToUse"
      style={{
        backgroundColor: `${theme.palette.primary.main}`,
        height: '93vh',
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
            How To Use
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
        >
          <Grid xs={12} sm={3}>
            <GridItem>
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

          <Grid xs={12} sm={4}>
            <GridItem>
              Step 4: Run from CLI:
              <Box
                className="codeBlock2"
                bgcolor={theme.palette.primary.light}
                color="black"
              >
                <code>
                  node devisible.js --apiKey api_key_goes_here --buildPath
                  dist/--command &quot;npm run build&quot;
                </code>
              </Box>
            </GridItem>
          </Grid>

          <Grid xs={12} sm={5}>
            <GridItem>
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
        </StyledGrid>
      </div>
    </div>
  );
}

export default HowToUse;
