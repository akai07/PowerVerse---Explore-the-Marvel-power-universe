import networkx as nx
import matplotlib.pyplot as plt
import pandas as pd
import json
import os

class MarvelNetworkVisualizer:
    """
    Class for creating and visualizing network graphs of Marvel characters
    based on their affiliations and other relationships.
    """
    
    def __init__(self, df=None):
        """
        Initialize the network visualizer.
        
        Parameters:
        -----------
        df : pandas.DataFrame, optional
            DataFrame containing Marvel character data
        """
        self.df = df
        self.graph = nx.Graph()
        self.pos = None  # Node positions for visualization
    
    def load_data(self, df):
        """
        Load data from a pandas DataFrame.
        
        Parameters:
        -----------
        df : pandas.DataFrame
            DataFrame containing Marvel character data
        """
        self.df = df
        return self
    
    def create_affiliation_network(self):
        """
        Create a network graph where characters are connected if they
        share the same affiliation.
        """
        if self.df is None:
            raise ValueError("No data loaded. Please load data first.")
        
        # Clear existing graph
        self.graph.clear()
        
        # Add nodes (characters)
        for idx, row in self.df.iterrows():
            self.graph.add_node(
                row['Character'],
                role=row['Role'],
                affiliation=row['Affiliation'],
                power_level=row.get('Estimated_Power_Level', row.get('Power Level', 'Low'))
            )
        
        # Add edges (shared affiliations)
        affiliations = self.df['Affiliation'].unique()
        for affiliation in affiliations:
            chars_in_affiliation = self.df[self.df['Affiliation'] == affiliation]['Character'].tolist()
            for i in range(len(chars_in_affiliation)):
                for j in range(i+1, len(chars_in_affiliation)):
                    self.graph.add_edge(
                        chars_in_affiliation[i],
                        chars_in_affiliation[j],
                        affiliation=affiliation
                    )
        
        # Calculate node positions for visualization
        self.pos = nx.spring_layout(self.graph, seed=42)
        
        return self
    
    def visualize_network(self, figsize=(16, 12), save_path=None):
        """
        Visualize the character network.
        
        Parameters:
        -----------
        figsize : tuple, default=(16, 12)
            Figure size (width, height) in inches
        save_path : str, optional
            Path to save the visualization image
        """
        if len(self.graph.nodes) == 0:
            raise ValueError("Graph is empty. Create a network first.")
        
        # Create figure
        plt.figure(figsize=figsize)
        
        # Set node colors based on role
        role_colors = {'Hero': 'blue', 'Villain': 'red', 'Antihero': 'purple'}
        node_colors = [role_colors.get(self.graph.nodes[node]['role'], 'gray') for node in self.graph.nodes]
        
        # Set node sizes based on degree (number of connections)
        node_sizes = [300 * (1 + self.graph.degree(node)) for node in self.graph.nodes]
        
        # Draw the network
        nx.draw_networkx_nodes(self.graph, self.pos, node_color=node_colors, node_size=node_sizes, alpha=0.8)
        nx.draw_networkx_edges(self.graph, self.pos, width=1.0, alpha=0.5)
        nx.draw_networkx_labels(self.graph, self.pos, font_size=10, font_weight='bold')
        
        # Add a legend
        import matplotlib.patches as mpatches
        legend_patches = [mpatches.Patch(color=color, label=role) for role, color in role_colors.items()]
        plt.legend(handles=legend_patches, title='Character Role')
        
        plt.title('Marvel Character Affiliation Network', fontsize=20)
        plt.axis('off')
        plt.tight_layout()
        
        # Save the figure if a path is provided
        if save_path:
            plt.savefig(save_path, dpi=300, bbox_inches='tight')
            print(f"Network visualization saved to {save_path}")
        
        plt.show()
        
        return self
    
    def export_network_data(self, output_path):
        """
        Export network data as JSON for visualization in the React app.
        
        Parameters:
        -----------
        output_path : str
            Path to save the network data JSON file
        """
        if len(self.graph.nodes) == 0:
            raise ValueError("Graph is empty. Create a network first.")
        
        # Prepare nodes data
        nodes_data = []
        for node in self.graph.nodes():
            nodes_data.append({
                'id': node,
                'role': self.graph.nodes[node]['role'],
                'affiliation': self.graph.nodes[node]['affiliation'],
                'power_level': self.graph.nodes[node]['power_level']
            })
        
        # Prepare edges data
        edges_data = []
        for source, target, data in self.graph.edges(data=True):
            edges_data.append({
                'source': source,
                'target': target,
                'affiliation': data['affiliation']
            })
        
        # Create network data dictionary
        network_data = {
            'nodes': nodes_data,
            'links': edges_data
        }
        
        # Create directory if it doesn't exist
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        # Save to JSON
        with open(output_path, 'w') as f:
            json.dump(network_data, f, indent=2)
        
        print(f"Network data exported to {output_path}")
        
        return self
    
    def get_graph(self):
        """
        Return the NetworkX graph object.
        """
        return self.graph
    
    def get_character_connections(self, character_name):
        """
        Get all characters connected to a specific character.
        
        Parameters:
        -----------
        character_name : str
            Name of the character to find connections for
        
        Returns:
        --------
        list
            List of connected character names
        """
        if character_name not in self.graph.nodes:
            raise ValueError(f"Character '{character_name}' not found in the graph.")
        
        return list(self.graph.neighbors(character_name))
    
    def get_most_connected_characters(self, top_n=10):
        """
        Get the most connected characters in the network.
        
        Parameters:
        -----------
        top_n : int, default=10
            Number of top characters to return
        
        Returns:
        --------
        list
            List of tuples (character_name, connection_count)
        """
        if len(self.graph.nodes) == 0:
            raise ValueError("Graph is empty. Create a network first.")
        
        # Get degree (connection count) for each character
        degree_dict = dict(self.graph.degree())
        
        # Sort by degree (descending) and get top N
        sorted_characters = sorted(degree_dict.items(), key=lambda x: x[1], reverse=True)[:top_n]
        
        return sorted_characters