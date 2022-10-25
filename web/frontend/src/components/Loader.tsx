import React from 'react';
import OrangeD from '../assets/OrangeD.svg';
import BlueD from '../assets/BlueD.svg';
import '../stylesheets/loader.css';

/**
 * @typeParam color - string that indicates whether the loader is blue or orange
 */
interface LoaderProps {
  color: 'blue' | 'orange';
}

/**
 * function to render loader when content hasn't loaded yet
 * @param props - takes in {@link LoaderProps}
 * @returns JSX.Element
 */
function Loader({ color }: LoaderProps): JSX.Element {
  const image = color === 'blue' ? BlueD : OrangeD;
  return (
    <div className="spinner">
      <img src={image} className="loaderImage" alt="logo" />
    </div>
  );
}

export default Loader;
