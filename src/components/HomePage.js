import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import TemplateCard from './TemplateCard'; // Importing the TemplateCard component
import './HomePage.css'; // Importing the CSS for styling

const HomePage = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3002/api/templates')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setTemplates(data);
      })
      .catch(error => {
        console.error('Failed to fetch templates:', error);
      });
  }, []);

  return (
    <div className="homepage">
      <div className="banner">
        <img src={`${process.env.PUBLIC_URL}/Sigbots.png`} alt="Branchline Logo" className="homepage-logo" />
        <h1 className="homepage-title">PROS BRANCHLINE REGISTRY</h1>
        <p className="homepage-subtitle">Your one-stop solution for managing your projects seamlessly.</p>
      </div>
      <div className="template-container">
        {templates.map(template => (
          <TemplateCard
            key={template.name}
            logo={`${process.env.PUBLIC_URL}/Sigbots.png`} // replace with actual path to logo
            name={template.name}
            target={template.target}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
