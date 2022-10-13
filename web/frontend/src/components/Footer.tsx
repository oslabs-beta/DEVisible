import React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import '../stylesheets/footer.css';
import { styled } from '@mui/system';
import theme from '../theme';

function Footer() {
  const StyledListItem = styled('li')({
    color: theme.palette.secondary.main,
  });
  return (
    <div
      className="footer"
      style={{
        backgroundColor: `${theme.palette.primary.main}`,
      }}
    >
      <div className="contactUs">
        <ul>
          <StyledListItem>
            <a href="https://github.com/JPMoregain">Justin&apos;s GitHub</a>
          </StyledListItem>
          <StyledListItem>
            <a href="https://github.com/billums123">Tanner&apos;s GitHub</a>
          </StyledListItem>
          <StyledListItem>
            <a href="https://github.com/msarkisian">Michael&apos;s GitHub</a>
          </StyledListItem>
          <StyledListItem>
            <a href="https://github.com/EdSheranaway">Eden&apos;s GitHub</a>
          </StyledListItem>
        </ul>
      </div>
      <StyledListItem className="contactUs">
        <a href="https://github.com/oslabs-beta/DEVisble">
          Project&apos;s Github
        </a>
      </StyledListItem>
      <div className="contactUs">
        <ul>
          <StyledListItem>
            <a href="https://www.linkedin.com/in/justin-mendonca-4bb9674b/">
              Justin&apos;s LinkedIn
            </a>
          </StyledListItem>
          <StyledListItem>
            <a href="https://www.linkedin.com/in/tannerhesterman/">
              Tanner&apos;s LinkedIn
            </a>
          </StyledListItem>
          <StyledListItem>
            <a href="https://www.linkedin.com/in/michael-sarkisian-a9b7a5131/">
              Michael&apos;s LinkedIn
            </a>
          </StyledListItem>
          <StyledListItem>
            <a href="https://www.linkedin.com/in/eden-shirin-1355b4199/">
              Eden&apos;s LinkedIn
            </a>
          </StyledListItem>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
