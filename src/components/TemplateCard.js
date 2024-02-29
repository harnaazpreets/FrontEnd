// TemplateCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const TemplateCard = ({ logo, name, target }) => {
  return (
    <Link to={`/templates/${name}`} className="template-card">
      <img src={logo} alt={`${name} Logo`} className="template-logo" />
      <div className="template-info">
        <h3 className="template-name">{name}</h3>
        <p className="template-target">Target: {target}</p>
      </div>
    </Link>
  );
};

export default TemplateCard;
