import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../stylesheets/register.css';
import theme from '../theme';
import BlueD from '../assets/BlueD.svg';
import { User } from '../types';

/**
 * @typeParam user - current user or null if not logged in
 * @typeParam setUser - method to change user state
 */
interface Props {
  user: User | null | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | null | undefined>>;
}

/**
 * function to render register component and handle signing up logic
 * @param props - takes in {@link Props}
 * @returns JSX.Element
 */
function Register({ user, setUser }: Props): JSX.Element {
  // state to hold information from all register fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // conditional rendering that will render a div containing an error message if an error is detected in state. Otherwise, nothing will render
  const errorNotification = !error ? null : (
    <Box
      bgcolor="primary.main"
      style={{ border: `3px solid ${theme.palette.primary.light}` }}
      className="error"
    >
      {error}
    </Box>
  );

  /**
   * function to test whether user-supplied password contains special characters
   * @param str - string that is the entered
   * @returns boolean - string contains or does not contain special characters
   */
  function containsSpecialChars(str: string) {
    const specialChars = /[!@#$%^&*()_+-={};':"|,.<>?~]/;
    return specialChars.test(str);
  }

  /**
   * function to handle signing up logic
   * @param e - {@link https://developer.mozilla.org/en-US/docs/Web/Events | event type}
   */
  function signMeUP(e: React.SyntheticEvent) {
    e.preventDefault();
    if (password !== confirmedPassword) {
      setError('Error: Passwords do not match. Please try again.');
    } else if (password.length < 8) {
      setError(
        'Error: Password length must be at least 8 characters. Please try again.'
      );
    } else if (containsSpecialChars(password) === false) {
      setError(
        `Error: Password must contain at least one of the following special characters: "!@#$%^&*()_+-={};':"|,.<>?~". Please try again.`
      );
    } else {
      axios
        .post('/userAPI/signup', {
          username,
          email,
          plainPassword: password,
        })
        .then((res) => {
          // eslint-disable-next-line promise/always-return
          if (res.status === 200) {
            setUser(res.data);
            navigate('/home');
          }
        })
        .catch((err) => {
          setError(`status: ${err.response.status} , ${err.response.data}`);
        });
    }
  }

  if (user) return <Navigate to="/home" />;

  return (
    <div className="registerContainer">
      <Box bgcolor="secondary.main" className="formBox">
        <div className="logoContainer">
          <img className="logo" src={BlueD} alt="DEVisible Icon Blue" />
        </div>
        {errorNotification}
        <div className="registerFormContainer">
          <form
            className="registerForm"
            onSubmit={(e) => {
              signMeUP(e);
            }}
          >
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <TextField
              label="Confirm Password"
              type="password"
              value={confirmedPassword}
              onChange={(e) => setConfirmedPassword(e.target.value)}
              required
            />
            <div className="buttonContainer">
              <Button id="registerBtn" type="submit" variant="contained">
                Register
              </Button>
            </div>
          </form>
        </div>
        <div className="loginRedirect">
          <p>Already have an account?</p>
          <Link to="/login">Log In</Link>
        </div>
      </Box>
    </div>
  );
}

export default Register;
