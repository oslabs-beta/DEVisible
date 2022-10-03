import React, { useState } from "react";
import OrangeD from "../assets/OrangeD.svg";
import BlueD from "../assets/BlueD.svg";
import '../stylesheets/loader.css'
interface LoaderProps {
  color: "blue" | "orange";
}
const Loader = ({ color }: LoaderProps) => {
  const image = color === 'blue' ? BlueD : OrangeD;
  return (
      <div className="spinner">
        <img src={image} className="loaderImage" alt="logo" />
    </div>
  );
};

export default Loader;
