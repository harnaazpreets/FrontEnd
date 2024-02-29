// TemplatePage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';

const TemplatePage = () => {
  let { templateName } = useParams();
  const [versions, setVersions] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3003/api/templates/${templateName}/versions`)
      .then(response => response.json())
      .then(data => {
        setVersions(data);
        if (data.length > 0) {
          setSelectedVersion(data[0].version);
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
    </div>
  );
};

export default TemplatePage;
