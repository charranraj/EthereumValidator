import React, { useState } from 'react';
import axios from 'axios';
import Spinner from './Spinner'; 

const ValidatorTracker = () => {
  const [validatorId, setValidatorId] = useState('');
  const [validatorData, setValidatorData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchValidatorData = async () => {
    setLoading(true);
    setError(null);
    setValidatorData(null);

    try {
      const validatorResponse = await axios.get(
        `https://beaconcha.in/api/v1/validator/${validatorId}`
      );
      console.log('Validator Response:', validatorResponse.data);

      setValidatorData(validatorResponse.data.data);
    } catch (err) {
      console.error('API Error:', err);
      setError('Failed to fetch validator data');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      fetchValidatorData();
    }
  };

  return (
    <div style={styles.container}>
      <h2><center>Track Ethereum Validator</center></h2>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={validatorId}
          onChange={(e) => setValidatorId(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter Validator ID"
          style={styles.input}
        />
        <button onClick={fetchValidatorData} style={styles.button}>
          Fetch Validator Data
        </button>
      </div>

      {loading && <Spinner />} 
      {error && <p style={styles.error}>{error}</p>}

      {validatorData && (
        <div style={styles.dataContainer}>
          <h3>Validator Stats</h3>
          <div style={styles.dataRow}>
            <strong>ID:</strong> <span>{validatorData.validatorindex}</span>
          </div>
          <div style={styles.dataRow}>
            <strong>Status:</strong> <span>{validatorData.status}</span>
          </div>
          <div style={styles.dataRow}>
            <strong>Balance:</strong> <span>{validatorData.balance / 1e9} ETH</span>
          </div>
          <div style={styles.dataRow}>
            <strong>Activation Epoch:</strong> <span>{validatorData.activationepoch}</span>
          </div>
          <div style={styles.dataRow}>
            <strong>Exit Epoch:</strong> <span>{validatorData.exitepoch}</span>
          </div>
          <div style={styles.dataRow}>
            <strong>Effective Balance:</strong> <span>{validatorData.effectivebalance / 1e9} ETH</span>
          </div>
          <div style={styles.dataRow}>
            <strong>Slashed:</strong> <span>{validatorData.slashed ? 'Yes' : 'No'}</span>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '5vh', // Ensure it takes full viewport height
    padding: '20px',
    maxWidth: '800px',
    boxSizing: 'border-box',
    marginLeft: '410px', // Adjust based on sidebar width
  },
  inputContainer: {
    display: 'flex',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    marginRight: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#282c34',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
  },
  dataContainer: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
    width: '100%',
    maxWidth: '800px', // Ensure it doesn't exceed the max width
  },
  dataRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #eee',
  },
  attestationsList: {
    listStyle: 'none',
    padding: '0',
  },
  attestationItem: {
    padding: '10px 0',
    borderBottom: '1px solid #eee',
  },
};

export default ValidatorTracker;
