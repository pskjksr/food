"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // For retrieving URL parameters
import Image from "next/image";

interface Recipe {
  id: number;
  name: string;
  image?: string;
  description?: string;
  ingredients?: string[];
}

const RecipeDescription = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); // Get 'id' from URL parameters
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

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
        const response = await fetch(`${API_URL}/${id}`); // Use `id` to fetch the recipe
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
  }, [id, API_URL]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  if (!recipe) return <div className="text-center text-gray-500">No Recipe Found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{recipe.name}</h1>
      <Image
        src={recipe.image || "/fallback-image.jpg"}
        alt={recipe.name}
        width={384}
        height={384}
        className="object-cover rounded-lg mt-4"
        onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
      />
      <p className="mt-4 text-gray-700">{recipe.description || "No description available."}</p>

      {recipe.ingredients?.length && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Ingredients</h2>
          <ul className="list-disc list-inside mt-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RecipeDescription;
