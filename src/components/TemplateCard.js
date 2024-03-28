import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TemplateCard.module.css'; 

const TemplateCard = ({ logo, name, target }) => {
  return (
    <Link to={`/templates/${name}`} className={styles.templateCard}>
      <img src={logo} alt={`${name} Logo`} className={styles.templateLogo} />
      <div className={styles.templateInfo}>
        <h3 className={styles.templateName}>{name}</h3>
        <p className={styles.templateTarget}>Target: {target}</p>
      </div>
    </Link>
  );
};

export default TemplateCard;
