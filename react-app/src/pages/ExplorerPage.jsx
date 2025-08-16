import React, { useState, useEffect, useMemo } from 'react';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');

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
  }, []);

  // Filter and sort characters
  const filteredAndSortedCharacters = useMemo(() => {
    let filtered = characters.filter(char => {
      const matchesSearch = char['Superhero Identity']?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           char.Alias?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           char.Powers?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterType === 'all' || 
                           char['Hero/Villain']?.toLowerCase().includes(filterType.toLowerCase());
      
      return matchesSearch && matchesFilter;
    });

    // Sort characters
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a['Superhero Identity'] || '').localeCompare(b['Superhero Identity'] || '');
        case 'alias':
          return (a.Alias || '').localeCompare(b.Alias || '');
        case 'type':
          return (a['Hero/Villain'] || '').localeCompare(b['Hero/Villain'] || '');
        default:
          return 0;
      }
    });

    return filtered;
  }, [characters, searchTerm, filterType, sortBy]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilterType('all');
    setSortBy('name');
  };

  return (
    <div className="explorer-page">
      <BackendStatus />
      
      {/* Header Section */}
      <div className="explorer-header">
        <div className="header-content">
          <h1 className="page-title">
            <span className="title-icon">🦸‍♂️</span>
            Character Explorer
          </h1>
          <p className="page-description">
            Discover the incredible world of Marvel characters. Search, filter, and explore their unique powers and stories.
          </p>
        </div>
        
        {/* Search and Filter Controls */}
        <div className="controls-section">
          <div className="search-container">
            <div className="search-input-wrapper">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search characters, aliases, or powers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button 
                  className="clear-search"
                  onClick={() => setSearchTerm('')}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
          
          <div className="filter-controls">
            <div className="filter-group">
              <label>Filter by Type:</label>
              <select 
                value={filterType} 
                onChange={(e) => setFilterType(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Characters</option>
                <option value="hero">Heroes</option>
                <option value="villain">Villains</option>
                <option value="anti-hero">Anti-Heroes</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label>Sort by:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="name">Character Name</option>
                <option value="alias">Real Name</option>
                <option value="type">Type</option>
              </select>
            </div>
            
            <div className="view-controls">
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                ⊞
              </button>
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                ☰
              </button>
            </div>
            
            <button className="clear-filters-btn" onClick={handleClearFilters}>
              Clear Filters
            </button>
          </div>
        </div>
        
        {/* Results Summary */}
        <div className="results-summary">
          <span className="results-count">
            {filteredAndSortedCharacters.length} of {characters.length} characters
          </span>
          {(searchTerm || filterType !== 'all') && (
            <span className="filter-indicator">
              {searchTerm && `"${searchTerm}"`}
              {searchTerm && filterType !== 'all' && ' • '}
              {filterType !== 'all' && `${filterType}s`}
            </span>
          )}
        </div>
      </div>
      
      {/* Loading and Error States */}
      {loading && (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading Marvel Universe...</p>
        </div>
      )}
      
      {error && (
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button 
            className="retry-btn"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      )}
      
      {/* Character Grid/List */}
      {!loading && !error && (
        <div className={`character-container ${viewMode}`}>
          {filteredAndSortedCharacters.length > 0 ? (
            filteredAndSortedCharacters.map((char, index) => (
              <CharacterCard
                key={`${char['Superhero Identity']}-${index}`}
                character={char}
                powerLevel={char.PowerLevel || 5}
                showPower={true}
                className={`explorer-character-card ${viewMode}-item`}
                viewMode={viewMode}
              />
            ))
          ) : (
            <div className="no-results-state">
              <div className="no-results-icon">🔍</div>
              <h3>No characters found</h3>
              <p>
                {searchTerm || filterType !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'No character data available at the moment'
                }
              </p>
              {(searchTerm || filterType !== 'all') && (
                <button className="clear-filters-btn" onClick={handleClearFilters}>
                  Clear All Filters
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ExplorerPage;