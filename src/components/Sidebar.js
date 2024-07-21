import React, { useState } from 'react';
import ValidatorTracker from './ValidatorTracking'; 
import TopValidators from './TopValidators'; 
import TopValidatorDeposit from './TopValidatorDeposit';

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState('home');

  const handleNavigation = (section) => {
    setActiveSection(section);
  };

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <ul style={styles.list}>
          {['home', 'track-validator', 'top-validators', 'top-validator-deposit', 'about'].map((section) => (
            <li key={section} style={{ ...styles.item, ...(activeSection === section ? styles.activeItem : {}) }}>
              <a 
                href={`#${section}`} 
                onClick={() => handleNavigation(section)} 
                style={{ ...styles.link, ...(activeSection === section ? styles.activeLink : {}) }}
              >
                {capitalizeFirstLetter(section.replace(/-/g, ' '))}
              </a>
            </li>
          ))}
        </ul>
      </aside>
      <main style={styles.content}>
        {activeSection === 'home' && <HomeContent />}
        {activeSection === 'track-validator' && <ValidatorTracker />}
        {activeSection === 'top-validators' && <TopValidators />}
        {activeSection === 'top-validator-deposit' && <TopValidatorDeposit />}
        {activeSection === 'about' && <AboutContent />}
      </main>
    </div>
  );
};

const HomeContent = () => (
  <div style={styles.box}>
    <h1>Welcome to the Ethereum Validator Tracker!</h1>
    <p>Are you passionate about Ethereum and keen on monitoring the performance and status of validators on the network? You've come to the right place! Our Ethereum Validator Tracker provides real-time updates and detailed insights to help you stay informed about the health and activity of validators.</p>
    <h3>Key Features:</h3>
    <ul>
      <li>Real-Time Updates: Stay up-to-date with the latest validator performance metrics, ensuring you have the most current data at your fingertips.</li>
      <li>User-Friendly Interface: Navigate through our intuitive and responsive design with ease, making it simple to find the information you need quickly.</li>
      <li>Comprehensive Data: Access in-depth information about validator status, rewards, and penalties, enabling you to make informed decisions based on robust data.</li>
      <li>Advanced Filtering: Customize your view to focus on the validators that matter most to you, whether you're tracking a single validator or managing multiple ones.</li>
      <li>Secure and Reliable: Our platform ensures the security and reliability of the data presented, giving you peace of mind as you monitor your validators.</li>
      <li>Detailed Analytics: Dive into detailed analytics and visualizations that provide a clear picture of validator performance and trends over time.</li>
      <li>Alerts and Notifications: Set up personalized alerts and notifications to stay informed about important events and changes in validator status.</li>
    </ul>
    <h1>Why Track Ethereum Validators?</h1>
    <p>Tracking Ethereum validators is crucial for anyone involved in staking, network maintenance, or simply interested in the inner workings of the Ethereum network. By keeping an eye on validators, you can:</p>
    <ul>
      <li>Ensure Validator Performance: Monitor the performance and health of your validators to maximize rewards and avoid penalties.</li>
      <li>Stay Informed: Be aware of any changes or updates in the Ethereum network that might impact validator operations.</li>
      <li>Optimize Staking Strategies: Use detailed insights to optimize your staking strategies and make data-driven decisions.</li>
      <li>Enhance Network Security: Contribute to the security and stability of the Ethereum network by actively managing and tracking validators.</li>
    </ul>
    <h3>Getting Started</h3>
    <p>To start tracking your Ethereum validators, simply enter your validator address or select from the list of active validators. Our platform will provide you with a comprehensive overview and continuous updates on their status and performance.</p>
    <p>Whether you're a seasoned Ethereum enthusiast or just starting out, our tool is designed to provide you with all the information you need to make informed decisions and keep track of your validators effectively.</p>
  </div>
);

const AboutContent = () => (
  <div style={styles.box}>
    <h1>About</h1>
    <p>The Ethereum validator tracker monitors and displays the performance and status of validators in the Ethereum 2.0 network. Ethereum 2.0, also known as Eth2 or Serenity, introduced a new consensus mechanism called Proof of Stake (PoS), replacing the original Proof of Work (PoW) system. Validators are essential in this system, as they propose and validate new blocks in the Ethereum blockchain.</p>
    <h2>Validator Status</h2>
    <ul>
      <li>Active: Indicates that the validator is currently online and participating in the network. An active validator is correctly attesting to and proposing blocks.</li>
      <li>Inactive: Refers to a validator that is not currently online or not participating. This can be due to various reasons, such as server downtime or configuration issues.</li>
      <li>Slashed: Occurs when a validator is penalized for malicious behavior or significant errors. Slashing results in the loss of a portion of staked ETH and may lead to validator removal from the network.</li>
    </ul>
    <h2>Performance Metrics</h2>
    <ul>
      <li>Uptime: Measures how often a validator is online and participating in the network compared to the total time. High uptime indicates reliability.</li>
      <li>Performance: Assesses the validator’s ability to propose and attest to blocks. This includes metrics on missed attestations or blocks, which can affect rewards and penalties.</li>
      <li>Rewards: Details the total rewards earned by a validator for participating in the network. Rewards come from successful attestations and block proposals.</li>
    </ul>
    <h2>Epoch and Slot Information</h2>
    <ul>
      <li>Epoch: An epoch in Ethereum 2.0 is a collection of slots, typically lasting 6.4 minutes. Validators are assigned different tasks in each epoch, such as proposing and attesting to blocks.</li>
      <li>Slot: A slot is a discrete period within an epoch where a block can be proposed. Each slot lasts 12 seconds. The tracker provides information on the current slot and the validator’s performance in those slots.</li>
    </ul>
    <h2>Staking Information</h2>
    <ul>
      <li>Amount Staked: Shows the total amount of ETH a validator has staked. This is crucial for understanding the validator’s commitment and potential rewards.</li>
      <li>Staking Rewards: The earnings a validator receives for participating in the network. These rewards are proportional to the amount staked and the validator’s performance.</li>
      <li>Penalties: When a validator is slashed, a portion of their staked ETH is forfeited. The amount of slashing depends on the severity of the offense, such as double-signing or long-term inactivity.</li>
    </ul>
  </div>
);

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const styles = {
  container: {
    display: 'flex',
  },
  sidebar: {
    width: '200px',
    backgroundColor: '#f4f4f4',
    padding: '15px',
    height: '110vh',
    overflowY: 'auto',
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  item: {
    marginBottom: '10px',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    fontWeight: 'bold',
    transition: 'color 0.3s',
  },
  activeItem: {
    border: '2px solid black', // Black border for the active item
    borderRadius: '4px',
    padding: '5px',
    backgroundColor: '#f0f0f0', // Optional: Slightly different background for contrast
  },
  activeLink: {
    color: 'black', // Black color for the active link
  },
  content: {
    flex: 1,
    padding: '15px',
  },
  box: {
    border: '2px solid black', // Black border for content boxes
    borderRadius: '8px',
    padding: '15px',
    margin: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  }
};

export default Sidebar;
