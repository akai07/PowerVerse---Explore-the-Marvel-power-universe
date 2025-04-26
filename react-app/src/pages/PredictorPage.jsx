import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PredictorPage.css';
import CharacterCard from '../components/CharacterCard';
import CharacterComparison from '../components/CharacterComparison';
import BackendStatus from '../components/BackendStatus';

// Get API URL from window object or localStorage
const getApiUrl = () => {
  return window.REACT_APP_API_URL || `http://localhost:${window.localStorage.getItem('BACKEND_PORT') || '8000'}`;
};

const API_URL = getApiUrl();

function PredictorPage() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [powerLevel, setPowerLevel] = useState(null);
  const [comparisonCharacter, setComparisonCharacter] = useState(null);
  
  // Power attributes that users can modify
  const [powerAttributes, setPowerAttributes] = useState({
    strength: 5,
    intelligence: 5,
    speed: 5,
    durability: 5,
    energyProjection: 5,
    fightingSkills: 5
  });

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

  // Filter characters based on search term
  const filteredCharacters = characters.filter(char => 
    char.Alias?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    char['Superhero Identity']?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle character selection
  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
    // Generate a power level based on character attributes
    // In a real app, this would call the backend API
    const calculatedPowerLevel = calculatePowerLevel(character);
    setPowerLevel(calculatedPowerLevel);
  };

  // Calculate power level based on character attributes
  const calculatePowerLevel = (character) => {
    // Simple algorithm to calculate power level (1-10 scale)
    // In a real app, this would use the power_predictor.py model
    if (!character) return 5;
    
    // Add a deterministic factor based on character name length to make results consistent
    const nameLength = (character['Superhero Identity'] || character.Alias || '').length;
    const baseLevel = character['Hero/Villain'] === 'Hero' ? 6 : 5;
    const characterFactor = (nameLength % 5) / 2.5 - 1; // Factor between -1 and 1
    
    return Math.min(Math.max(Math.round((baseLevel + characterFactor) * 10) / 10, 1), 10);
  };
  
  // Get power color based on level
  const getPowerColor = (level) => {
    if (level >= 8) return '#ff4d4d'; // High power - red
    if (level >= 5) return '#ffaa00'; // Medium power - orange
    return '#4da6ff';                 // Low power - blue
  };

  // Handle attribute change
  const handleAttributeChange = (attribute, value) => {
    setPowerAttributes({
      ...powerAttributes,
      [attribute]: parseInt(value)
    });
  };

  // Predict custom power level based on attributes
  const predictCustomPowerLevel = () => {
    // Calculate weighted average of attributes
    const sum = Object.values(powerAttributes).reduce((acc, val) => acc + val, 0);
    const average = sum / Object.values(powerAttributes).length;
    return Math.min(Math.max(Math.round(average * 10) / 10, 1), 10);
  };

  // Handle comparison character selection
  const handleComparisonSelect = (character) => {
    if (character.id === selectedCharacter?.id) return; // Prevent comparing with self
    setComparisonCharacter(character);
    
    // Calculate power level for comparison character
    const comparisonPowerLevel = calculatePowerLevel(character);
    // Store the power level in the character object for easy access
    character.powerLevel = comparisonPowerLevel;
  };
  
  // Close comparison view
  const handleCloseComparison = () => {
    setComparisonCharacter(null);
  };

  return (
    <div className="page-container predictor-page">
      <BackendStatus />
      <div className="predictor-header">
        <h1>Marvel Power Predictor</h1>
        <p className="description">
          Explore the power levels of Marvel characters and predict how powerful your custom character would be!
        </p>
      </div>
      
      {loading && <div className="loading-state">Loading character data...</div>}
      {error && <div className="error-state">{error}</div>}
      
      {!loading && !error && (
        <div className="predictor-content">
          {/* Show character comparison if both characters are selected */}
          {selectedCharacter && comparisonCharacter && (
            <CharacterComparison
              character1={selectedCharacter}
              powerLevel1={powerLevel}
              character2={comparisonCharacter}
              powerLevel2={comparisonCharacter.powerLevel}
              onClose={handleCloseComparison}
            />
          )}
          
          <div className="search-section">
            <input
              type="text"
              placeholder="Search for a character..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            
            <div className="character-grid">
              {filteredCharacters.length > 0 ? (
                filteredCharacters.slice(0, 12).map((char, index) => (
                  <div 
                    key={index} 
                    className={`character-item ${selectedCharacter === char ? 'selected' : ''}`}
                    onClick={() => handleCharacterSelect(char)}
                  >
                    <CharacterCard 
                      character={char} 
                      powerLevel={calculatePowerLevel(char)}
                      showPower={false}
                      className="grid-character-card"
                    />
                  </div>
                ))
              ) : (
                <p>No characters found matching your search.</p>
              )}
            </div>
          </div>
          
          <div className="character-details">
            {selectedCharacter ? (
              <div className="selected-character">
                <CharacterCard 
                  character={selectedCharacter} 
                  powerLevel={powerLevel} 
                  className="selected-character-card"
                />
                
                {!comparisonCharacter && (
                  <button 
                    className="comparison-button"
                    onClick={() => {
                      // Find a random character to compare with
                      const randomIndex = Math.floor(Math.random() * Math.min(characters.length, 50));
                      handleComparisonSelect(characters[randomIndex]);
                    }}
                  >
                    Compare with Random Character
                  </button>
                )}
              </div>
            ) : (
              <div className="no-selection">
                <p>Select a character to see their details and predicted power level.</p>
              </div>
            )}
          </div>
          
          <div className="custom-predictor">
            <h2>Create Your Own Hero</h2>
            <p>Adjust the attributes below to see how powerful your custom character would be.</p>
            
            <div className="attributes-sliders">
              {Object.entries(powerAttributes).map(([attribute, value]) => (
                <div key={attribute} className="attribute-slider">
                  <label htmlFor={attribute}>
                    {attribute.charAt(0).toUpperCase() + attribute.slice(1)}: {value}
                  </label>
                  <input
                    type="range"
                    id={attribute}
                    min="1"
                    max="10"
                    value={value}
                    onChange={(e) => handleAttributeChange(attribute, e.target.value)}
                  />
                </div>
              ))}
            </div>
            
            <div className="custom-power-level">
              <h3>Predicted Power Level: {predictCustomPowerLevel()}</h3>
              <div className="power-bar">
                <div 
                  className="power-fill"
                  style={{ 
                    width: `${predictCustomPowerLevel() * 10}%`, 
                    backgroundColor: getPowerColor(predictCustomPowerLevel()) 
                  }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="character-comparison-section">
            <h2>Character Comparison</h2>
            <p>Compare your selected character with another Marvel character.</p>
            
            {selectedCharacter ? (
              <div className="comparison-selection">
                <div className="selected-for-comparison">
                  <h3>Selected: {selectedCharacter['Superhero Identity'] || selectedCharacter.Alias}</h3>
                  <p>Power Level: {powerLevel}</p>
                </div>
                
                {!comparisonCharacter ? (
                  <div className="comparison-instructions">
                    <p>Search and select another character above to compare power levels</p>
                    <p>Or choose from popular characters:</p>
                    <div className="popular-characters">
                      {characters.slice(0, 5).map((char, idx) => (
                        <button 
                          key={idx} 
                          className="comparison-button"
                          onClick={() => handleComparisonSelect(char)}
                          disabled={selectedCharacter === char}
                        >
                          {char['Superhero Identity'] || char.Alias}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="no-selection-message">
                <p>First select a character from the list above to enable comparison.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to get color based on power level
function getPowerColor(level) {
  if (level >= 8) return '#ff4d4d'; // High power - red
  if (level >= 5) return '#ffaa00'; // Medium power - orange
  return '#4da6ff';                 // Low power - blue
}

export default PredictorPage;