// src/App.js
import React from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';


function App() {
  return (
    <div className="App">
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
       
        </div>
      </div>
  
  );
}

export default App;
