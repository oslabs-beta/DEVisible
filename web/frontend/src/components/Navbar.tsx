/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { AppBar, Box, Toolbar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TransparentOrange from '../assets/Transparent_Orange.svg';
import { User } from '../types';
import DropMenu from './DropMenu';

/**
 * @typeParam user - current user or null if not logged in
 * @typeParam setUser - method to change user state
 */
interface NavProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

/**
 * function to render the navigation bar
 * @param props - takes in {@link NavProps}
 * @returns JSX.Element
 */
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
      className="loginButton"
      sx={{ justifySelf: 'end' }}
    >
      Login
    </Button>
  ) : (
    <Box style={{ justifySelf: 'end' }}>
      <DropMenu handleLogout={handleLogout} />
    </Box>
  );

  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          minHeight: '7vh',
          maxHeight: '7vh',
        }}
      >
        <Toolbar
          sx={{
            minHeight: '7vh',
            maxHeight: '7vh',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
          }}
        >
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
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              className="navbar-icon"
              style={{
                justifyContent: 'center',
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
