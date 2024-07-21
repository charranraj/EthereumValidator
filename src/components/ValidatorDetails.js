import React from 'react';

const ValidatorDetails = ({ validatorData }) => {
  return (
    <div>
      <h3>Validator Details</h3>
      <p><strong>Index:</strong> {validatorData.index}</p>
      <p><strong>Balance:</strong> {validatorData.balance}</p>
      <p><strong>Status:</strong> {validatorData.status}</p>
    </div>
  );
};

export default ValidatorDetails;
