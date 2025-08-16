import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import sys
import json
import datetime
import socket
from urllib.parse import quote as url_quote

# Add the project root to the Python path to import from src
script_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(script_dir) # Go up one level from 'src'
sys.path.append(project_root)

# Import the power predictor model
from src.models.power_predictor import PowerPredictor

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Construct the absolute path to the CSV file
marvel_data_path = os.path.join(project_root, 'data', 'Marvels - 2 (1).csv')

# Load the dataset
try:
    df = pd.read_csv(marvel_data_path)
    # Basic data cleaning: fill NaN values with empty strings or appropriate defaults
    df.fillna('', inplace=True)
    print(f"Successfully loaded Marvel dataset with {len(df)} characters")
except FileNotFoundError:
    print(f"Error: Could not find the dataset at {marvel_data_path}")
    df = pd.DataFrame() # Create an empty DataFrame if file not found

# Initialize the power predictor model
power_predictor = PowerPredictor()

# Train the model if data is available
if not df.empty:
    try:
        # Add a temporary Estimated_Power_Level column for training
        # In a real app, this would come from actual data
        df['Estimated_Power_Level'] = 'Medium'  # Default value
        df.loc[df['Hero/Villain'].str.contains('Hero', na=False), 'Estimated_Power_Level'] = 'High'
        df.loc[df['Hero/Villain'].str.contains('Villain', na=False), 'Estimated_Power_Level'] = 'Medium'
        
        # Train the model
        metrics = power_predictor.train(df)
        print(f"Power predictor model trained successfully. R² score: {metrics['r2']:.2f}")
    except Exception as e:
        print(f"Error training power predictor model: {e}")

@app.route('/api/characters', methods=['GET'])
def get_characters():
    """API endpoint to get all character data."""
    if df.empty:
        return jsonify({"error": "Character data not loaded or file not found."}), 500
    
    # Convert DataFrame to a list of dictionaries (JSON serializable)
    characters_list = df.to_dict(orient='records')
    return jsonify(characters_list)

# Create a directory for storing fetched data
data_storage_dir = os.path.join(project_root, 'data', 'fetched_data')
os.makedirs(data_storage_dir, exist_ok=True)

# Function to store fetched data
def store_fetched_data(data_source, data):
    """Store fetched data with timestamp for future use"""
    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"{data_source}_{timestamp}.json"
    filepath = os.path.join(data_storage_dir, filename)
    
    with open(filepath, 'w') as f:
        json.dump(data, f, indent=2)
    
    print(f"Stored fetched data from {data_source} at {filepath}")
    return filepath

@app.route('/api/status', methods=['GET'])
def api_status():
    """API endpoint to check backend connectivity"""
    return jsonify({
        "status": "online",
        "timestamp": datetime.datetime.now().isoformat(),
        "dataLoaded": not df.empty,
        "characterCount": len(df) if not df.empty else 0
    })

@app.route('/api/predict-power', methods=['POST'])
def predict_power():
    """Predict power level based on character attributes."""
    try:
        data = request.get_json()
        
        # Check if we have numerical attributes (new format)
        if all(key in data for key in ['strength', 'speed', 'durability', 'intelligence', 'energy_projection', 'fighting_skills']):
            # Calculate power level from numerical attributes
            attributes = {
                'strength': data.get('strength', 5),
                'speed': data.get('speed', 5),
                'durability': data.get('durability', 5),
                'intelligence': data.get('intelligence', 5),
                'energy_projection': data.get('energy_projection', 5),
                'fighting_skills': data.get('fighting_skills', 5)
            }
            
            # Calculate weighted average (intelligence and strength have higher weight)
            weights = {
                'strength': 1.2,
                'speed': 1.0,
                'durability': 1.1,
                'intelligence': 1.3,
                'energy_projection': 1.1,
                'fighting_skills': 0.9
            }
            
            weighted_sum = sum(attributes[attr] * weights[attr] for attr in attributes)
            total_weight = sum(weights.values())
            power_level = (weighted_sum / total_weight)
            
            # Ensure power level is within 1-10 range
            power_level = max(1, min(10, power_level))
            
        else:
            # Legacy format with categorical data
            hero_villain = data.get('heroVillain', 'Hero')
            estimated_power_level = data.get('estimatedPowerLevel', 'Medium')
            
            # Predict power level using the trained model
            power_level = power_predictor.predict_power_level(hero_villain, estimated_power_level)
        
        # Store the prediction request and result
        store_data = {
            "request": data,
            "result": {
                "powerLevel": float(power_level),
                "powerCategory": get_power_category(power_level)
            },
            "timestamp": datetime.datetime.now().isoformat()
        }
        store_fetched_data("power_prediction", store_data)
        
        return jsonify({
            "powerLevel": float(power_level),
            "powerCategory": get_power_category(power_level)
        })
    except Exception as e:
        return jsonify({"error": f"Error predicting power level: {str(e)}"}), 500

def get_power_category(power_level):
    """Categorize power level into Low, Medium, or High."""
    if power_level >= 8:
        return "High"
    elif power_level >= 5:
        return "Medium"
    else:
        return "Low"

def find_available_port(start_port=8000, max_attempts=10):
    """Find an available port starting from start_port."""
    for port in range(start_port, start_port + max_attempts):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            try:
                s.bind(('0.0.0.0', port))
                return port
            except socket.error:
                continue
    return None

if __name__ == '__main__':
    default_port = 8000
    port = find_available_port(default_port)
    
    if port is None:
        print(f"Error: Could not find an available port after trying {max_attempts} ports starting from {default_port}")
        sys.exit(1)
    
    print(f"Starting PowerVerse API server on 0.0.0.0:{port}")
    app.run(host='0.0.0.0', port=port, debug=False)