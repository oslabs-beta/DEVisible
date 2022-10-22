/* eslint-disable jsx-a11y/no-static-element-interactions */
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
    <Button
      onClick={() => navigate('/login')}
      color="inherit"
      sx={{ justifySelf: 'end' }}
      className="loginButton"
    >
      Login
    </Button>
  ) : (
    <Box sx={{ justifySelf: 'end' }}>
      <DropMenu handleLogout={handleLogout} />
    </Box>
  );

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
          <Box>
            {user && (
              <strong
                style={{ cursor: 'pointer' }}
                onClick={() => navigate('/account')}
              >
                {user.username}
              </strong>
            )}
          </Box>
          <Box
            sx={{
              display: 'grid',
              justifySelf: 'center',
              alignItems: 'center',
              height: '100%',
              width: '100%',
              marginBottom: '10px',
            }}
          >
            <img
              className="navbar-icon"
              style={{
                justifySelf: 'center',
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
