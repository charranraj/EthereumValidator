// Spinner.js
import React from 'react';

const Spinner = () => {
  const spinnerStyle = {
    border: '16px solid #f3f3f3', /* Light grey */
    borderTop: '16px solid #282c34', /* Dark grey */
    borderRadius: '50%',
    width: '100px',
    height: '100px',
    animation: 'spin 5s linear infinite',
    margin: '0 auto',
  };

  const keyframesStyle = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div style={spinnerStyle}></div>
    </>
  );
};

export default Spinner;
