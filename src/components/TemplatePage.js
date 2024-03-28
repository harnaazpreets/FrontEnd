import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import styles from './TemplatePage.module.css';
import Showdown from 'showdown'; 

const TemplatePage = () => {
  let { templateName } = useParams();
  const [versions, setVersions] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Initialize Showdown Converter
    const converter = new Showdown.Converter();

    fetch(`http://localhost:3003/api/templates/${templateName}/versions`)
      .then(response => response.json())
      .then(data => {
        setVersions(data.versions);
        if (data.versions && data.versions.length > 0) {
          setSelectedVersion(data.versions[0].version);
        }
        if (data.description) {
          // Use Showdown to convert Markdown to HTML
          const htmlContent = converter.makeHtml(data.description);
          setDescription(htmlContent);
        }
      })
      .catch(error => {
        console.error('Error fetching template versions:', error);
      });
  }, [templateName]);

  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.templateDetail}>
        <section className={styles.templateHeader}>
          <h2>{templateName}</h2>
        </section>
        <section className={styles.versionSelector}>
          <select onChange={(e) => setSelectedVersion(e.target.value)} value={selectedVersion}>
            {versions.map((v) => (
              <option key={v.version} value={v.version}>{v.version}</option>
            ))}
          </select>
        </section>
        {selectedVersion && (
          <section className={styles.downloadSection}>
            <a href={versions.find(v => v.version === selectedVersion).metadata.location} download className={styles.downloadButton}>Download</a>
          </section>
        )}
        <section className={styles.descriptionSection} dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </div>
  );
};

export default TemplatePage;
