"use client"; // Add this line at the top

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Recipe {
  id: number;
  name: string;
  image?: string;
  ingredientDetails?: string | string[];  // Can be either a string or an array of strings
  instructions?: string;
}

const RecipeDescription = () => {
  const params = useParams();
  const id = String(params?.id); // Ensure params.id is a string
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"; // Ensure API URL is correct

  useEffect(() => {
    if (!id) {
      console.log("No ID found in the URL");
      setLoading(false);
      return;
    }

    console.log("Fetching recipe for ID:", id);

    async function fetchRecipe() {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/recipes/${id}`);
        if (!response.ok) throw new Error("Recipe not found");

        const data: Recipe = await response.json();
        setRecipe(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchRecipe();
  }, [API_URL, id]);

  if (loading) return <div className="flex justify-center items-center"><span>Loading...</span></div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!recipe) return <div className="text-center text-gray-500">No Recipe Found</div>;

  // Ensure ingredientDetails is an array
  let ingredientDetails: string[] = [];
  if (typeof recipe.ingredientDetails === 'string') {
    ingredientDetails = recipe.ingredientDetails.split(',').map((ingredient) => ingredient.trim());
  } else if (Array.isArray(recipe.ingredientDetails)) {
    ingredientDetails = recipe.ingredientDetails;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{recipe.name}</h1>
      <img
                src={recipe.image ? `${API_URL}/${recipe.image}` : "/fallback-image.jpg"}
                alt={recipe.name || "Recipe Image"}
                className="w-40 h-40 object-cover rounded-md"
                onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
              />

      {ingredientDetails.length > 0 ? (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Ingredients</h2>
          <ul className="list-disc list-inside mt-2">
            {ingredientDetails.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mt-6">No ingredientDetails available.</div> // Show when no ingredients available
      )}

      {recipe.instructions ? (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Instructions</h2>
          <ol className="list-decimal list-inside mt-2">
            {recipe.instructions
              .split("\n") // Split instructions by newline
              .map((instruction, index) => (
                <li key={index}>{instruction.trim()}</li>
              ))}
          </ol>
        </div>
      ) : (
        <div className="mt-6">No instructions available.</div>
      )}
    </div>
  );
};

export default RecipeDescription;
