import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header'; // Corrected import with uppercase 'N'
import Sidebar from './components/Sidebar';
import ValidatorTracker from './components/ValidatorTracker';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="main-content">
          <Sidebar />
          <Routes>
            <Route path="/" element={<ValidatorTracker />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
