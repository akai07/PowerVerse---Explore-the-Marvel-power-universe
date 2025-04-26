import React from 'react';
import './CharacterCard.css';

/**
 * CharacterCard component for displaying Marvel character information
 * 
 * @param {Object} props
 * @param {Object} props.character - The character data object
 * @param {number} props.powerLevel - The character's power level (1-10 scale)
 * @param {Function} props.onClick - Optional click handler
 * @param {boolean} props.showPower - Whether to show the power level meter
 * @param {string} props.className - Additional CSS class names
 */
function CharacterCard({ character, powerLevel, onClick, showPower = true, className = '' }) {
  if (!character) return null;

  // Get character name (either superhero identity or alias)
  const characterName = character['Superhero Identity'] || character.Alias;
  
  // Get character type (Hero/Villain)
  const characterType = character['Hero/Villain'] || '';
  
  // Get power color based on level
  const getPowerColor = (level) => {
    if (level >= 8) return '#ff4d4d'; // High power - red
    if (level >= 5) return '#ffaa00'; // Medium power - orange
    return '#4da6ff';                 // Low power - blue
  };

  return (
    <div className={`character-card ${className}`} onClick={onClick}>
      <div className="character-image">
        <img 
          src={character['Image URL']} 
          alt={characterName} 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
          }}
        />
      </div>
      <div className="character-info">
        <h2 title={characterName}>{characterName}</h2>
        <div className="character-type">{characterType}</div>
        <p><strong>Real Name:</strong> {character.Alias}</p>
        
        {showPower && powerLevel && (
          <div className="power-meter">
            <h3>Power Level: {powerLevel}</h3>
            <div className="power-bar">
              <div 
                className="power-fill"
                style={{ 
                  width: `${powerLevel * 10}%`, 
                  backgroundColor: getPowerColor(powerLevel) 
                }}
              ></div>
            </div>
          </div>
        )}
        
        {character['Info URL'] && (
          <a 
            href={character['Info URL']} 
            target="_blank" 
            rel="noopener noreferrer"
            className="info-link"
            onClick={(e) => e.stopPropagation()}
          >
            Learn More
          </a>
        )}
      </div>
    </div>
  );
}

export default CharacterCard;