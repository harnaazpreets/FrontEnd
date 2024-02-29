// HomePage.js
import React, { useState, useEffect } from 'react';
import TemplateCard from './TemplateCard';

import { processData } from './processData';


const HomePage = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    // Fetch the JSON data from the public folder
    fetch(`${process.env.PUBLIC_URL}/templates.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Process the JSON data to get unique templates
        const uniqueTemplates = processData(data);
        setTemplates(uniqueTemplates);
      })
      .catch((error) => {
        console.error('Failed to fetch templates:', error);
      });
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <img src={`${process.env.PUBLIC_URL}/Sigbots.png`} alt="Branchline Logo" style={{ width: '150px' }} />
      <h1>PROS CLI TEMPLATE STORE</h1>
      <p>Your one-stop solution for managing your projects seamlessly.</p>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
      {templates.map((template) => (
  <TemplateCard
    key={template.name + template.version}
    logo={`${process.env.PUBLIC_URL}/path-to-logo/${template.name}.png`} // Replace with your actual logo path
    name={template.name}
    version={template.version}
    target={template.target}
    onClick={() => window.location.href = `/templates/${template.name}`} // Update your routing logic if needed
  />
))}

      </div>
    </div>
  );
};

export default HomePage;
