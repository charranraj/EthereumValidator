// src/components/Container.js
import React from 'react';

const Container = ({ children }) => (
  <div style={{
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 8px 12px rgba(0, 0, 0, 0.1)',
    padding: '1rem',  
    margin: '10px auto',
    maxWidth: '1200px',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    position: 'center',
    marginLeft:'75px',
    marginTop:'10px',
    left: '0',
    right: '0'
  }}>
    {children}
  </div>
  
);

export default Container;

