/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { AppBar, Box, Toolbar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TransparentOrange from '../assets/Transparent_Orange.svg';
import { User } from '../types';
import DropMenu from './DropMenu';

interface NavProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

function Navbar({ user, setUser }: NavProps): JSX.Element {
  const navigate = useNavigate();
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
    <DropMenu handleLogout={handleLogout} />
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
