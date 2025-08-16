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
      
      {/* Hero Section */}
      <div className="predictor-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-main">Marvel Power</span>
            <span className="title-accent">Predictor</span>
          </h1>
          <p className="hero-description">
            Harness the power of AI to analyze Marvel characters and predict the strength of your custom heroes!
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">{characters.length}</span>
              <span className="stat-label">Characters</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">∞</span>
              <span className="stat-label">Possibilities</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">AI</span>
              <span className="stat-label">Powered</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="power-orb">
            <div className="orb-core"></div>
            <div className="orb-ring ring-1"></div>
            <div className="orb-ring ring-2"></div>
            <div className="orb-ring ring-3"></div>
          </div>
        </div>
      </div>
      
      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Analyzing Marvel Universe...</p>
        </div>
      )}
      
      {error && (
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h3 className="error-title">Connection Error</h3>
          <p className="error-message">{error}</p>
          <button className="retry-button" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      )}
      
      {!loading && !error && (
        <div className="predictor-content">
          {/* Character Comparison Modal */}
          {selectedCharacter && comparisonCharacter && (
            <div className="comparison-modal">
              <div className="modal-backdrop" onClick={handleCloseComparison}></div>
              <div className="modal-content">
                <button className="modal-close" onClick={handleCloseComparison}>×</button>
                <CharacterComparison
                  character1={selectedCharacter}
                  powerLevel1={powerLevel}
                  character2={comparisonCharacter}
                  powerLevel2={comparisonCharacter.powerLevel}
                  onClose={handleCloseComparison}
                />
              </div>
            </div>
          )}
          
          {/* Character Selection Section */}
          <section className="character-selection">
            <div className="section-header">
              <h2 className="section-title">Choose Your Character</h2>
              <p className="section-description">Select a Marvel character to analyze their power level</p>
            </div>
            
            <div className="search-container">
              <div className="search-wrapper">
                <input
                  type="text"
                  placeholder="Search characters by name or alias..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <div className="search-icon">🔍</div>
              </div>
              <div className="search-results-count">
                {filteredCharacters.length} character{filteredCharacters.length !== 1 ? 's' : ''} found
              </div>
            </div>
            
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
                      viewMode="grid"
                    />
                    {selectedCharacter === char && (
                      <div className="selection-indicator">
                        <span className="checkmark">✓</span>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="no-results">
                  <div className="no-results-icon">🔍</div>
                  <h3>No Characters Found</h3>
                  <p>Try adjusting your search terms</p>
                </div>
              )}
            </div>
          </section>
          
          {/* Selected Character Analysis */}
          {selectedCharacter && (
            <section className="character-analysis">
              <div className="section-header">
                <h2 className="section-title">Power Analysis</h2>
                <p className="section-description">Detailed breakdown of {selectedCharacter['Superhero Identity'] || selectedCharacter.Alias}'s abilities</p>
              </div>
              
              <div className="analysis-content">
                <div className="character-showcase">
                  <CharacterCard 
                    character={selectedCharacter} 
                    powerLevel={powerLevel}
                    viewMode="grid"
                  />
                  
                  <div className="power-breakdown">
                    <h3>Power Level: {powerLevel}/10</h3>
                    <div className="power-meter-large">
                      <div 
                        className="power-fill-large"
                        style={{ 
                          width: `${powerLevel * 10}%`, 
                          backgroundColor: getPowerColor(powerLevel) 
                        }}
                      ></div>
                    </div>
                    
                    <div className="power-category">
                      {powerLevel >= 8 && <span className="category high">🔥 Cosmic Level</span>}
                      {powerLevel >= 6 && powerLevel < 8 && <span className="category medium">⚡ Enhanced</span>}
                      {powerLevel >= 4 && powerLevel < 6 && <span className="category normal">👤 Human+</span>}
                      {powerLevel < 4 && <span className="category low">🛡️ Tactical</span>}
                    </div>
                  </div>
                </div>
                
                <div className="analysis-actions">
                  <button 
                    className="action-button primary"
                    onClick={() => {
                      const randomIndex = Math.floor(Math.random() * Math.min(characters.length, 50));
                      handleComparisonSelect(characters[randomIndex]);
                    }}
                  >
                    🆚 Compare Powers
                  </button>
                  
                  <button className="action-button secondary">
                    📊 View Stats
                  </button>
                  
                  <button className="action-button secondary">
                    🔗 Learn More
                  </button>
                </div>
              </div>
            </section>
          )}
          
          {/* Custom Character Creator */}
          <section className="custom-creator">
            <div className="section-header">
              <h2 className="section-title">Create Your Hero</h2>
              <p className="section-description">Design your own character and predict their power level using AI</p>
            </div>
            
            <div className="creator-content">
              <div className="attributes-panel">
                <h3>Character Attributes</h3>
                <div className="attributes-grid">
                  {Object.entries(powerAttributes).map(([attribute, value]) => (
                    <div key={attribute} className="attribute-control">
                      <div className="attribute-header">
                        <label className="attribute-label">
                          {attribute.charAt(0).toUpperCase() + attribute.slice(1).replace(/([A-Z])/g, ' $1')}
                        </label>
                        <span className="attribute-value">{value}</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={value}
                        onChange={(e) => handleAttributeChange(attribute, e.target.value)}
                        className="attribute-slider"
                        style={{
                          background: `linear-gradient(to right, var(--accent-primary) 0%, var(--accent-primary) ${value * 10}%, rgba(255,255,255,0.1) ${value * 10}%, rgba(255,255,255,0.1) 100%)`
                        }}
                      />
                      <div className="attribute-markers">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(mark => (
                          <div key={mark} className={`marker ${value >= mark ? 'active' : ''}`}></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="prediction-panel">
                <div className="custom-character-card">
                  <div className="character-avatar">
                    <div className="avatar-placeholder">
                      <span className="avatar-icon">🦸</span>
                    </div>
                  </div>
                  
                  <div className="character-info">
                    <h3 className="character-name">Your Hero</h3>
                    <p className="character-type">Custom Character</p>
                  </div>
                  
                  <div className="predicted-power">
                    <h4>Predicted Power Level</h4>
                    <div className="power-display">
                      <span className="power-number">{predictCustomPowerLevel()}</span>
                      <span className="power-max">/10</span>
                    </div>
                    
                    <div className="power-bar-custom">
                      <div 
                        className="power-fill-custom"
                        style={{ 
                          width: `${predictCustomPowerLevel() * 10}%`, 
                          backgroundColor: getPowerColor(predictCustomPowerLevel()) 
                        }}
                      ></div>
                    </div>
                    
                    <div className="power-description">
                      {predictCustomPowerLevel() >= 8 && "Your hero rivals cosmic entities!"}
                      {predictCustomPowerLevel() >= 6 && predictCustomPowerLevel() < 8 && "A formidable superhero with enhanced abilities!"}
                      {predictCustomPowerLevel() >= 4 && predictCustomPowerLevel() < 6 && "A capable hero with above-average powers!"}
                      {predictCustomPowerLevel() < 4 && "A tactical hero who relies on skill and strategy!"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
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