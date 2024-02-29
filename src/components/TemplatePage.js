// TemplatePage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';

const TemplatePage = () => {
  let { templateName } = useParams();
  const [versions, setVersions] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    console.log('get template version data');
    fetch(`http://localhost:3003/api/templates/${templateName}/versions`)
      .then(response => response.json())
      .then(data => {
        setDescription(data.description)
        setVersions(data.versions);
        if (data.length > 0) {
          setSelectedVersion(versions[0]);
        }
      })
      .catch(error => console.error('Error fetching template versions:', error));
  }, [templateName]);

  return (
    <div>
      <Header />
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
      <p>{description}</p>
    </div>
  );
};

export default TemplatePage;
