import React from 'react';
import { styled } from '@mui/system';
import CardMedia from '@mui/material/Card';
import { Typography } from '@mui/material';
import theme from '../theme';
import '../stylesheets/abouttheteam.css';
import Michael from '../assets/Michael.png';
import Justin from '../assets/Justin.png';
import Eden from '../assets/Eden.png';
import Tanner from '../assets/Tanner.png';
import JustinQR from '../assets/JustinQR.svg';
import MichaelQR from '../assets/michaelQR.svg';
import EdenQR from '../assets/EdenQR.svg';
import TannerQR from '../assets/TannerQR.svg';

function AboutTheTeam() {
  const CardStyle = styled(CardMedia)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '5% 0',
    height: 'max-content',
    backgroundColor: theme.palette.secondary.main,
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0.19)',
  });
  const NameStyled = styled('p')({
    fontSize: '1.5em',
    color: theme.palette.primary.dark,
  });

  const TitleStyled = styled('p')({
    fontSize: '1em',
    color: theme.palette.primary.main,
    marginBottom: '1%',
  });

  const QuoteStyled = styled('p')({
    fontSize: '0.75em',
    color: theme.palette.primary.main,
  });

  return (
    <div
      className="container"
      style={{
        backgroundColor: `${theme.palette.primary.light}`,
      }}
    >
      <div
        className="teamContainer"
        style={{
          backgroundColor: theme.palette.primary.dark,
        }}
      >
        <div
          id="headerContainer"
          style={{ borderBottom: `1px solid ${theme.palette.secondary.light}` }}
        >
          <Typography id="header" color="secondary.main">
            Meet The Team
          </Typography>
        </div>
        <div className="teamMember">
          <CardStyle>
            <img src={Michael} alt="Michael FanArt" />
            <NameStyled>Michael Sarkisian</NameStyled>
            <TitleStyled>Code Wizard</TitleStyled>
            <QuoteStyled>日本語が読みますか 上手ですね！</QuoteStyled>
          </CardStyle>
          <div className="qrContainer">
            <img src={MichaelQR} alt="Michael's LinkedIn" />
          </div>
        </div>
        <div className="teamMember">
          <CardStyle>
            <img src={Justin} alt="Justin FanArt" />
            <NameStyled>Justin Mendonca</NameStyled>
            <TitleStyled>Michael Sarkisian Impersonator</TitleStyled>
            <QuoteStyled>Touched grass this week</QuoteStyled>
          </CardStyle>
          <div className="qrContainer">
            <img src={JustinQR} alt="Michael's LinkedIn" />
          </div>
        </div>
        <div className="teamMember">
          <CardStyle>
            <img src={Eden} alt="Eden FanArt" />
            <NameStyled>Eden Shirin</NameStyled>
            <TitleStyled>Executive Hebrew Speaker</TitleStyled>
            <QuoteStyled>Speaks Hebrew</QuoteStyled>
          </CardStyle>
          <div className="qrContainer">
            <img src={EdenQR} alt="Michael's LinkedIn" />
          </div>
        </div>
        <div className="teamMember">
          <CardStyle>
            <img src={Tanner} alt="Tanner FanArt" />
            <NameStyled>Tanner Hesterman</NameStyled>
            <TitleStyled>Average Human</TitleStyled>
            <QuoteStyled>Scrum Lord</QuoteStyled>
          </CardStyle>
          <div className="qrContainer">
            <img src={TannerQR} alt="Michael's LinkedIn" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutTheTeam;
