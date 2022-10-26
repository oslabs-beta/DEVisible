import {
  Box,
  Button,
  Divider,
  Fab,
  Dialog,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { User } from '../types';
import '../stylesheets/account.css';
import theme from '../theme';

/**
 * @typeParam user - either {@link User} or null if not logged in
 * @typeParam setUser - setUser method changes user state
 */
interface AccountProps {
  user: User | null | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | null | undefined>>;
}

/**
 * Renders the Account page allowing users to view their api token or delete their account
 * @param props - takes in {@link AccountProps}
 * @returns JSX.Element
 */
function Account({ user, setUser }: AccountProps): JSX.Element {
  const [token, setToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  const getToken = () => {
    fetch('/userAPI/getToken')
      .then((res) => res.json())
      .then((data) => setToken(data))
      .catch((err) => console.error(err));
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const deleteAccount = async () => {
    if (user) {
      const uid = user.id;
      const res = await axios.delete(`/webAPI/account/${uid}`);
      if (res.status === 204) {
        setUser(null);
        navigate('/');
      } else {
        console.log('error');
      }
    }
  };

  const StyledBox = styled(Box)({
    [theme.breakpoints.down('sm')]: {
      width: '80%',
    },
    [theme.breakpoints.between('sm', 'xl')]: {
      width: '70%',
      fontSize: '1.5em',
    },
    [theme.breakpoints.up('xl')]: {
      width: '50%',
      fontSize: '1.5em',
    },
  });

  if (user === undefined) return <div>Loading...</div>;
  if (user === null)
    return (
      <div>
        Please <Link to="/login">Log in</Link> or
        <Link to="/signup">Sign up</Link> to access the account details page
      </div>
    );
  return (
    <Box className="accountContainer">
      <StyledBox
        className="accountInfo"
        sx={{
          backgroundColor: 'primary.main',
          maxWidth: '600px',
          maxHeight: '400px',
        }}
      >
        <h2 style={{ color: `${theme.palette.primary.light}` }}>
          Hello {user.username}!
        </h2>
        <Divider sx={{ bgcolor: 'secondary.light', width: '100%' }} />
        {token ? (
          <div
            className="tokenInfo"
            style={{
              marginTop: '2vh',
              color: `${theme.palette.primary.light}`,
            }}
          >
            <strong>API Token: </strong>
            {token}
            <div id="tokenButtonContainer">
              <Button
                variant="contained"
                color="secondary"
                disabled={copied}
                onClick={() => {
                  // eslint-disable-next-line promise/catch-or-return
                  navigator.clipboard
                    .writeText(token)
                    .then(() => setCopied(true));
                }}
              >
                {copied ? <>Copied!</> : <>Copy to Clipboard</>}
              </Button>
            </div>
          </div>
        ) : (
          <div className="reveal">
            <Fab
              variant="extended"
              color="secondary"
              sx={{
                fontSize: '1.2em',
                [theme.breakpoints.up('xl')]: { fontSize: '1.5em' },
              }}
              onClick={getToken}
            >
              Reveal API Token
            </Fab>
          </div>
        )}
        <div className="bottomContainer">
          <Button
            className="delete"
            variant="contained"
            color="secondary"
            sx={{
              fontSize: '0.5em',
              padding: '1% 3%',
              margin: 2,
              borderRadius: '50px',
            }}
            onClick={handleDialogOpen}
          >
            Delete my account
          </Button>
          <Dialog
            open={dialogOpen}
            onClose={handleDialogClose}
            aria-labelledby="Delete alert"
            aria-describedby="Prompt users to confirm whether they would like to delete their account"
            sx={{ marginBottom: '20%' }}
          >
            <DialogTitle id="Delete Account">
              Are you sure you would like to delete your account?
            </DialogTitle>
            <DialogActions>
              <Button onClick={deleteAccount} autoFocus>
                Yes
              </Button>
              <Button onClick={handleDialogClose}>No</Button>
            </DialogActions>
          </Dialog>
        </div>
      </StyledBox>
    </Box>
  );
}

export default Account;
