import pandas as pd
import numpy as np
import joblib
import os
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import mean_squared_error, r2_score

class PowerPredictor:
    """
    Model for predicting Marvel character power levels based on their attributes.
    Uses a Random Forest Regressor to estimate power levels on a scale of 1-10.
    """
    
    def __init__(self, n_estimators=100, random_state=42):
        """
        Initialize the power predictor model.
        
        Parameters:
        -----------
        n_estimators : int, default=100
            Number of trees in the random forest
        random_state : int, default=42
            Random seed for reproducibility
        """
        self.model = RandomForestRegressor(
            n_estimators=n_estimators,
            random_state=random_state
        )
        self.scaler = StandardScaler()
        self.feature_names = None
    
    def preprocess_data(self, df):
        """
        Preprocess the data for power prediction.
        
        Parameters:
        -----------
        df : pandas.DataFrame
            DataFrame containing character data
            
        Returns:
        --------
        tuple
            (X, power_levels) - feature matrix and target values
        """
        # Extract features from the dataset
        # For now, we'll use a simple approach based on hero/villain status
        # and estimated power level from the data processor
        
        # Create dummy variables for hero/villain status
        hero_villain_dummies = pd.get_dummies(df['Hero/Villain'], prefix='role')
        
        # Create dummy variables for estimated power level if it exists
        if 'Estimated_Power_Level' in df.columns:
            power_level_dummies = pd.get_dummies(df['Estimated_Power_Level'], prefix='power')
            features = pd.concat([hero_villain_dummies, power_level_dummies], axis=1)
        else:
            features = hero_villain_dummies
            
        # Store feature names for later use
        self.feature_names = features.columns.tolist()
        
        # Generate synthetic power levels for training (1-10 scale)
        # In a real application, this would come from actual data
        # Here we're creating a simple heuristic based on hero/villain status
        power_levels = np.zeros(len(df))
        
        # Heroes with high power level get 8-10
        if 'power_High' in features.columns:
            high_power_heroes = (features['role_Hero'] == 1) & (features['power_High'] == 1)
            power_levels[high_power_heroes] = np.random.uniform(8, 10, size=sum(high_power_heroes))
        
        # Heroes with medium power level get 6-8
        if 'power_Medium' in features.columns:
            medium_power_heroes = (features['role_Hero'] == 1) & (features['power_Medium'] == 1)
            power_levels[medium_power_heroes] = np.random.uniform(6, 8, size=sum(medium_power_heroes))
        
        # Heroes with low power level get 4-6
        if 'power_Low' in features.columns:
            low_power_heroes = (features['role_Hero'] == 1) & (features['power_Low'] == 1)
            power_levels[low_power_heroes] = np.random.uniform(4, 6, size=sum(low_power_heroes))
        
        # Villains with high power level get 7-9
        if 'power_High' in features.columns and 'role_Villain' in features.columns:
            high_power_villains = (features['role_Villain'] == 1) & (features['power_High'] == 1)
            power_levels[high_power_villains] = np.random.uniform(7, 9, size=sum(high_power_villains))
        
        # Villains with medium power level get 5-7
        if 'power_Medium' in features.columns and 'role_Villain' in features.columns:
            medium_power_villains = (features['role_Villain'] == 1) & (features['power_Medium'] == 1)
            power_levels[medium_power_villains] = np.random.uniform(5, 7, size=sum(medium_power_villains))
        
        # Villains with low power level get 3-5
        if 'power_Low' in features.columns and 'role_Villain' in features.columns:
            low_power_villains = (features['role_Villain'] == 1) & (features['power_Low'] == 1)
            power_levels[low_power_villains] = np.random.uniform(3, 5, size=sum(low_power_villains))
        
        # Fill any remaining zeros with random values between 1-4
        zero_indices = power_levels == 0
        power_levels[zero_indices] = np.random.uniform(1, 4, size=sum(zero_indices))
        
        return features, power_levels
    
    def train(self, df, test_size=0.3, random_state=42):
        """
        Train the power prediction model.
        
        Parameters:
        -----------
        df : pandas.DataFrame
            DataFrame containing character data
        test_size : float, default=0.3
            Proportion of data to use for testing
        random_state : int, default=42
            Random seed for train-test split
        
        Returns:
        --------
        dict
            Dictionary containing evaluation metrics
        """
        # Preprocess the data
        X, y = self.preprocess_data(df)
        
        # Scale the features
        X_scaled = self.scaler.fit_transform(X)
        
        # Split the data
        X_train, X_test, y_train, y_test = train_test_split(
            X_scaled, y, test_size=test_size, random_state=random_state
        )
        
        # Train the model
        self.model.fit(X_train, y_train)
        
        # Evaluate the model
        y_pred = self.model.predict(X_test)
        mse = mean_squared_error(y_test, y_pred)
        r2 = r2_score(y_test, y_pred)
        
        # Cross-validation
        cv_scores = cross_val_score(self.model, X_scaled, y, cv=5, scoring='neg_mean_squared_error')
        cv_rmse = np.sqrt(-cv_scores.mean())
        
        # Return evaluation metrics
        return {
            'mse': mse,
            'rmse': np.sqrt(mse),
            'r2': r2,
            'cv_rmse': cv_rmse,
            'feature_importance': dict(zip(self.feature_names, self.model.feature_importances_))
        }
    
    def predict(self, df):
        """
        Predict power levels for characters.
        
        Parameters:
        -----------
        df : pandas.DataFrame
            DataFrame containing character data
        
        Returns:
        --------
        numpy.ndarray
            Predicted power levels (1-10 scale)
        """
        # Preprocess the data
        X, _ = self.preprocess_data(df)
        
        # Scale the features
        X_scaled = self.scaler.transform(X)
        
        # Make predictions
        return self.model.predict(X_scaled)
    
    def predict_power_level(self, hero_villain, estimated_power_level):
        """
        Predict power level for a single character based on attributes.
        
        Parameters:
        -----------
        hero_villain : str
            'Hero', 'Villain', or other role category
        estimated_power_level : str
            'High', 'Medium', or 'Low'
        
        Returns:
        --------
        float
            Predicted power level (1-10 scale)
        """
        # Create a DataFrame with the character attributes
        df = pd.DataFrame({
            'Hero/Villain': [hero_villain],
            'Estimated_Power_Level': [estimated_power_level]
        })
        
        # Make prediction
        return self.predict(df)[0]
    
    def save_model(self, model_path):
        """
        Save the trained model to disk.
        
        Parameters:
        -----------
        model_path : str
            Path to save the model
        """
        # Create directory if it doesn't exist
        os.makedirs(os.path.dirname(model_path), exist_ok=True)
        
        # Save the model and scaler
        joblib.dump({
            'model': self.model,
            'scaler': self.scaler,
            'feature_names': self.feature_names
        }, model_path)
        
        print(f"Model saved to {model_path}")
    
    @classmethod
    def load_model(cls, model_path):
        """
        Load a trained model from disk.
        
        Parameters:
        -----------
        model_path : str
            Path to the saved model
        
        Returns:
        --------
        PowerPredictor
            Loaded power predictor instance
        """
        # Create a new instance
        predictor = cls()
        
        # Load the model and scaler
        saved_data = joblib.load(model_path)
        predictor.model = saved_data['model']
        predictor.scaler = saved_data['scaler']
        predictor.feature_names = saved_data['feature_names']
        
        return predictor