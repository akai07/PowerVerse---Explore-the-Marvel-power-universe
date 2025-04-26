import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import Components
import Navbar from './components/Navbar';
import PortSelector from './components/PortSelector';

// Import Pages
import HomePage from './pages/HomePage';
import ExplorerPage from './pages/ExplorerPage';
import PredictorPage from './pages/PredictorPage';
import NetworkPage from './pages/NetworkPage';

function App() {
  const [backendPort, setBackendPort] = useState(null);

  const handlePortSelect = (port) => {
    setBackendPort(port);
    // Update the API URL in the environment
    window.localStorage.setItem('BACKEND_PORT', port);
    window.REACT_APP_API_URL = `http://localhost:${port}`;
    console.log('Backend URL set to:', window.REACT_APP_API_URL);
  };

  if (!backendPort) {
    return <PortSelector onPortSelect={handlePortSelect} />;
  }

  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explorer" element={<ExplorerPage />} />
            <Route path="/predictor" element={<PredictorPage />} />
            <Route path="/network" element={<NetworkPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;