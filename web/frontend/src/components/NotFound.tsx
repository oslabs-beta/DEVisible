import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Always from '../assets/Always-Has-Been.png';
import { User } from '../types';
import theme from '../theme';
import '../stylesheets/notfound.css';

/**
 * @typeParam user - current user or null if not logged in
 */
interface NotFoundProps {
  user: User | null | undefined;
}

/**
 * function to render 404 errors on front end and redirect to either landing page or dashboard depending on user state
 * @param props - takes in {@link NotFoundProps}
 * @returns JSX.Element
 */
function NotFound({ user }: NotFoundProps) {
  const route = user ? '/home' : '/';
  return (
    <div className="container">
      <h1>404 Page not Found</h1>
      <Link className="takeMeBack" to={route}>
        <Button
          sx={{
            padding: '30%',
            borderRadius: '50%',
            [theme.breakpoints.down('sm')]: {
              fontSize: '8px',
              position: 'relative',
              right: '35px',
            },
            [theme.breakpoints.up('sm')]: {
              fontSize: '14px',
              position: 'relative',
              right: '95px',
              bottom: '65px',
              width: '200px',
              height: '200px',
            },
            [theme.breakpoints.up('xl')]: {
              right: '0px',
            },
            [theme.breakpoints.only('desktop4k')]: {
              fontSize: '48px',
              width: '500px',
              height: '500px',
              right: '125px',
              bottom: '205px',
            },
          }}
          className="takeMeBack"
          variant="contained"
        >
          Click here to go back home
        </Button>
      </Link>

      <img id="notFoundImg" src={Always} alt="404 Page Not Found" />
    </div>
  );
}

export default NotFound;
