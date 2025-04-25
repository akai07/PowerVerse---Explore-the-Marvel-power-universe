from setuptools import setup, find_packages

setup(
    name="powerverse",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "numpy",
        "pandas",
        "scikit-learn",
        "matplotlib",
        "seaborn",
        "networkx",
        "wordcloud",
        "plotly",
        "jupyter",
        "spacy",
    ],
    author="Akai",
    author_email="akai@example.com",
    description="Marvel Universe character analysis and visualization",
    keywords="marvel, data science, visualization",
    python_requires=">=3.8",
)