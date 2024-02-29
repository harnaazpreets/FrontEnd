// TemplateDetail.js
import React, { useState } from 'react';

const TemplateDetail = ({ template, versions }) => {
  // Initially, select the first version available
  const initialVersion = Object.keys(versions)[0];
  const [selectedVersion, setSelectedVersion] = useState(initialVersion);

  const handleVersionChange = (event) => {
    setSelectedVersion(event.target.value);
  };

  return (
    <div className="template-detail">
      {/* Assuming you have a way to get the logo from the template object */}
      <img src={template.logo} alt={`${template.name} Logo`} className="template-logo" />
      <h2>{template.name}</h2>
      {/* Rest of the template details */}
      <select value={selectedVersion} onChange={handleVersionChange}>
        {Object.keys(versions).map((version) => (
          <option key={version} value={version}>
            {version}
          </option>
        ))}
      </select>
      <a href={versions[selectedVersion].location} download>
        Download {selectedVersion}
      </a>
    </div>
  );
};

export default TemplateDetail;
