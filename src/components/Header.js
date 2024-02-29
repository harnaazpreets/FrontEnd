// Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="App-header">
      <Link to="/">
        <img src={`${process.env.PUBLIC_URL}/Sigbots.png`} alt="Branchline Logo" className="App-logo" />
      </Link>
      <h1>PROS CLI TEMPLATE STORE</h1>
    </header>
  );
};

export default Header;
