import React, { useState } from 'react';
import './PortSelector.css';

const PortSelector = ({ onPortSelect }) => {
  const [port, setPort] = useState('8000');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const portNumber = parseInt(port);
    if (isNaN(portNumber) || portNumber < 1 || portNumber > 65535) {
      setError('Please enter a valid port number (1-65535)');
      return;
    }
    onPortSelect(port);
  };

  return (
    <div className="port-selector-container">
      <div className="port-selector-card">
        <h2>Connect to Backend Server</h2>
        <form onSubmit={handleSubmit} className="port-selector-form">
          <div className="form-group">
            <label htmlFor="port">Backend Port Number:</label>
            <input
              type="text"
              id="port"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              placeholder="Enter port number (e.g., 8000)"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="connect-button">
            Connect
          </button>
        </form>
      </div>
    </div>
  );
};

export default PortSelector;