import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Get API URL from window object or localStorage
const getApiUrl = () => {
  return window.REACT_APP_API_URL || `http://localhost:${window.localStorage.getItem('BACKEND_PORT') || '8000'}`;
};

const API_URL = getApiUrl();

const BackendStatus = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [statusData, setStatusData] = useState(null);
  
  useEffect(() => {
    // Check backend connectivity
    const checkBackendStatus = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/status`);
        setIsConnected(true);
        setStatusData(response.data);
      } catch (error) {
        console.error('Backend connection error:', error);
        setIsConnected(false);
        setStatusData(null);
      }
    };
    
    // Check immediately on component mount
    checkBackendStatus();
    
    // Set up interval to check periodically
    const intervalId = setInterval(checkBackendStatus, 30000); // Check every 30 seconds
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  
  const statusStyle = {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    top: '10px',
    right: '20px',
    fontSize: '0.8rem',
    color: isConnected ? '#333' : '#666'
  };
  
  const indicatorStyle = {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: isConnected ? '#4CAF50' : '#F44336', // Green when connected, red when disconnected
    marginRight: '5px',
    boxShadow: isConnected ? '0 0 5px #4CAF50' : 'none' // Glow effect when connected
  };
  
  return (
    <div className="backend-status" style={statusStyle}>
      <div className="status-indicator" style={indicatorStyle}></div>
      <span>{isConnected ? 'Backend Connected' : 'Backend Disconnected'}</span>
    </div>
  );
};

export default BackendStatus;