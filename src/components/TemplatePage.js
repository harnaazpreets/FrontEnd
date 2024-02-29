// TemplatePage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import './TemplatePage.css'; // Make sure to import the CSS file

const TemplatePage = () => {
  let { templateName } = useParams();
  const [versions, setVersions] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    console.log('Fetching template version data');
    fetch(`http://localhost:3003/api/templates/${templateName}/versions`)
      .then(response => response.json())
      .then(data => {
        setDescription(data.description);
        setVersions(data.versions);
        if (data.versions && data.versions.length > 0) {
          setSelectedVersion(data.versions[0].version);
        }
      })
      .catch(error => console.error('Error fetching template versions:', error));
  }, [templateName]);

  return (
    <div>
      <Header />
      <div className="template-detail">
        <h2>{templateName}</h2>
        <select onChange={(e) => setSelectedVersion(e.target.value)} value={selectedVersion}>
          {versions.map((v) => (
            <option key={v.version} value={v.version}>{v.version}</option>
          ))}
        </select>
        {selectedVersion && (
          <div>
            <a href={versions.find(v => v.version === selectedVersion).metadata.location} download>Download</a>
          </div>
        )}
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </div>
  );
};

export default TemplatePage;