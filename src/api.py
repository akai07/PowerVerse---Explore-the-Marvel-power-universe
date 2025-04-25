import pandas as pd
from flask import Flask, jsonify
from flask_cors import CORS
import os
from urllib.parse import quote as url_quote

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Construct the absolute path to the CSV file
# Assuming the script is run from the project root or the 'src' directory
script_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(script_dir) # Go up one level from 'src'
data_path = os.path.join(project_root, 'data', 'marvel_characters_dataset.csv')

# Load the dataset
try:
    df = pd.read_csv(data_path)
    # Basic data cleaning: fill NaN values with empty strings or appropriate defaults
    df.fillna('', inplace=True)
except FileNotFoundError:
    print(f"Error: Could not find the dataset at {data_path}")
    df = pd.DataFrame() # Create an empty DataFrame if file not found

@app.route('/api/characters', methods=['GET'])
def get_characters():
    """API endpoint to get all character data."""
    if df.empty:
        return jsonify({"error": "Character data not loaded or file not found."}), 500
    
    # Convert DataFrame to a list of dictionaries (JSON serializable)
    characters_list = df.to_dict(orient='records')
    return jsonify(characters_list)

if __name__ == '__main__':
    # Use 0.0.0.0 to make the server accessible externally if needed,
    # otherwise use 127.0.0.1 for local access only.
    # Debug=True enables auto-reloading and provides more detailed error messages.
    # Set debug=False for production.
    app.run(host='0.0.0.0', port=5001, debug=True)