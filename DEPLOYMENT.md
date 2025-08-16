# PowerVerse Deployment Guide

## GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Prerequisites

1. **GitHub Repository**: Ensure your code is pushed to a GitHub repository
2. **GitHub Pages**: Enable GitHub Pages in your repository settings
3. **Node.js**: Version 18 or higher for local development

### Automatic Deployment Setup

1. **Push to Main Branch**: The deployment workflow triggers automatically when you push to the `main` or `master` branch

2. **GitHub Actions**: The workflow file `.github/workflows/deploy.yml` handles:
   - Installing Node.js dependencies
   - Building the React application
   - Deploying to GitHub Pages

3. **Repository Settings**:
   - Go to your repository Settings → Pages
   - Set Source to "GitHub Actions"
   - The site will be available at: `https://[username].github.io/PowerVerse---Explore-the-Marvel-power-universe`

### Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
# Navigate to react-app directory
cd react-app

# Install gh-pages if not already installed
npm install --save-dev gh-pages

# Deploy to GitHub Pages
npm run deploy
```

### Configuration Files

- **package.json**: Contains deployment scripts and homepage URL
- **404.html**: Handles client-side routing for single-page application
- **index.html**: Updated with GitHub Pages SPA routing support
- **.github/workflows/deploy.yml**: GitHub Actions workflow for automated deployment

### Important Notes

1. **Homepage URL**: Update the `homepage` field in `package.json` with your actual GitHub username:
   ```json
   "homepage": "https://[YOUR_USERNAME].github.io/PowerVerse---Explore-the-Marvel-power-universe"
   ```

2. **Backend API**: The current setup deploys only the frontend. For a fully functional application, you'll need to:
   - Deploy the backend API to a service like Heroku, Vercel, or Railway
   - Update the API endpoints in the React app to point to your deployed backend

3. **Environment Variables**: If using environment variables, add them to your GitHub repository secrets

### Troubleshooting

- **Build Failures**: Check the Actions tab in your GitHub repository for detailed error logs
- **404 Errors**: Ensure the 404.html file is properly configured for SPA routing
- **Blank Page**: Verify the homepage URL in package.json matches your GitHub Pages URL

### Local Development

```bash
# Start the React development server
cd react-app
npm start

# Start the backend API (in a separate terminal)
cd ..
python src/api.py
```

The application will be available at `http://localhost:3000` with the API running on `http://localhost:8000`.