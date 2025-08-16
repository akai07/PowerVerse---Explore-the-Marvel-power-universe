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
 * @param {string} props.viewMode - Display mode: 'grid' or 'list'
 */
function CharacterCard({ character, powerLevel, onClick, showPower = true, className = '', viewMode = 'grid' }) {
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

  // Get character type styling
  const getTypeClass = (type) => {
    if (type.toLowerCase().includes('hero')) return 'hero';
    if (type.toLowerCase().includes('villain')) return 'villain';
    if (type.toLowerCase().includes('anti-hero')) return 'anti-hero';
    return 'neutral';
  };

  // Truncate text for list view
  const truncateText = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (viewMode === 'list') {
    return (
      <div className={`character-card character-card-list ${className}`} onClick={onClick}>
        <div className="character-image-list">
          <img 
            src={character['Image URL']} 
            alt={characterName} 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/80x120?text=No+Image';
            }}
          />
        </div>
        <div className="character-info-list">
          <div className="character-header">
            <h2 className="character-name" title={characterName}>{characterName}</h2>
            <div className={`character-type type-${getTypeClass(characterType)}`}>
              {characterType}
            </div>
          </div>
          <div className="character-details">
            <p><strong>Real Name:</strong> {character.Alias}</p>
            {character.Powers && (
              <p><strong>Powers:</strong> {truncateText(character.Powers, 80)}</p>
            )}
            {character.Affiliation && (
              <p><strong>Affiliation:</strong> {character.Affiliation}</p>
            )}
          </div>
          {showPower && powerLevel && (
            <div className="power-meter-list">
              <span className="power-label">Power: {powerLevel}/10</span>
              <div className="power-bar-list">
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
        </div>
        <div className="character-actions">
          {character['Info URL'] && (
            <a 
              href={character['Info URL']} 
              target="_blank" 
              rel="noopener noreferrer"
              className="info-link-list"
              onClick={(e) => e.stopPropagation()}
              title="Learn More"
            >
              📖
            </a>
          )}
        </div>
      </div>
    );
  }

  // Grid view (default)
  return (
    <div className={`character-card character-card-grid ${className}`} onClick={onClick}>
      <div className="character-image">
        <img 
          src={character['Image URL']} 
          alt={characterName} 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
          }}
        />
        <div className="character-overlay">
          <div className={`character-type-badge type-${getTypeClass(characterType)}`}>
            {characterType}
          </div>
        </div>
      </div>
      <div className="character-info">
        <h2 className="character-name" title={characterName}>{characterName}</h2>
        <p className="character-alias"><strong>Real Name:</strong> {character.Alias}</p>
        
        {character.Powers && (
          <div className="character-powers">
            <strong>Powers:</strong>
            <p className="powers-text">{truncateText(character.Powers, 120)}</p>
          </div>
        )}
        
        {character.Affiliation && (
          <p className="character-affiliation">
            <strong>Affiliation:</strong> {character.Affiliation}
          </p>
        )}
        
        {showPower && powerLevel && (
          <div className="power-meter">
            <div className="power-header">
              <span className="power-label">Power Level</span>
              <span className="power-value">{powerLevel}/10</span>
            </div>
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
            <span>📖</span> Learn More
          </a>
        )}
      </div>
    </div>
  );
}

export default CharacterCard;