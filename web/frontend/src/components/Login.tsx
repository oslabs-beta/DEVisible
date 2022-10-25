import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import '../stylesheets/login.css';
import theme from '../theme';
import OrangeD from '../assets/OrangeD.svg';
import { User } from '../types';

/**
 * @typeParam user - current user or null if not logged in
 * @typeParam setUser - method to change user state
 */
interface Props {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

/**
 * function to render Login component and handle login logic
 * @param props - takes in {@link Props}
 * @returns JSX.Element
 */
function Login({ user, setUser }: Props) {
  // state to hold information from login fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // conditional rendering that will render a div containing an error message if an error is detected in state. Otherwise, nothing will render
  const errorNotification = !error ? null : (
    <Box
      bgcolor="primary.main"
      style={{ border: `3px solid ${theme.palette.secondary.main}` }}
      id="error"
    >
      {error}
    </Box>
  );

  // don't show the login page to users who are already logged in
  if (user) return <Navigate to="/home" />;

  /**
   * function to log user in
   * @param e - {@link https://developer.mozilla.org/en-US/docs/Web/Events | event type}
   */
  function logMeIn(e: React.SyntheticEvent) {
    e.preventDefault();
    axios
      .post('/userAPI/login', {
        email,
        plainPassword: password,
      })
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data);
          navigate('/home');
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          setError(
            'Error: Invalid email address and/or password. Please try again.'
          );
        } else {
          setError(`status: ${err.response.status} , ${err.response.data}`);
        }
      });
  }

  return (
    <div className="container">
      <Box bgcolor="primary.main" className="loginFormBox">
        <div id="loginLogoContainer">
          <img id="loginLogo" src={OrangeD} alt="DEVisible Icon Orange" />
        </div>
        <div className="formContainer">
          {errorNotification}
          <form
            className="loginForm"
            onSubmit={(e) => {
              logMeIn(e);
            }}
          >
            <TextField
              sx={{
                input: { color: 'white' },
                '& .MuiInputLabel-root': {
                  color: theme.palette.secondary.main,
                }, //  styles the label
                '& .MuiOutlinedInput-root': {
                  '& > fieldset': {
                    borderColor: theme.palette.secondary.main,
                  },
                },
                '& .MuiOutlinedInput-root:hover': {
                  '& > fieldset': {
                    borderColor: theme.palette.secondary.main,
                  },
                },
                '& .MuiOutlinedInput-root:onfocus': {
                  '& > fieldset': { color: 'white' },
                },
              }}
              color="secondary"
              label="Email address"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              sx={{
                input: { color: 'white' },
                '& .MuiInputLabel-root': {
                  color: theme.palette.secondary.main,
                }, //  styles the label
                '& .MuiOutlinedInput-root': {
                  '& > fieldset': {
                    borderColor: theme.palette.secondary.main,
                  },
                },
                '& .MuiOutlinedInput-root:hover': {
                  '& > fieldset': {
                    borderColor: theme.palette.secondary.main,
                  },
                },
                '& .MuiOutlinedInput-root:onfocus': {
                  '& > fieldset': { color: theme.palette.secondary.main },
                },
              }}
              color="secondary"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div id="buttonContainer">
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
        </div>
        <div className="linkContainer">
          <div className="signupRedirect">
            <p>Don&apos;t have an account yet?</p>
            <Link
              to="/signup"
              style={{ color: `${theme.palette.secondary.main}` }}
            >
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
  );
}

export default Login;
