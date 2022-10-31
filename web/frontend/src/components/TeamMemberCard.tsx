// import React from 'react';
// import { styled } from '@mui/system';
// import CardMedia from '@mui/material/Card';
// import { Typography } from '@mui/material';

import * as React from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
} from '@mui/icons-material';
import '../stylesheets/abouttheteam.css';

interface TeamMemberCardProps {
  image: string;
  name: string;
  gitHub: string;
  linkedIn: string;
}
function TeamMemberCard({
  image,
  name,
  gitHub,
  linkedIn,
}: TeamMemberCardProps) {
  const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener, noreferrer');
  };
  return (
    <Card sx={{ width: 345 }}>
      <CardHeader title={name} />
      <CardMedia component="img" image={image} alt={name} />
      <CardContent sx={{ mt: -4, mb: -4 }}>
        <CardActions>
          <IconButton aria-label="GitHub" onClick={() => openInNewTab(gitHub)}>
            <GitHubIcon sx={{ color: 'primary.main' }} fontSize="large" />
          </IconButton>
          <IconButton
            aria-label="LinkedIn"
            onClick={() => openInNewTab(linkedIn)}
          >
            <LinkedInIcon sx={{ color: 'primary.main' }} fontSize="large" />
          </IconButton>
        </CardActions>
      </CardContent>
    </Card>
  );
}

export default TeamMemberCard;
