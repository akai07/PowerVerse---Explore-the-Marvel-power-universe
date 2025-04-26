# 🦸‍♂️ PowerVerse: Marvel Universe Analysis

This project dives into a dataset of Marvel characters to explore their powers, roles, and affiliations using Data Science techniques like NLP, clustering, classification, and network analysis. Additionally, a React-based interactive frontend helps users visualize and interact with the Marvel character universe.

## ✨ New Feature: Power Predictor

The Power Predictor feature allows users to:

- Explore Marvel characters with their images and details
- View estimated power levels for each character on a scale of 1-10
- Create custom characters by adjusting power attributes
- Compare power levels between different characters
- Access official Marvel character information via direct links

## 📦 Dataset Overview

The project now uses an enhanced Marvel dataset with the following columns:

- **Alias**: Character's real name (e.g., Tony Stark)
- **Superhero Identity**: Superhero name (e.g., Iron Man)
- **Hero/Villain**: Character alignment
- **Image URL**: Link to character image
- **Info URL**: Link to official Marvel character page
- **Power Level**: Estimated on a scale of 1-10 using our prediction model

## 🧠 Project Objectives

### Data Science Goals:
- **NLP on Powers**: Vectorize the text powers using TF-IDF / BERT
- **Role Prediction**: Predict if a character is Hero/Villain/Anti-Hero based on their Powers
- **Character Clustering**: Cluster similar characters using KMeans on Powers
- **Affiliation Graph**: Visualize a network of characters based on shared affiliations
- **Power Level Estimation**: Infer and assign Low/Medium/High power levels using rules or ML

## 📈 Visualizations

Includes:
- Power & Role distribution (bar/pie charts)
- Word clouds of common powers
- TF-IDF-based character similarity heatmap
- Interactive Affiliation Network (D3 / NetworkX)

## 🛠 Tech Stack

### Data Science:
- Python, Pandas, NumPy, Scikit-learn, spaCy, NetworkX, matplotlib, Seaborn, WordCloud, Plotly

### Frontend (React App):
- React.js, TailwindCSS, D3.js, Chart.js, React Router

## 📂 Project Structure

```
powerverse/
├── data/
│   ├── marvel_characters_dataset.csv
│   └── Marvels - 2 (1).csv       # Enhanced dataset with images and info URLs
├── notebooks/
│   └── marvel_analysis.ipynb
├── react-app/                    # Frontend React application
│   ├── public/                   # Static files
│   └── src/                      # React source code
│       ├── components/           # Reusable UI components
│       │   ├── CharacterCard.jsx # Character display component
│       │   └── CharacterCard.css # Styling for character cards
│       └── pages/                # Application pages
│           ├── PredictorPage.jsx # Power Predictor feature
│           └── PredictorPage.css # Styling for Power Predictor
├── src/
│   ├── api.py                    # Flask API with Power Predictor endpoints
│   ├── models/
│   │   ├── power_predictor.py    # Power level prediction model
│   │   └── role_predictor.py     # Character role prediction model
│   ├── preprocessing/
│   ├── models/
│   ├── visualization/
│   └── utils/
├── react-app/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── public/
├── tests/
├── .gitignore
├── requirements.txt
├── setup.py
├── CHANGELOG.md
└── README.md
```

## ⚙️ Setup Instructions

### Environment Setup

1. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

2. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - Unix/MacOS: `source venv/bin/activate`

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### For Data Science Notebook:

```bash
jupyter notebook notebooks/marvel_analysis.ipynb
```

### For React App:

```bash
cd react-app
npm install
npm start
```

## 🌍 Features in React App

Includes:
- **Character Explorer** – Search and filter characters by name, role, affiliation
- **Role Predictor** – Paste powers and get predicted role
- **Interactive Graph** – Shows characters connected by affiliations

## 🔮 Future Work

Planned Enhancements:
- GPT-assisted Power Level prediction
- Integrate Marvel API for character images
- Gamify the UI to let users guess character roles from powers
- Add community voting & leaderboard

## 📢 Acknowledgements

Marvel character data compiled for academic & visualization purposes.
Inspired by Marvel fans & open-source data exploration.

## 👨‍💻 Author

Made with 💥 by Akai

## 📝 License

This is a fan project. All character rights belong to Marvel and respective owners.