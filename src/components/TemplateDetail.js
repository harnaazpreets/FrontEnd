import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import marked from 'marked';
import DOMPurify from 'dompurify';
import styles from './TemplateDetail.module.css';

const TemplateDetail = ({ templateName }) => {
  const [versions, setVersions] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log(`Fetching data for template: ${templateName}`); // Debugging line
    setIsLoading(true);
    fetch(`http://localhost:3003/api/templates/${templateName}/versions`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Received data:', data); // Debugging line
        if (data.versions && data.versions.length > 0) {
          setVersions(data.versions);
          setSelectedVersion(data.versions[0].version);
        }
        if (data.description) {
          console.log('Markdown description:', data.description); // Debugging line
          const htmlContent = marked(data.description);
          console.log('Converted HTML:', htmlContent); // Debugging line
          const sanitizedContent = DOMPurify.sanitize(htmlContent);
          console.log('Sanitized HTML:', sanitizedContent); // Debugging line
          setDescription(sanitizedContent);
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching template versions:', error);
        setError(error.toString());
        setIsLoading(false);
      });
  }, [templateName]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.templateDetail}>
      <h2>{templateName}</h2>
      <select value={selectedVersion} onChange={(e) => setSelectedVersion(e.target.value)} className={styles.versionSelect}>
        {versions.map((v) => (
          <option key={v.version} value={v.version}>{v.version}</option>
        ))}
      </select>
      {selectedVersion && (
        <div>
          <a href={versions.find(v => v.version === selectedVersion).metadata.location} download className={styles.downloadButton}>
            Download
          </a>
        </div>
      )}
      <div dangerouslySetInnerHTML={{ __html: description }} className={styles.description} />
    </div>
  );
};

export default TemplateDetail;
