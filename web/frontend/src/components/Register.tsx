import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { Link } from 'react-router-dom'
import axios from 'axios';
import '../stylesheets/register.css';
import theme from '../theme';
import BlueD from '../assets/BlueD.svg';

const Register = () => {
  // state to hold information from all register fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [error, setError] = useState('');

  // conditional rendering that will render a div containing an error message if an error is detected in state. Otherwise, nothing will render
  let errorNotification = !error ? null: (<Box bgcolor='primary.main' style={{ border: `3px solid ${theme.palette.secondary.main}`}} className='error'>{error}</Box>);
  
  return (
    <>
        {errorNotification}
        <div className='container'>
        <Box bgcolor='secondary.main' className='formBox'>
            <div className='logoContainer'>
                <img className="logo" src={BlueD} alt="DEVisible Icon Blue"/>  
            </div>
            <form className='registerForm' onSubmit={(e: React.SyntheticEvent) => {
                e.preventDefault();
                if (password !== confirmedPassword) {
                    setError('Error: Passwords do not match. Please try again.')
                }
                else {
                    axios.post('/register', {
                        username: username,
                        email: email,
                        password: password
                    })
                    .then(res => console.log(res))
                    .catch(err => {
                        setError(err);
                    })
                }
            }}>
                <TextField label='Username' value={username} onChange={e => setUsername(e.target.value)} required/>
                <TextField label='Email' type='email' value={email} onChange={e => setEmail(e.target.value)} required />
                <TextField label='Password' type='password' value={password} onChange={e => setPassword(e.target.value)} required />
                <TextField label='Confirm Password' type='password' value={confirmedPassword} onChange={e => setConfirmedPassword(e.target.value)} required />
                <div className='buttonContainer'>
                    <Button id='registerBtn' type='submit' variant='contained'>Register</Button>
                </div>
            </form>
            <div className='loginRedirect'>
                <p>Already have an account?</p>
                <Link to='/login'>Log In</Link>
            </div>
        </Box>   
        </div>
        </>
  )
}

export default Register;
