import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router-dom for navigation

const HomePage = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    // Fetch the JSON data from your backend
    fetch('http://localhost:3002/api/templates')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Assuming the data is the array of templates
        setTemplates(data);
      })
      .catch(error => {
        console.error('Failed to fetch templates:', error);
      });
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <img src={`${process.env.PUBLIC_URL}/Sigbots.png`} alt="Branchline Logo" style={{ width: '150px' }} />
      <h1>PROS CLI TEMPLATE STORE</h1>
      <p>Your one-stop solution for managing your projects seamlessly.</p>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
        {templates.map(template => (
          <div key={template.name} style={{ border: '1px solid #ccc', padding: '20px', width: '200px' }}>
            <h2>{template.name}</h2>
            <p>Target: {template.target}</p>
            <p>Tags: {template.tags}</p>
            <p>Repository: {template.repository}</p>
            <Link to={`/templates/${template.name}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
