// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Make sure to import the CSS file

const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <img src={`${process.env.PUBLIC_URL}/Sigbots.png`} alt="Branchline Logo" className="header-logo" />
      </Link>
      <h1 className="header-title">PROS BRANCHLINE REGISTRY</h1>
    </header>
  );
};

export default Header;
