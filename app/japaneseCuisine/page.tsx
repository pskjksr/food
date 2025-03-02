"use client";
import { useState, useEffect } from "react";
import JapaneseRecipes from "../components/japaneseRecipes";

interface Recipe {
  id: number;
  title: string;
  ingredients: string[];
  instructions: string;
  image: string;
}

export default function Page() {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // Fetch random recipes from API
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("/api/recipes");
        if (!response.ok) {
          throw new Error(`Failed to fetch recipes. Status: ${response.status}`);
        }

        const contentType = response.headers.get("Content-Type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }

        const data: Recipe[] = await response.json();
        const shuffledRecipes = data.sort(() => 0.5 - Math.random()).slice(0, 4);
        setRecipes(shuffledRecipes);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section id="recipe-section" className="recipe-section">
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700 ml-5">
          Japanese Cuisine
        </h2>
      </div>
      <div className="px-5">
        <JapaneseRecipes  />
      </div>
    </section>
  );
}
