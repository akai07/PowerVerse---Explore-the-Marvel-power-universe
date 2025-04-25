# 🦸‍♂️ PowerVerse: Marvel Universe Analysis

This project dives into a dataset of Marvel characters to explore their powers, roles, and affiliations using Data Science techniques like NLP, clustering, classification, and network analysis. Additionally, a React-based interactive frontend helps users visualize and interact with the Marvel character universe.

## 📦 Dataset Overview

The dataset contains information about 45 Marvel characters with the following columns:

- **Character**: Marvel character name (e.g., Iron Man)
- **Real Name**: True identity (e.g., Tony Stark)
- **Affiliation**: Group/Team (e.g., Avengers, X-Men)
- **Powers**: List of powers in string format
- **Role**: Hero, Villain, or Anti-Hero
- **Power Level**: Initially all 'Low', augmented through analysis

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
│   └── marvel_characters_dataset.csv
├── notebooks/
│   └── marvel_analysis.ipynb
├── src/
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