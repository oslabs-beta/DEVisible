import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import '../stylesheets/login.css';
import theme from '../theme';
import OrangeD from '../assets/OrangeD.svg';
import { User } from '../types';

interface Props {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

function Login({ user, setUser }: Props) {
  // state to hold information from login fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // conditional rendering that will render a div containing an error message if an error is detected in state. Otherwise, nothing will render
  const errorNotification = !error ? null : (
    <Box
      bgcolor="primary.main"
      style={{ border: `3px solid ${theme.palette.secondary.main}` }}
      className="error"
    >
      {error}
    </Box>
  );

  // don't show the login page to users who are already logged in
  if (user) return <Navigate to="/home" />;

  return (
    <>
      {errorNotification}
      <div className="container">
        <Box bgcolor="primary.main" className="loginFormBox">
          <div className="logoContainer">
            <img className="logo" src={OrangeD} alt="DEVisible Icon Orange" />
          </div>
          <form
            className="loginForm"
            onSubmit={(e: React.SyntheticEvent) => {
              e.preventDefault();
              axios
                .post('userAPI/login', {
                  username,
                  password,
                })
                .then((res) => console.log(res))
                .catch((err) => {
                  setError(err);
                });
            }}
          >
            <TextField
              sx={{
                input: { color: 'white' },
                '& .MuiInputLabel-root': { color: 'orange' }, //  styles the label
                '& .MuiOutlinedInput-root': {
                  '& > fieldset': { borderColor: 'orange' },
                },
                '& .MuiOutlinedInput-root:hover': {
                  '& > fieldset': { borderColor: 'orange' },
                },
                '& .MuiOutlinedInput-root:onfocus': {
                  '& > fieldset': { color: 'white' },
                },
              }}
              color="secondary"
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              sx={{
                input: { color: 'white' },
                '& .MuiInputLabel-root': { color: 'orange' }, //  styles the label
                '& .MuiOutlinedInput-root': {
                  '& > fieldset': { borderColor: 'orange' },
                },
                '& .MuiOutlinedInput-root:hover': {
                  '& > fieldset': { borderColor: 'orange' },
                },
                '& .MuiOutlinedInput-root:onfocus': {
                  '& > fieldset': { color: 'orange' },
                },
              }}
              color="secondary"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="buttonContainer">
              <Button
                id="loginBtn"
                type="submit"
                variant="contained"
                style={{
                  backgroundColor: `${theme.palette.secondary.main}`,
                  color: `${theme.palette.primary.main}`,
                }}
              >
                Log In
              </Button>
            </div>
          </form>
          <div className="linkContainer">
            <div className="signupRedirect">
              <p>Don&apos;t have an account yet?</p>
              <Link to="/" style={{ color: `${theme.palette.secondary.main}` }}>
                Sign Up
              </Link>
            </div>
            <div className="recoveryRedirect">
              <p>Forgot your password?</p>
              <Link
                to="/recovery"
                style={{ color: `${theme.palette.secondary.main}` }}
              >
                Help Me DEVs!
              </Link>
            </div>
          </div>
        </Box>
      </div>
    </>
  );
}

export default Login;
