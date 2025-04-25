import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; // Keep global styles

// Import Components
import Navbar from './components/Navbar';

// Import Pages
import HomePage from './pages/HomePage';
import ExplorerPage from './pages/ExplorerPage';
import PredictorPage from './pages/PredictorPage';
import NetworkPage from './pages/NetworkPage';

// Optional: Import a Footer component if you create one
// import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App"> {/* Main container for styling */} 
        <Navbar />
        <main className="main-content"> {/* Wrapper for page content */} 
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explorer" element={<ExplorerPage />} />
            <Route path="/predictor" element={<PredictorPage />} />
            <Route path="/network" element={<NetworkPage />} />
            {/* Add other routes here if needed in the future */}
          </Routes>
        </main>
        {/* Optional: Add a Footer component here */}
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;