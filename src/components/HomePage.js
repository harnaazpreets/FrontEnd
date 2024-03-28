import React, { useState, useEffect } from 'react';
import TemplateCard from './TemplateCard'; // Ensure this component is also updated for styling consistency
import styles from './HomePage.module.css'; // Switch to CSS Module

const HomePage = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3002/api/templates')
      .then(response => response.ok ? response.json() : Promise.reject('Failed to fetch'))
      .then(data => setTemplates(data))
      .catch(error => console.error('Failed to fetch templates:', error));
  }, []);

  return (
    <div className={styles.homepage}>
      <div className={styles.banner}>
        <img src={`${process.env.PUBLIC_URL}/Sigbots.png`} alt="Branchline Logo" className={styles.homepageLogo} />
        <h1 className={styles.homepageTitle}>PROS BRANCHLINE REGISTRY</h1>
        <p className={styles.homepageSubtitle}>Your one-stop solution for managing your projects seamlessly.</p>
      </div>
      <div className={styles.templateContainer}>
        {templates.map(template => (
          <TemplateCard
            key={template.name}
            logo={`${process.env.PUBLIC_URL}/Sigbots.png`}// Assuming dynamic logos for each template
            name={template.name}
            target={template.target}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
