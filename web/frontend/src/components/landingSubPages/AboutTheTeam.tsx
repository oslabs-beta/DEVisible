import React from 'react';
import { styled } from '@mui/system';
import CardMedia from '@mui/material/Card';
import theme from '../../theme';
import '../../stylesheets/abouttheteam.css';
import Michael from '../../assets/Michael.png';
import Justin from '../../assets/Justin.png';
import Eden from '../../assets/Eden.png';
import Tanner from '../../assets/Tanner.png';

function AboutTheTeam() {
  const CardStyle = styled(CardMedia)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '5% 0',
    marginRight: '5%',
    height: 'max-content',
    backgroundColor: theme.palette.secondary.main,
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
    <div className="aboutTheTeam">
      <div
        className="installation"
        style={{
          backgroundColor: `${theme.palette.primary.dark}`,
        }}
      >
        <div className="installContainer">
          <div className="title">Meet The Team</div>
          <div className="instructions">
            <ul
              id="team"
              style={{
                color: `${theme.palette.secondary.dark}`,
              }}
            >
              <li className="instruction">
                <CardStyle>
                  <img src={Michael} alt="Michael FanArt" />
                  <NameStyled>Michael Sarkisian</NameStyled>
                  <TitleStyled>Code Wizard</TitleStyled>
                  <QuoteStyled>日本語が読みますか 上手ですね！</QuoteStyled>
                </CardStyle>
              </li>
              <li className="instruction">
                <CardStyle>
                  <img src={Justin} alt="Justin FanArt" />
                  <NameStyled>Justin Mendonca</NameStyled>
                  <TitleStyled>Michael Sarkisian Impersonator</TitleStyled>
                  <QuoteStyled>Touched grass this week</QuoteStyled>
                </CardStyle>
              </li>
              <li className="instruction">
                <CardStyle>
                  <img src={Eden} alt="Eden FanArt" />
                  <NameStyled>Eden Shirin</NameStyled>
                  <TitleStyled>Executive Hebrew Speaker</TitleStyled>
                  <QuoteStyled>Speaks Hebrew</QuoteStyled>
                </CardStyle>
              </li>
              <li className="instruction">
                <CardStyle>
                  <img src={Tanner} alt="Tanner FanArt" />
                  <NameStyled>Tanner Hesterman</NameStyled>
                  <TitleStyled>Average Human</TitleStyled>
                  <QuoteStyled>Scrum Lord</QuoteStyled>
                </CardStyle>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutTheTeam;
