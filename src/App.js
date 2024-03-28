import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import TemplatePage from './components/TemplatePage';
import './App.module.css'; // Changed to CSS Module

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/templates/:templateName" element={<TemplatePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
