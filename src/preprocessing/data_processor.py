import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
import re

class MarvelDataProcessor:
    """
    Class for preprocessing Marvel character data.
    Handles data cleaning, feature extraction, and preparation for analysis.
    """
    
    def __init__(self, data_path=None, df=None):
        """
        Initialize the data processor.
        
        Parameters:
        -----------
        data_path : str, optional
            Path to the CSV file containing Marvel character data
        df : pandas.DataFrame, optional
            DataFrame containing Marvel character data
        """
        if df is not None:
            self.df = df.copy()
        elif data_path is not None:
            self.df = pd.read_csv(data_path)
        else:
            self.df = None
        
        self.tfidf_vectorizer = None
        self.powers_tfidf = None
        self.feature_names = None
    
    def load_data(self, data_path):
        """
        Load data from a CSV file.
        
        Parameters:
        -----------
        data_path : str
            Path to the CSV file
        """
        self.df = pd.read_csv(data_path)
        return self
    
    def clean_data(self):
        """
        Clean the Marvel character data.
        - Standardize character names
        - Handle duplicates
        - Standardize role categories
        """
        if self.df is None:
            raise ValueError("No data loaded. Please load data first.")
        
        # Convert character names to title case for consistency
        self.df['Character'] = self.df['Character'].str.title()
        
        # Check for and remove duplicates
        duplicates = self.df[self.df.duplicated('Character')]
        if len(duplicates) > 0:
            print(f"Removed {len(duplicates)} duplicate characters.")
            self.df = self.df.drop_duplicates('Character')
        
        # Standardize role categories
        self.df['Role'] = self.df['Role'].str.title()
        
        return self
    
    def vectorize_powers(self, min_df=2):
        """
        Vectorize character powers using TF-IDF.
        
        Parameters:
        -----------
        min_df : int, default=2
            Minimum document frequency for TF-IDF
        """
        if self.df is None:
            raise ValueError("No data loaded. Please load data first.")
        
        # Fill NaN values in Powers column
        powers = self.df['Powers'].fillna('')
        
        # Create and fit TF-IDF vectorizer
        self.tfidf_vectorizer = TfidfVectorizer(stop_words='english', min_df=min_df)
        self.powers_tfidf = self.tfidf_vectorizer.fit_transform(powers)
        self.feature_names = self.tfidf_vectorizer.get_feature_names_out()
        
        return self
    
    def estimate_power_levels(self):
        """
        Estimate character power levels based on their powers.
        Adds an 'Estimated_Power_Level' column to the dataframe.
        """
        if self.df is None:
            raise ValueError("No data loaded. Please load data first.")
        
        # Define power keywords for each level
        high_power_keywords = ['cosmic', 'reality', 'god', 'manipulation', 'telekinesis', 'magic', 'energy projection']
        medium_power_keywords = ['superhuman strength', 'regeneration', 'flight', 'enhanced', 'super', 'control']
        
        def estimate_level(powers_text):
            if pd.isna(powers_text):
                return 'Low'
                
            powers_lower = powers_text.lower()
            
            # Check for high power keywords
            for keyword in high_power_keywords:
                if keyword in powers_lower:
                    return 'High'
            
            # Check for medium power keywords
            for keyword in medium_power_keywords:
                if keyword in powers_lower:
                    return 'Medium'
            
            # Default to low
            return 'Low'
        
        self.df['Estimated_Power_Level'] = self.df['Powers'].apply(estimate_level)
        
        return self
    
    def get_processed_data(self):
        """
        Return the processed dataframe.
        """
        return self.df
    
    def get_tfidf_matrix(self):
        """
        Return the TF-IDF matrix of character powers.
        """
        return self.powers_tfidf
    
    def get_feature_names(self):
        """
        Return the feature names from TF-IDF vectorization.
        """
        return self.feature_names
    
    def save_processed_data(self, output_path):
        """
        Save the processed dataframe to a CSV file.
        
        Parameters:
        -----------
        output_path : str
            Path to save the processed data
        """
        if self.df is None:
            raise ValueError("No data loaded. Please load data first.")
        
        self.df.to_csv(output_path, index=False)
        print(f"Processed data saved to {output_path}")
        
        return self