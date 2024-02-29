import React, { useState, useEffect } from 'react';

const TemplateDetail = ({ templateName }) => {
  const [versions, setVersions] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:3003/api/templates/${templateName}/versions`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.versions && data.versions.length > 0) {
          setVersions(data.versions);
          setSelectedVersion(data.versions[0].version);
        }
        if (data.description && window.showdown) {
          const converter = new window.showdown.Converter();
          const htmlContent = converter.makeHtml(data.description);
          setDescription(htmlContent);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching template versions:', error);
        setError(error.toString());
        setIsLoading(false);
      });
  }, [templateName]);

  const handleVersionChange = (event) => {
    setSelectedVersion(event.target.value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const selectedVersionData = versions.find(v => v.version === selectedVersion);

  return (
    <div className="template-detail">
      <h2>{templateName}</h2>
      {versions.length > 0 && (
        <select value={selectedVersion} onChange={handleVersionChange}>
          {versions.map((versionInfo) => (
            <option key={versionInfo.version} value={versionInfo.version}>
              {versionInfo.version}
            </option>
          ))}
        </select>
      )}
      {selectedVersionData && (
        <>
          <p>Version: {selectedVersionData.version}</p>
          <a href={selectedVersionData.downloadLink} download>
            Download
          </a>
        </>
      )}
      <div dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  );
};

export default TemplateDetail;
