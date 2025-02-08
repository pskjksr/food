"use client";
import React, { useEffect, useState } from 'react';

// Define the structure of the Like object
interface Like {
  id: number;
  recipeId: number;
  recipeName: string;
  // Add any other fields you may want to show
}

const LikePage = () => {
  const [likes, setLikes] = useState<Like[]>([]); // Holds the list of liked recipes
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch liked recipes on page load
  useEffect(() => {
    async function fetchLikes() {
      try {
        const response = await fetch('/api/like'); // Fetch liked recipes from API
        if (!response.ok) throw new Error('Failed to fetch likes');
        const result: Like[] = await response.json();
        setLikes(result); // Store liked recipes in the state
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message); // Set error message if fetching fails
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false); // Turn off loading state
      }
    }

    fetchLikes(); // Call the fetch function
  }, []);

  // Show loading or error state
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="p-4">
      <h2>Your Liked Recipes</h2>
      <div className="recipe-list">
        {likes.length > 0 ? (
          likes.map((like) => (
            <div key={like.id} className="recipe-card bg-gray-100 rounded-lg shadow-md p-4 mb-4">
              <h3 className="font-semibold text-lg">{like.recipeName}</h3>
              <p>Recipe ID: {like.recipeId}</p>
              {/* Add other details about the liked recipe if necessary */}
            </div>
          ))
        ) : (
          <p>No liked recipes found</p>
        )}
      </div>
    </div>
  );
};

export default LikePage;
