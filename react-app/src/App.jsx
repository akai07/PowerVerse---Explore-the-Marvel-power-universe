import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Import pages (these would be created in separate files)
const Home = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-4xl font-bold text-center mb-8">PowerVerse: Marvel Universe Analysis</h1>
    <p className="text-lg text-center mb-8">
      Explore the Marvel character universe through data science and interactive visualizations.
    </p>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div className="bg-blue-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Character Explorer</h2>
        <p className="mb-4">Search and filter Marvel characters by name, role, and affiliation.</p>
        <Link to="/explorer" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Explore Characters
        </Link>
      </div>
      
      <div className="bg-purple-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Role Predictor</h2>
        <p className="mb-4">Predict if a character is a Hero, Villain, or Antihero based on their powers.</p>
        <Link to="/predictor" className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
          Predict Roles
        </Link>
      </div>
      
      <div className="bg-green-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Network Visualization</h2>
        <p className="mb-4">Visualize connections between characters based on shared affiliations.</p>
        <Link to="/network" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          View Network
        </Link>
      </div>
    </div>
    
    <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">About This Project</h2>
      <p className="mb-4">
        This project analyzes a dataset of 45 Marvel characters using data science techniques like 
        NLP, clustering, classification, and network analysis. The interactive frontend helps users 
        visualize and interact with the Marvel character universe.
      </p>
      <p>
        Data science techniques used include TF-IDF vectorization of character powers, 
        Random Forest classification for role prediction, K-means clustering for character 
        similarity, and network analysis for character relationships.
      </p>
    </div>
  </div>
);

// Character Explorer Page Placeholder
const CharacterExplorer = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-6">Character Explorer</h1>
    <p className="mb-4">Search and filter Marvel characters:</p>
    
    <div className="mb-6">
      <input 
        type="text" 
        placeholder="Search by character name..."
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Character cards would be dynamically generated here */}
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-bold">Iron Man</h2>
        <p><strong>Real Name:</strong> Tony Stark</p>
        <p><strong>Affiliation:</strong> Avengers</p>
        <p><strong>Role:</strong> Hero</p>
        <p><strong>Powers:</strong> Powered Armor, Genius-level intellect</p>
        <p><strong>Power Level:</strong> Medium</p>
      </div>
      
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-bold">Thor</h2>
        <p><strong>Real Name:</strong> Thor Odinson</p>
        <p><strong>Affiliation:</strong> Avengers</p>
        <p><strong>Role:</strong> Hero</p>
        <p><strong>Powers:</strong> God of Thunder, Weather manipulation</p>
        <p><strong>Power Level:</strong> High</p>
      </div>
      
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-bold">Thanos</h2>
        <p><strong>Real Name:</strong> Thanos</p>
        <p><strong>Affiliation:</strong> Villain</p>
        <p><strong>Role:</strong> Villain</p>
        <p><strong>Powers:</strong> Expert marksmanship, Advanced technology</p>
        <p><strong>Power Level:</strong> High</p>
      </div>
    </div>
    
    <div className="mt-6">
      <Link to="/" className="text-blue-500 hover:underline">
        &larr; Back to Home
      </Link>
    </div>
  </div>
);

// Role Predictor Page Placeholder
const RolePredictor = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-6">Role Predictor</h1>
    <p className="mb-4">Enter character powers to predict if they're a Hero, Villain, or Antihero:</p>
    
    <div className="mb-6">
      <textarea 
        placeholder="Enter powers (e.g., 'Superhuman strength, Flight, Energy projection')" 
        className="w-full p-2 border border-gray-300 rounded h-32"
      ></textarea>
    </div>
    
    <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 mb-6">
      Predict Role
    </button>
    
    <div className="bg-gray-100 p-4 rounded mb-6">
      <h2 className="text-xl font-bold mb-2">Prediction Result:</h2>
      <p><strong>Predicted Role:</strong> <span className="text-blue-600">Hero</span></p>
      <div className="mt-2">
        <p><strong>Probability Breakdown:</strong></p>
        <div className="flex items-center mt-1">
          <span className="w-20">Hero:</span>
          <div className="w-full bg-gray-300 rounded-full h-4">
            <div className="bg-blue-600 h-4 rounded-full" style={{ width: '75%' }}></div>
          </div>
          <span className="ml-2">75%</span>
        </div>
        <div className="flex items-center mt-1">
          <span className="w-20">Villain:</span>
          <div className="w-full bg-gray-300 rounded-full h-4">
            <div className="bg-red-600 h-4 rounded-full" style={{ width: '15%' }}></div>
          </div>
          <span className="ml-2">15%</span>
        </div>
        <div className="flex items-center mt-1">
          <span className="w-20">Antihero:</span>
          <div className="w-full bg-gray-300 rounded-full h-4">
            <div className="bg-purple-600 h-4 rounded-full" style={{ width: '10%' }}></div>
          </div>
          <span className="ml-2">10%</span>
        </div>
      </div>
    </div>
    
    <div className="mt-6">
      <Link to="/" className="text-blue-500 hover:underline">
        &larr; Back to Home
      </Link>
    </div>
  </div>
);

// Network Visualization Page Placeholder
const NetworkVisualization = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-6">Character Network Visualization</h1>
    <p className="mb-4">Explore connections between Marvel characters based on shared affiliations:</p>
    
    <div className="bg-white p-4 rounded shadow-md mb-6 h-96 flex items-center justify-center">
      <p className="text-gray-500">[Interactive Network Visualization Would Appear Here]</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-gray-100 p-4 rounded">
        <h3 className="font-bold mb-2">Legend</h3>
        <div className="flex items-center mb-1">
          <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
          <span>Hero</span>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
          <span>Villain</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
          <span>Antihero</span>
        </div>
      </div>
      
      <div className="bg-gray-100 p-4 rounded">
        <h3 className="font-bold mb-2">Most Connected Characters</h3>
        <ol className="list-decimal list-inside">
          <li>Iron Man (15 connections)</li>
          <li>Captain America (12 connections)</li>
          <li>Thor (10 connections)</li>
        </ol>
      </div>
      
      <div className="bg-gray-100 p-4 rounded">
        <h3 className="font-bold mb-2">Affiliations</h3>
        <div className="flex items-center mb-1">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
          <span>Avengers</span>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
          <span>X-Men</span>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-pink-500 mr-2"></div>
          <span>Guardians of the Galaxy</span>
        </div>
      </div>
    </div>
    
    <div className="mt-6">
      <Link to="/" className="text-blue-500 hover:underline">
        &larr; Back to Home
      </Link>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-blue-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">PowerVerse</Link>
            <nav>
              <ul className="flex space-x-4">
                <li><Link to="/" className="hover:underline">Home</Link></li>
                <li><Link to="/explorer" className="hover:underline">Explorer</Link></li>
                <li><Link to="/predictor" className="hover:underline">Predictor</Link></li>
                <li><Link to="/network" className="hover:underline">Network</Link></li>
              </ul>
            </nav>
          </div>
        </header>
        
        <main className="py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explorer" element={<CharacterExplorer />} />
            <Route path="/predictor" element={<RolePredictor />} />
            <Route path="/network" element={<NetworkVisualization />} />
          </Routes>
        </main>
        
        <footer className="bg-gray-800 text-white p-4 mt-8">
          <div className="container mx-auto text-center">
            <p>PowerVerse: Marvel Universe Analysis | Made with 💥 by Akai</p>
            <p className="text-sm mt-2">This is a fan project. All character rights belong to Marvel and respective owners.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;