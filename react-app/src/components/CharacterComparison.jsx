import React from 'react';
import './CharacterComparison.css';
import CharacterCard from './CharacterCard';

/**
 * CharacterComparison component for comparing two Marvel characters
 * 
 * @param {Object} props
 * @param {Object} props.character1 - The first character data object
 * @param {number} props.powerLevel1 - The first character's power level (1-10 scale)
 * @param {Object} props.character2 - The second character data object
 * @param {number} props.powerLevel2 - The second character's power level (1-10 scale)
 * @param {Function} props.onClose - Function to call when closing the comparison
 */
function CharacterComparison({ character1, powerLevel1, character2, powerLevel2, onClose }) {
  if (!character1 || !character2) return null;

  // Calculate the difference between power levels
  const powerDifference = Math.abs(powerLevel1 - powerLevel2);
  const strongerCharacter = powerLevel1 > powerLevel2 ? character1 : character2;
  const strongerPower = Math.max(powerLevel1, powerLevel2);
  const weakerPower = Math.min(powerLevel1, powerLevel2);
  
  // Calculate percentage difference
  const percentageDifference = ((strongerPower - weakerPower) / weakerPower * 100).toFixed(1);
  
  // Get character names
  const character1Name = character1['Superhero Identity'] || character1.Alias;
  const character2Name = character2['Superhero Identity'] || character2.Alias;

  return (
    <div className="character-comparison">
      <div className="comparison-header">
        <h2>Character Comparison</h2>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      
      <div className="comparison-content">
        <div className="characters-container">
          <CharacterCard 
            character={character1} 
            powerLevel={powerLevel1} 
            className="comparison-card"
          />
          
          <div className="comparison-stats">
            <div className="vs-badge">VS</div>
            <div className="power-difference">
              <h3>Power Difference</h3>
              <div className="difference-value">{powerDifference.toFixed(1)} points</div>
              <div className="percentage-difference">{percentageDifference}% difference</div>
              
              <div className="comparison-result">
                <strong>{strongerCharacter['Superhero Identity'] || strongerCharacter.Alias}</strong> is stronger!
              </div>
              
              <div className="power-attributes">
                <h4>Power Attributes Comparison</h4>
                <div className="attribute-bars">
                  <div className="attribute-comparison">
                    <span>{character1Name}</span>
                    <div className="attribute-bar">
                      <div 
                        className="attribute-fill" 
                        style={{ width: `${powerLevel1 * 10}%`, backgroundColor: '#4da6ff' }}
                      ></div>
                    </div>
                    <span>{powerLevel1}</span>
                  </div>
                  
                  <div className="attribute-comparison">
                    <span>{character2Name}</span>
                    <div className="attribute-bar">
                      <div 
                        className="attribute-fill" 
                        style={{ width: `${powerLevel2 * 10}%`, backgroundColor: '#ff4d4d' }}
                      ></div>
                    </div>
                    <span>{powerLevel2}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <CharacterCard 
            character={character2} 
            powerLevel={powerLevel2} 
            className="comparison-card"
          />
        </div>
      </div>
    </div>
  );
}

export default CharacterComparison;