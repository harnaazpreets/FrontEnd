import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage'; // Make sure the path here is correct
import './App.css'; // The path should be relative to the file where this import statement is used.
import TemplatePage from './components/TemplatePage'; // Adjust the path if necessary




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/templates/:templateName" element={<TemplatePage />} />
      </Routes>
    </Router>
  );
}

export default App;