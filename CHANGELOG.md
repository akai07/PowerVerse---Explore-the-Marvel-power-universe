# Changelog

All notable changes to the PowerVerse project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- Set up Flask backend API (`src/api.py`) to serve character data from CSV.
- Added Flask and Flask-CORS to `requirements.txt`.
- Modified frontend (`react-app/src/pages/ExplorerPage.jsx`) to fetch data from the backend API using axios.
### Added
- Added initial content and structure to `HomePage.jsx` including welcome text and mini-game placeholder.
- Added initial content and structure to `ExplorerPage.jsx` including title and placeholder for character list.
- Restructured React app into separate pages (Home, Explorer, Predictor, Network).
- Implemented routing using `react-router-dom`.
- Created a reusable `Navbar` component.
- Applied a modern sci-fi theme using CSS variables, new fonts, and color schemes.

### Changed
- Rewrote `App.jsx` to manage routing and page structure.
- Updated `index.css` and `App.css` with new sci-fi styles.

### Added
- Placeholder image added to Home page.
- Sci-fi theme styling applied (fonts, colors, background).
- Initial project structure setup
- README.md with project documentation
- Data science notebook for Marvel character analysis
- Virtual environment setup with requirements.txt
- Setup.py for package installation
- .gitignore file for version control
- CHANGELOG.md for tracking project changes
- Gamified UI: Added a Mini-Game component for predicting Marvel characters by their powers on the Home page

### Changed
- Updated CSS styles in `react-app/src/index.css` and `react-app/src/App.css` for a consistent sci-fi theme.

### To Do
- Implement React frontend components
- Create preprocessing modules for character data
- Develop visualization utilities
- Build role prediction model
- Set up network analysis visualization