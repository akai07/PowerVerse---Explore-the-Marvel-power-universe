import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CharacterCard from '../components/CharacterCard';
import BackendStatus from '../components/BackendStatus';
import './ExplorerPage.css';

// Get API URL from window object or localStorage
const getApiUrl = () => {
  return window.REACT_APP_API_URL || `http://localhost:${window.localStorage.getItem('BACKEND_PORT') || '8000'}`;
};

const API_URL = getApiUrl();

function ExplorerPage() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the backend API
    axios.get(`${API_URL}/api/characters`)
      .then(response => {
        setCharacters(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching character data:", error);
        setError('Failed to load character data. Please try again later.');
        setLoading(false);
      });
  }, [API_URL]); // Add API_URL to dependency array

  return (
    <div className="page-container explorer-page">
      <BackendStatus />
      <div className="explorer-header">
        <h1>Character Explorer</h1>
        <p>Dive deep into the details of Marvel characters and their powers.</p>
      </div>
      
      {loading && <div className="loading-state">Loading character data...</div>}
      {error && <div className="error-state">{error}</div>}
      
      {!loading && !error && (
        <div className="character-grid">
          {characters.length > 0 ? (
            characters.map((char, index) => (
              <CharacterCard
                key={index}
                character={char}
                powerLevel={char.PowerLevel || 5}
                showPower={true}
                className="explorer-character-card"
              />
            ))
          ) : (
            <div className="no-data-state">No character data available.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default ExplorerPage;