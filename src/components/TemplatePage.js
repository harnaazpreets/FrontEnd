// TemplatePage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import TemplateDetail from './TemplateDetail';

// Assuming processData is a function that you've written to reformat the JSON data
// to a more convenient structure, as previously described.
// HomePage.js
// HomePage.js
import { processData } from './processData';



const TemplatePage = () => {
  let { templateName } = useParams();
  const [template, setTemplate] = useState(null);
  const [versions, setVersions] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.PUBLIC_URL}/templates.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Process the JSON data to get an organized structure.
        const processedData = processData(data);
        // Find the specific template
        const foundTemplate = processedData.find((t) => t.name === templateName);
        setTemplate(foundTemplate);
        // Assuming processedData creates a 'versions' object within each template
        setVersions(foundTemplate ? foundTemplate.versions : {});
      })
      .catch((error) => {
        console.error('Failed to fetch templates:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [templateName]);

  if (loading) {
    return <div>Loading...</div>; // Or any other loading indicator you'd like to use.
  }

  if (!template) {
    return (
      <div>
        <Header />
        <p>Template not found.</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <TemplateDetail template={template} versions={versions} />
    </div>
  );
};

export default TemplatePage;
