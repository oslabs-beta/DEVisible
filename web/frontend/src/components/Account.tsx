import { Box, Button, Divider, Fab } from '@mui/material';
import React, { useState } from 'react';
import { User } from '../types';

interface AccountProps {
  user: User | null;
}

function Account({ user }: AccountProps): JSX.Element {
  const [token, setToken] = useState<string | null>(null);

  const getToken = () => {
    fetch('/userAPI/getToken')
      .then((res) => res.json())
      .then((data) => setToken(data))
      .catch((err) => console.error(err));
  };

  if (!user) return <div>Loading...</div>;
  return (
    <Box
      style={{
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
            <Button>Copy to Clipboard</Button>
            <Button>Reset Token</Button>
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
