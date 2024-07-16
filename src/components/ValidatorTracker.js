import React, { useState } from 'react';
import axios from 'axios';
import './ValidatorTracker.css';

const ValidatorTracker = () => {
  const [validatorId, setValidatorId] = useState('');
  const [validatorData, setValidatorData] = useState(null);
  const [attestations, setAttestations] = useState(null);
  const [error, setError] = useState(null);

  const fetchValidatorData = async () => {
    try {
      const response = await axios.get(`https://beaconcha.in/api/v1/validator/${validatorId}`);
      setValidatorData(response.data.data);
      fetchAttestations(response.data.data.index);
      setError(null);
    } catch (err) {
      setError('Validator not found');
      setValidatorData(null);
      setAttestations(null);
    }
  };

  const fetchAttestations = async (index) => {
    try {
      const response = await axios.get(`https://beaconcha.in/api/v1/validator/${index}/attestations`);
      setAttestations(response.data.data);
    } catch (err) {
      setError('Error fetching attestations');
      setAttestations(null);
    }
  };

  return (
    <div className="validator-tracker">
      <h2>Validator Tracker</h2>
      <input
        type="text"
        value={validatorId}
        onChange={(e) => setValidatorId(e.target.value)}
        placeholder="Enter Validator ID"
      />
      <button onClick={fetchValidatorData}>Get Validator Stats</button>
      {error && <p className="error">{error}</p>}
      {validatorData && (
        <div className="validator-info">
          <h3>Validator Stats</h3>
          <p>Index: {validatorData.index}</p>
          <p>Status: {validatorData.status}</p>
          {/* Add more stats as needed */}
        </div>
      )}
      {attestations && (
        <div className="validator-attestations">
          <h3>Validator Attestations</h3>
          <ul>
            {attestations.map((attestation, index) => (
              <li key={index}>
                Slot: {attestation.slot}, Committee Index: {attestation.committee_index}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ValidatorTracker;
