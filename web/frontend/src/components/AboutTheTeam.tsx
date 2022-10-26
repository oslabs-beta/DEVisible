// import React from 'react';
// import { styled } from '@mui/system';
// import CardMedia from '@mui/material/Card';
// import { Typography } from '@mui/material';

import * as React from 'react';
import { Box } from '@mui/material';
import '../stylesheets/abouttheteam.css';
import Michael from '../assets/Michael.jpeg';
import Justin from '../assets/Justin.jpeg';
import Eden from '../assets/Eden.jpeg';
import Tanner from '../assets/Tanner.jpeg';
// import JustinQR from '../assets/JustinQR.svg';
// import MichaelQR from '../assets/michaelQR.svg';
// import EdenQR from '../assets/EdenQR.svg';
// import TannerQR from '../assets/TannerQR.svg';
import TeamMemberCard from './TeamMemberCard';

const teamMembers = [
  {
    image: Eden,
    name: 'Eden Shirin',
    gitHub: 'https://github.com/EdSheranaway',
    linkedIn: 'https://www.linkedin.com/in/eden-shirin/',
  },
  {
    image: Tanner,
    name: 'Tanner Hesterman',
    gitHub: 'https://github.com/billums123',
    linkedIn: 'https://www.linkedin.com/in/tannerhesterman/',
  },
  {
    image: Justin,
    name: 'Justin Mendonca',
    gitHub: 'https://github.com/JPMoregain',
    linkedIn: 'https://www.linkedin.com/in/justin-mendonca-4bb9674b/',
  },
  {
    image: Michael,
    name: 'Michael Sarkisian',
    gitHub: 'https://github.com/msarkisian',
    linkedIn: 'https://www.linkedin.com/in/michaelsarkisian/',
  },
];

function AboutTheTeam() {
  const teamMemberCards = teamMembers.map((person) => (
    <TeamMemberCard
      image={person.image}
      name={person.name}
      gitHub={person.gitHub}
      linkedIn={person.linkedIn}
    />
  ));
  return <Box className="aboutUsContainer">{teamMemberCards}</Box>;
}
export default AboutTheTeam;
