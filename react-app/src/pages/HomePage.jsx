import React from 'react';
import BackendStatus from '../components/BackendStatus';

function HomePage() {
  return (
    <div className="page-container home-page">
      <BackendStatus />
      <h1>Welcome to PowerVerse</h1>
      <p>Your portal to exploring the incredible powers of Marvel characters. Discover abilities, predict roles, and visualize the power network.</p>
      <div className="mini-game-placeholder">
        <h2>Mini-Game: Guess the Hero!</h2>
        <p>Can you guess the character based on their powers? (Coming Soon!)</p>
      </div>
      {/* Placeholder for future content like featured characters */}
    </div>
  );
}

export default HomePage;