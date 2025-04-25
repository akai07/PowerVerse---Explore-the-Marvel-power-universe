import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios

function ExplorerPage() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the backend API
    axios.get('http://localhost:5001/api/characters') // Use the correct backend URL
      .then(response => {
        setCharacters(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching character data:", error);
        setError('Failed to load character data. Please try again later.');
        setLoading(false);
      });
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="page-container explorer-page">
      <h1>Character Explorer</h1>
      <p>Dive deep into the details of Marvel characters and their powers.</p>
      
      {loading && <p>Loading character data...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {!loading && !error && (
        <div className="character-list">
          {/* Display character data here - basic example */} 
          {characters.length > 0 ? (
            <ul>
              {characters.map((char, index) => (
                <li key={index}>{char.Character} ({char['Real Name']}) - {char.Powers}</li>
              ))}
            </ul>
          ) : (
            <p>No character data available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ExplorerPage;
axios.get('http://localhost:5001/api/characters') // Use the correct backend URL