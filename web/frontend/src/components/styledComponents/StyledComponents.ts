import { Button, Typography, Box } from '@mui/material';
import Grid from '@mui/system/Unstable_Grid';
import { styled } from '@mui/system';
import theme from '../../theme';

const StyledTitle = styled(Typography)({
  marginTop: '1%',
  [theme.breakpoints.down('sm')]: {
    fontSize: 32,
  },
});

const StyledSubTitle = styled(Typography)({
  [theme.breakpoints.down('sm')]: {
    fontSize: 16,
  },
  [theme.breakpoints.between('sm', 'md')]: {
    fontSize: 28,
    marginTop: '1%',
  },
  [theme.breakpoints.between('md', 'lg')]: {
    fontSize: 24,
  },
  [theme.breakpoints.between('lg', 'xl')]: {
    fontSize: 30,
    marginTop: '2%',
  },
});

const StyledHeader = styled(Typography)({
  [theme.breakpoints.down('sm')]: {
    fontSize: '5em',
    marginTop: '3%',
    marginBottom: '1%',
    fontWeight: '500',
  },
  [theme.breakpoints.between('sm', 'md')]: {
    fontSize: '4em',
    marginTop: '5%',
    marginBottom: '0.5%',
  },
  [theme.breakpoints.between('md', 'desktop2k')]: {
    fontSize: '3.5em',
    marginTop: '2%',
    marginBottom: '0.75%',
  },
  [theme.breakpoints.up('desktop2k')]: {
    fontSize: '3.5em',
  },
  [theme.breakpoints.only('desktop2k')]: {
    marginTop: '2%',
  },
  [theme.breakpoints.only('desktop4k')]: {
    fontSize: '3em',
    marginTop: '2%',
  },
});

const StyledParagraph = styled(Typography)({
  color: theme.palette.primary.light,
  [theme.breakpoints.down('sm')]: {
    fontSize: '4em',
    marginTop: '5%',
    marginLeft: '2%',
    marginRight: '2%',
  },
  [theme.breakpoints.between('sm', 'md')]: {
    fontSize: '3em',
    marginTop: '3%',
    marginLeft: '2%',
    marginRight: '2%',
  },
  [theme.breakpoints.between('md', 'lg')]: {
    fontSize: '2.5em',
    marginTop: '3%',
    marginLeft: '15%',
    marginRight: '15%',
  },
  [theme.breakpoints.between('md', 'xl')]: {
    fontSize: '2em',
    marginLeft: '25%',
    marginRight: '25%',
  },
  [theme.breakpoints.up('xl')]: {
    fontSize: '1.5em',
    marginLeft: '14%',
    marginRight: '14%',
  },
});

const StyledButton = styled(Button)({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  maxWidth: '30%',
  height: '10%',
  fontSize: '1vw',
  justifySelf: 'center',
  alignSelf: 'center',
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.5vw',
  },
  [theme.breakpoints.between('sm', 'md')]: {
    fontSize: '1.5vw',
  },
  [theme.breakpoints.between('md', 'lg')]: {
    fontSize: '1.75vw',
  },
  [theme.breakpoints.between('lg', 'desktop4k')]: {
    fontSize: '1.5vw',
    padding: '2%',
  },
  [theme.breakpoints.only('desktop2k')]: {
    padding: '3% 2%',
    fontSize: '1.2vw',
  },
});

const StyledGrid = styled(Grid)({
  color: 'white',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignSelf: 'start',
  [theme.breakpoints.down('sm')]: {
    marginTop: '-15%',
  },
  [theme.breakpoints.down('md')]: {
    marginTop: '-5%',
  },
});

const GridItem = styled('div')({
  border: '1px solid',
  borderColor: 'black',
  borderRadius: '4px',
  height: '100%',
  width: 'fit-content',
  padding: '5%',
  fontWeight: '600',
  boxShadow: '5px 5px 5px black',
  marginLeft: '5%',
  marginRight: '5%',
  backgroundColor: `${theme.palette.primary.main}`,
  [theme.breakpoints.down('md')]: {
    fontSize: '3.5em',
  },
  [theme.breakpoints.between('md', 'xl')]: {
    fontSize: '2em',
  },
});

const StyledSideBar = styled(Box)({
  position: 'fixed',
  right: '0.5%',
  top: '20%',
  fontSize: '1em',
  height: '14%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  zIndex: '6',
  fontWeight: '600',
  borderRadius: '10px',
  cursor: 'pointer',
  textAlign: 'center',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0.19)',
  [theme.breakpoints.up('desktopfullhd')]: {
    width: '6%',
  },
  [theme.breakpoints.down('desktopfullhd')]: {
    width: '8%',
    fontSize: '1em',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '2.5em',
    width: '55%',
    height: '5%',
    flexDirection: 'row',
    position: 'fixed',
    top: '87vh',
    left: '20vw',
  },
});

export {
  StyledTitle,
  StyledSubTitle,
  StyledHeader,
  StyledParagraph,
  StyledButton,
  StyledGrid,
  GridItem,
  StyledSideBar,
};
