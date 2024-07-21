import React from 'react';
import logo from '../assets/images/logo.png'; 

const Header = () => {
  return (
    <header style={{ 
      padding: '10px', 
      background: '#282c34', 
      color: 'white', 
      display: 'flex', 
      alignItems: 'center',
      justifyContent: 'center', 
      position: 'relative',
      height: '70px'
    }}>
      <img src={logo} alt="Company Logo" style={{ 
        position: 'absolute', 
        left: '10px',
        height: '80px' 
      }} />
      <h1 style={{ 
        margin: 0,
        textAlign: 'center',
        flex: 1, 
        marginLeft: '190px',
      }}>
        Ethereum Validator Tracker
      </h1>
    </header>
  );
};

export default Header;
