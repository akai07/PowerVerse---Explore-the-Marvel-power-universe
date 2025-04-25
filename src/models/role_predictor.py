import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import classification_report, confusion_matrix
import joblib
import os

class RolePredictor:
    """
    Model for predicting Marvel character roles based on their powers.
    Uses TF-IDF vectorized powers to classify characters as Hero, Villain, or Antihero.
    """
    
    def __init__(self, n_estimators=100, random_state=42):
        """
        Initialize the role predictor model.
        
        Parameters:
        -----------
        n_estimators : int, default=100
            Number of trees in the random forest
        random_state : int, default=42
            Random seed for reproducibility
        """
        self.model = RandomForestClassifier(
            n_estimators=n_estimators,
            random_state=random_state
        )
        self.classes_ = None
        self.tfidf_vectorizer = None
    
    def train(self, X, y, test_size=0.3, random_state=42):
        """
        Train the role prediction model.
        
        Parameters:
        -----------
        X : scipy.sparse matrix or numpy.ndarray
            TF-IDF matrix of character powers
        y : array-like
            Target role labels (Hero, Villain, Antihero)
        test_size : float, default=0.3
            Proportion of data to use for testing
        random_state : int, default=42
            Random seed for train-test split
        
        Returns:
        --------
        dict
            Dictionary containing evaluation metrics
        """
        # Split the data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=test_size, random_state=random_state, stratify=y
        )
        
        # Train the model
        self.model.fit(X_train, y_train)
        self.classes_ = self.model.classes_
        
        # Evaluate the model
        y_pred = self.model.predict(X_test)
        report = classification_report(y_test, y_pred, output_dict=True)
        
        # Cross-validation
        cv_scores = cross_val_score(self.model, X, y, cv=5)
        
        # Return evaluation metrics
        return {
            'classification_report': report,
            'confusion_matrix': confusion_matrix(y_test, y_pred),
            'cv_scores': cv_scores,
            'cv_mean': np.mean(cv_scores),
            'cv_std': np.std(cv_scores)
        }
    
    def predict(self, X):
        """
        Predict roles for new character powers.
        
        Parameters:
        -----------
        X : scipy.sparse matrix or numpy.ndarray
            TF-IDF matrix of character powers
        
        Returns:
        --------
        numpy.ndarray
            Predicted role labels
        """
        return self.model.predict(X)
    
    def predict_proba(self, X):
        """
        Predict role probabilities for new character powers.
        
        Parameters:
        -----------
        X : scipy.sparse matrix or numpy.ndarray
            TF-IDF matrix of character powers
        
        Returns:
        --------
        numpy.ndarray
            Predicted role probabilities
        """
        return self.model.predict_proba(X)
    
    def predict_role_from_text(self, powers_text, tfidf_vectorizer):
        """
        Predict role from raw powers text.
        
        Parameters:
        -----------
        powers_text : str
            Text description of character powers
        tfidf_vectorizer : TfidfVectorizer
            Fitted TF-IDF vectorizer for transforming text
        
        Returns:
        --------
        tuple
            (predicted_role, probabilities_dict)
        """
        # Transform the input text
        powers_vector = tfidf_vectorizer.transform([powers_text])
        
        # Make prediction
        predicted_role = self.predict(powers_vector)[0]
        probabilities = self.predict_proba(powers_vector)[0]
        
        # Get probability for each class
        proba_dict = {role: prob for role, prob in zip(self.classes_, probabilities)}
        
        return predicted_role, proba_dict
    
    def save_model(self, model_path, vectorizer=None):
        """
        Save the trained model and vectorizer to disk.
        
        Parameters:
        -----------
        model_path : str
            Path to save the model
        vectorizer : TfidfVectorizer, optional
            TF-IDF vectorizer to save alongside the model
        """
        # Create directory if it doesn't exist
        os.makedirs(os.path.dirname(model_path), exist_ok=True)
        
        # Save the model
        joblib.dump(self.model, model_path)
        
        # Save the vectorizer if provided
        if vectorizer is not None:
            self.tfidf_vectorizer = vectorizer
            vectorizer_path = os.path.join(
                os.path.dirname(model_path),
                'tfidf_vectorizer.joblib'
            )
            joblib.dump(vectorizer, vectorizer_path)
        
        print(f"Model saved to {model_path}")
    
    @classmethod
    def load_model(cls, model_path, vectorizer_path=None):
        """
        Load a trained model and vectorizer from disk.
        
        Parameters:
        -----------
        model_path : str
            Path to the saved model
        vectorizer_path : str, optional
            Path to the saved vectorizer
        
        Returns:
        --------
        RolePredictor
            Loaded role predictor instance
        """
        # Create a new instance
        predictor = cls()
        
        # Load the model
        predictor.model = joblib.load(model_path)
        predictor.classes_ = predictor.model.classes_
        
        # Load the vectorizer if path provided
        if vectorizer_path is not None:
            predictor.tfidf_vectorizer = joblib.load(vectorizer_path)
        
        return predictor