import os
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from wordcloud import WordCloud

def ensure_dir(directory):
    """
    Create directory if it doesn't exist.
    
    Parameters:
    -----------
    directory : str
        Directory path to create
    """
    if not os.path.exists(directory):
        os.makedirs(directory)

def load_marvel_data(data_path):
    """
    Load Marvel character data from CSV file.
    
    Parameters:
    -----------
    data_path : str
        Path to the CSV file
    
    Returns:
    --------
    pandas.DataFrame
        DataFrame containing Marvel character data
    """
    return pd.read_csv(data_path)

def create_power_wordcloud(powers_text, width=800, height=400, background_color='white', 
                          max_words=100, contour_width=3, contour_color='steelblue',
                          save_path=None):
    """
    Create a word cloud visualization of character powers.
    
    Parameters:
    -----------
    powers_text : str
        Text containing all powers to visualize
    width : int, default=800
        Width of the word cloud image
    height : int, default=400
        Height of the word cloud image
    background_color : str, default='white'
        Background color of the word cloud
    max_words : int, default=100
        Maximum number of words to include
    contour_width : int, default=3
        Width of the contour line
    contour_color : str, default='steelblue'
        Color of the contour line
    save_path : str, optional
        Path to save the word cloud image
    
    Returns:
    --------
    WordCloud
        Generated word cloud object
    """
    wordcloud = WordCloud(
        width=width, 
        height=height, 
        background_color=background_color, 
        max_words=max_words, 
        contour_width=contour_width, 
        contour_color=contour_color
    ).generate(powers_text)
    
    plt.figure(figsize=(width/100, height/100))
    plt.imshow(wordcloud, interpolation='bilinear')
    plt.axis('off')
    plt.title('Word Cloud of Marvel Character Powers', fontsize=20)
    
    if save_path:
        plt.savefig(save_path, dpi=300, bbox_inches='tight')
        print(f"Word cloud saved to {save_path}")
    
    plt.show()
    
    return wordcloud

def plot_role_distribution(df, figsize=(10, 6), save_path=None):
    """
    Plot the distribution of character roles.
    
    Parameters:
    -----------
    df : pandas.DataFrame
        DataFrame containing Marvel character data
    figsize : tuple, default=(10, 6)
        Figure size (width, height) in inches
    save_path : str, optional
        Path to save the plot image
    """
    plt.figure(figsize=figsize)
    role_counts = df['Role'].value_counts()
    
    # Bar plot
    sns.barplot(x=role_counts.index, y=role_counts.values)
    plt.title('Distribution of Character Roles', fontsize=16)
    plt.xlabel('Role')
    plt.ylabel('Count')
    plt.xticks(rotation=0)
    
    if save_path:
        plt.savefig(save_path, dpi=300, bbox_inches='tight')
        print(f"Role distribution plot saved to {save_path}")
    
    plt.show()
    
    # Pie chart
    plt.figure(figsize=(8, 8))
    plt.pie(
        role_counts, 
        labels=role_counts.index, 
        autopct='%1.1f%%', 
        startangle=90, 
        colors=sns.color_palette('viridis', len(role_counts))
    )
    plt.title('Proportion of Character Roles', fontsize=16)
    plt.axis('equal')
    
    if save_path:
        pie_save_path = save_path.replace('.', '_pie.')
        plt.savefig(pie_save_path, dpi=300, bbox_inches='tight')
        print(f"Role pie chart saved to {pie_save_path}")
    
    plt.show()

def plot_affiliation_distribution(df, top_n=10, figsize=(12, 8), save_path=None):
    """
    Plot the distribution of character affiliations.
    
    Parameters:
    -----------
    df : pandas.DataFrame
        DataFrame containing Marvel character data
    top_n : int, default=10
        Number of top affiliations to show
    figsize : tuple, default=(12, 8)
        Figure size (width, height) in inches
    save_path : str, optional
        Path to save the plot image
    """
    plt.figure(figsize=figsize)
    affiliation_counts = df['Affiliation'].value_counts().head(top_n)
    
    sns.barplot(x=affiliation_counts.values, y=affiliation_counts.index)
    plt.title(f'Top {top_n} Character Affiliations', fontsize=16)
    plt.xlabel('Count')
    plt.ylabel('Affiliation')
    
    if save_path:
        plt.savefig(save_path, dpi=300, bbox_inches='tight')
        print(f"Affiliation distribution plot saved to {save_path}")
    
    plt.show()

def plot_power_level_distribution(df, figsize=(10, 6), save_path=None):
    """
    Plot the distribution of character power levels.
    
    Parameters:
    -----------
    df : pandas.DataFrame
        DataFrame containing Marvel character data with power levels
    figsize : tuple, default=(10, 6)
        Figure size (width, height) in inches
    save_path : str, optional
        Path to save the plot image
    """
    power_level_col = 'Estimated_Power_Level' if 'Estimated_Power_Level' in df.columns else 'Power Level'
    
    plt.figure(figsize=figsize)
    power_level_counts = df[power_level_col].value_counts().sort_index()
    
    sns.barplot(x=power_level_counts.index, y=power_level_counts.values, palette='viridis')
    plt.title('Distribution of Character Power Levels', fontsize=16)
    plt.xlabel('Power Level')
    plt.ylabel('Count')
    
    if save_path:
        plt.savefig(save_path, dpi=300, bbox_inches='tight')
        print(f"Power level distribution plot saved to {save_path}")
    
    plt.show()
    
    # Compare power levels across roles
    plt.figure(figsize=(12, 8))
    role_power_counts = pd.crosstab(df['Role'], df[power_level_col])
    role_power_counts.plot(kind='bar', stacked=True, colormap='viridis')
    plt.title('Power Level Distribution by Role', fontsize=16)
    plt.xlabel('Role')
    plt.ylabel('Count')
    plt.legend(title='Power Level')
    
    if save_path:
        role_power_save_path = save_path.replace('.', '_by_role.')
        plt.savefig(role_power_save_path, dpi=300, bbox_inches='tight')
        print(f"Power level by role plot saved to {role_power_save_path}")
    
    plt.show()