import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css'; // Switch to CSS Module

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={`${process.env.PUBLIC_URL}/Sigbots.png`} alt="Branchline Logo" className={styles.headerLogo} />
      </Link>
      <h1 className={styles.headerTitle}>PROS BRANCHLINE REGISTRY</h1>
    </header>
  );
};

export default Header;
