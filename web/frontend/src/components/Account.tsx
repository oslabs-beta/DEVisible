import { Box, Button, Divider, Fab } from '@mui/material';
import { bgcolor } from '@mui/system';
import React, { useState } from 'react';
import theme from '../theme';
import { User } from '../types';

interface AccountProps {
  user: User | null;
}

function Account({ user }: AccountProps): JSX.Element {
  const [token, setToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const getToken = () => {
    fetch('/userAPI/getToken')
      .then((res) => res.json())
      .then((data) => setToken(data))
      .catch((err) => console.error(err));
  };

  if (!user) return <div>Loading...</div>;
  return (
    <Box
      sx={{
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
      }}
    >
      <h2>Hello {user.username}!</h2>
      <Divider />
      {token ? (
        <div>
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
        <div>
          <Fab variant="extended" color="primary" onClick={getToken}>
            Reveal API Token
          </Fab>
        </div>
      )}
    </Box>
  );
}

export default Account;
