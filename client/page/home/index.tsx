// MADE A MOCK HOMEPAGE TO CHECK DEVICES PAGE AND ERROR HANDLING

import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="home-page" style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Welcome to the Smart Home App</h1>
      <p>Use the link below to go to the devices page:</p>
      <Link to="/devices">
        <button>Go to Devices</button>
      </Link>
    </div>
  );
};

export default HomePage;
