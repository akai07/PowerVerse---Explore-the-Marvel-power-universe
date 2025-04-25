@echo off
echo Setting up PowerVerse project environment...

echo Creating virtual environment...
python -m venv venv

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing dependencies...
pip install -r requirements.txt

echo Setting up spaCy language model...
python -m spacy download en_core_web_sm

echo Environment setup complete!
echo.
echo To activate the environment in the future, run: venv\Scripts\activate.bat
echo To start the Jupyter notebook, run: jupyter notebook notebooks\marvel_analysis.ipynb
echo To set up the React app, navigate to react-app directory and run: npm install
echo.
echo Enjoy exploring the Marvel Universe!
pause