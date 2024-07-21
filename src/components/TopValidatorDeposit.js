import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const TopValidatorDeposit = () => {
  const [validators, setValidators] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchValidators = async () => {
      try {
        const response = await axios.get('https://beaconcha.in/api/v1/validator/leaderboard');
        console.log('API Response:', response.data);
        if (response.data && response.data.data) {
          setValidators(response.data.data);
        } else {
          throw new Error('Invalid API response structure');
        }
      } catch (error) {
        setError('Error fetching validators');
        console.error('Error fetching validators', error);
      }
    };

    fetchValidators();
  }, []);

  if (validators.length > 0) {
    console.log('Validators Data:', validators);
  } else {
    console.log('No validator data available.');
  }

  const chartData = {
    labels: validators.map(v => v.validatorindex.toString()), 
    datasets: [
      {
        label: 'Deposited (ETH)',
        data: validators.map(v => v.balance / 1e9),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(context.parsed.y) + ' ETH';
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount (ETH)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Validators',
        },
      },
    },
  };

  const styles = {
    container: {
      padding: '120px',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff',
      marginBottom: '20px',
      marginTop:'5px',
      marginLeft:'50px',
      
    },
    header: {
      textAlign: 'center',
      marginTop: '1px',
      marginBottom: '20px',
      fontSize: '55px',
      fontWeight: 'bold',
      color: '#333',
    },

    validatorItem: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px',
      borderBottom: '1px solid #ddd',
      backgroundColor: '#f9f9f9',
    },
    validatorIndex: {
      fontWeight: 'bold',
      color: '#555',
    },
    depositAmount: {
      color: '#007bff',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Top Validators by Deposit Amount</h1>
      {error ? (
        <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
      ) : (
        <>
          <div style={{ height: '400px' }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </>
      )}
    </div>
  );
};

export default TopValidatorDeposit;
