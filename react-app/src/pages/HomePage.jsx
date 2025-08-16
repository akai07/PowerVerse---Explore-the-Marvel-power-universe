import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BackendStatus from '../components/BackendStatus';

function HomePage() {
  const [currentHero, setCurrentHero] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const featuredHeroes = [
    {
      name: "Iron Man",
      alias: "Tony Stark",
      power: "Genius Intellect & Advanced Technology",
      image: "https://i.annihil.us/u/prod/marvel/i/mg/9/c0/527bb7b37ff55.jpg"
    },
    {
      name: "Captain America",
      alias: "Steve Rogers", 
      power: "Super Soldier Serum & Leadership",
      image: "https://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087.jpg"
    },
    {
      name: "Thor",
      alias: "Thor Odinson",
      power: "Asgardian Physiology & Mjolnir",
      image: "https://i.annihil.us/u/prod/marvel/i/mg/d/d0/5269657a74350.jpg"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % featuredHeroes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`home-page ${isVisible ? 'fade-in' : ''}`}>
      <BackendStatus />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">PowerVerse</span>
            <span className="subtitle">Marvel Universe Explorer</span>
          </h1>
          <p className="hero-description">
            Dive deep into the Marvel Universe with advanced analytics, character predictions, 
            and interactive visualizations. Discover the hidden connections between your favorite heroes and villains.
          </p>
          <div className="cta-buttons">
            <Link to="/explorer" className="btn btn-primary">
              <span>🚀</span> Explore Characters
            </Link>
            <Link to="/predictor" className="btn btn-secondary">
              <span>🔮</span> Power Predictor
            </Link>
          </div>
        </div>
        
        {/* Featured Hero Carousel */}
        <div className="featured-hero">
          <div className="hero-card">
            <div className="hero-image-container">
              <img 
                src={featuredHeroes[currentHero].image} 
                alt={featuredHeroes[currentHero].name}
                className="hero-image"
              />
              <div className="hero-glow"></div>
            </div>
            <div className="hero-info">
              <h3>{featuredHeroes[currentHero].name}</h3>
              <p className="hero-alias">{featuredHeroes[currentHero].alias}</p>
              <p className="hero-power">{featuredHeroes[currentHero].power}</p>
            </div>
          </div>
          <div className="carousel-indicators">
            {featuredHeroes.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentHero ? 'active' : ''}`}
                onClick={() => setCurrentHero(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Discover the Marvel Universe</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🦸‍♂️</div>
            <h3>Character Explorer</h3>
            <p>Browse through hundreds of Marvel characters with detailed information, powers, and affiliations.</p>
            <Link to="/explorer" className="feature-link">Explore Now →</Link>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔬</div>
            <h3>Power Predictor</h3>
            <p>Use AI to predict character roles and power levels based on their abilities and characteristics.</p>
            <Link to="/predictor" className="feature-link">Try Predictor →</Link>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🕸️</div>
            <h3>Network Analysis</h3>
            <p>Visualize complex relationships and connections between characters in the Marvel Universe.</p>
            <Link to="/network" className="feature-link">View Network →</Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">30+</div>
            <div className="stat-label">Marvel Characters</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">∞</div>
            <div className="stat-label">Possible Combinations</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">AI</div>
            <div className="stat-label">Powered Predictions</div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;