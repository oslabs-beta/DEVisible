import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Always from '../assets/Always-Has-Been.png';
import { User } from '../types';
import '../stylesheets/notfound.css';

/**
 * @typeParam user - current user or null if not logged in
 */
interface NotFoundProps {
  user: User | null;
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
      <p id="text1">Wait it&apos;s all a 404?</p>
      <p id="text2">Always has been</p>
      <Link className="takeMeBack" to={route}>
        <Button
          sx={{
            padding: '30%',
            borderRadius: '50%',
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
