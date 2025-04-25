@echo off
set PYTHON_VERSION=3.10

:: Check if Python 3.10 is installed
where python3.10 >nul 2>nul
if %errorlevel% neq 0 (
    echo Python 3.10 is not installed. Please install it first.
    exit /b
)

:: Set up virtual environment with Python 3.10
python3.10 -m venv venv

:: Activate virtual environment
call venv\Scripts\activate.bat

:: Install dependencies
python -m pip install --upgrade pip setuptools wheel
pip install --prefer-binary -r requirements.txt

:: Set up spaCy language model
python -m spacy download en_core_web_sm

:: Environment setup complete!
echo Install Microsoft Visual C++ Build Tools from:
echo https://visualstudio.microsoft.com/visual-cpp-build-tools/
echo Then restart this setup script after installation
echo.
echo To activate the environment in the future, run: venv\Scripts\activate.bat
echo To start the Jupyter notebook, run: jupyter notebook notebooks\marvel_analysis.ipynb
echo To set up the React app, navigate to react-app directory and run: npm install
echo.
echo Enjoy exploring the Marvel Universe!
pause