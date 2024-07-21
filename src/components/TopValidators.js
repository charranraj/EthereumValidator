import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from './Container'; 
import Spinner from './Spinner'; 

const styles = {
  validatorsTable: {
    width: '100%',
    border:'1px Solid black',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  thTd: {
    border: '2px solid #ddd',
    padding: '12px',
    textAlign: 'left',
  },
  th: {
    border:'2px Solid black',
    borderCollapse:'collapse',
    backgroundColor: '#4CAF50',
    
    color: 'white',
    fontWeight: 'bold',
  },
  trEven: {
    backgroundColor: '#f2f2f2',
  },
  trHover: {
    backgroundColor: '#ddd',
  },
  trackButton: {
    display: 'inline-block',
    padding: '8px 16px',
    backgroundColor: '#007BFF',
    color: '#fff',
    borderRadius: '5px',
    textDecoration: 'none',
    textAlign: 'center',
    transition: 'background-color 0.3s ease',
  },
  trackButtonHover: {
    backgroundColor: '#0056b3',
  },
  error: {
    color: 'red',
    fontSize: '16px',
  },
  scrollableContainer: {
    maxHeight: '500px',
    overflowY: 'auto',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginTop: '20px',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  paginationButton: {
    margin: '0 5px',
    padding: '10px 20px',
    cursor: 'pointer',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  paginationDisabled: {
    cursor: 'not-allowed',
  }
};

const TopValidators = () => {
  const [validators, setValidators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const validatorsPerPage = 9;

  useEffect(() => {
    const fetchValidators = async () => {
      try {
        const response = await axios.get('https://beaconcha.in/api/v1/validator/leaderboard');
        setValidators(response.data.data.slice(0, 100)); 
      } catch (err) {
        console.error('Error fetching data:', err.response || err.message);
        setError('Error fetching validator data.');
      } finally {
        setLoading(false);
      }
    };

    fetchValidators();
  }, []);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const totalPages = Math.ceil(validators.length / validatorsPerPage);
  const currentValidators = validators.slice(
    (currentPage - 1) * validatorsPerPage,
    currentPage * validatorsPerPage
  );

  const renderActionCell = (ValidatorTracking) => (
    <div
      style={styles.trackButton}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.trackButtonHover.backgroundColor)}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = styles.trackButton.backgroundColor)}
    >
      <a href={`/track-validator/${ValidatorTracking}`} style={{ color: '#fff', textDecoration: 'none' }}>
        Track Validator
      </a>
    </div>
  );

  return (
    <Container>
      <h1>Top Validators</h1>
      {loading && <Spinner />} 
      {error && <div style={styles.error}>{error}</div>}
      {validators.length > 0 && (
        <>
          <div style={styles.scrollableContainer}>
            <table style={styles.validatorsTable}>
              <thead>
                <tr>
                  <th style={styles.th}>Rank </th>
                  <th style={styles.th}>Validator Index </th>
                  <th style={styles.th}>Balance (ETH) </th>
                  <th style={styles.th}>Performance (1d) </th>
                  <th style={styles.th}>Performance (7d) </th>
                  <th style={styles.th}>Performance (31d) </th>
                  <th style={styles.th}>Performance (365d) </th>
                  <th style={styles.th}>Track</th>
                </tr>
              </thead>
              <tbody>
                {currentValidators.map((validator, index) => (
                  <tr
                    key={validator.V}
                    style={index % 1 === 0 ? styles.trEven : {}}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.trHover.backgroundColor)}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = index % 2 === 0 ? styles.trEven.backgroundColor : '')}
                  >
                    <td style={styles.thTd}>{(currentPage - 1) * validatorsPerPage + index + 1}</td>
                    <td style={styles.thTd}>{validator.validatorindex}</td>
                    <td style={styles.thTd}>{(validator.balance / 1e9).toFixed(2)}</td>
                    <td style={styles.thTd}>{validator.performance1d}</td>
                    <td style={styles.thTd}>{validator.performance7d}</td>
                    <td style={styles.thTd}>{validator.performance31d}</td>
                    <td style={styles.thTd}>{validator.performance365d}</td>
                    <td style={styles.thTd}>{renderActionCell(validator.ValidatorTracking)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={styles.pagination}>
            <button
              style={{ ...styles.paginationButton, ...(currentPage === 1 && styles.paginationDisabled) }}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span style={{ margin: '0 30px' }}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              style={{ ...styles.paginationButton, ...(currentPage === totalPages && styles.paginationDisabled) }}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </Container>
  );
};

export default TopValidators;
