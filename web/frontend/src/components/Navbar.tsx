/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { AppBar, Box, Toolbar, Button, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Menu as MenuIcon } from '@mui/icons-material';
import TransparentOrange from '../assets/Transparent_Orange.svg';
import { User } from '../types';

interface NavProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

function Navbar({ user, setUser }: NavProps): JSX.Element {
  //  destructure props that are being passed from App component
  //  local state to track the state of the menu icon when clicked
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  //  initialize variable to a boolean of the state of anchorEl, for semantic readability where referenced below
  const open = Boolean(anchorEl);
  //  initialize variable that will invoke the useNavigate hook when called
  const navigate = useNavigate();

  //  function that changes the anchor element when the menu icon is clicked
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  //  function that resets anchorEl to null when menu is closed
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    //  change state of Auth held in App component to be false
    fetch('/userAPI/login', {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.status === 204) {
          setUser(null);
          navigate('/');
          return;
        }
        throw new Error('Unexpected response from server');
      })
      .catch((err) => console.error(err));
  };

  //  conditionally render a login link if user is not authenticated, otherwise render the menu button that can be used to traverse the app
  const topRight = !user ? (
    <Button onClick={() => navigate('/login')} color="inherit">
      Login
    </Button>
  ) : (
    <>
      <Button
        id="basic-button"
        color="inherit"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ mr: -3 }}
      >
        <MenuIcon />
      </Button>
      <Menu
        id="basic-menu"
        color="primary.main"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          onClick={() => {
            navigate('/account');
            handleClose();
          }}
        >
          Account
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate('/home');
            handleClose();
          }}
        >
          Dashboard
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate('/deps');
            handleClose();
          }}
        >
          Dependencies List
        </MenuItem>
        <MenuItem onClick={handleLogout}>Log Out</MenuItem>
      </Menu>
    </>
  );

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Empty box for styling purposes, can be replaced with any element */}
          <Box>&nbsp;</Box>
          <Box sx={{ display: 'grid', marginBottom: '10px' }}>
            <img
              className="navbar-icon"
              style={{
                marginLeft: '25px',
                cursor: user ? 'pointer' : 'default',
              }}
              src={TransparentOrange}
              alt="DEVisible"
              onClick={() => {
                if (user) navigate('/home');
              }}
            />
          </Box>
          {topRight}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
