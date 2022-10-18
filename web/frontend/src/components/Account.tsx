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
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { User } from '../types';
import '../stylesheets/account.css';
import theme from '../theme';

interface AccountProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

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

  if (!user) return <div>Loading...</div>;
  return (
    <>
      <Box className="container">
        <Box className="accountInfo" sx={{ backgroundColor: 'primary.main' }}>
          <h2 style={{ color: `${theme.palette.primary.light}` }}>
            Hello {user.username}!
          </h2>
          <Divider sx={{ bgcolor: 'secondary.light', width: '100%' }} />
          {token ? (
            <div
              className="tokenInfo"
              style={{ color: `${theme.palette.primary.light}` }}
            >
              <strong>API Token: </strong>
              {token}
              <div style={{ display: 'flex', flexFlow: 'column wrap' }}>
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
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ marginTop: '4px' }}
                >
                  Reset Token
                </Button>
              </div>
            </div>
          ) : (
            <div className="reveal">
              <Fab variant="extended" color="secondary" onClick={getToken}>
                Reveal API Token
              </Fab>
            </div>
          )}
          <div className="bottomContainer">
            <Button
              className="delete"
              variant="contained"
              color="secondary"
              sx={{ fontSize: '0.7em', padding: 1, margin: 2 }}
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
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default Account;
