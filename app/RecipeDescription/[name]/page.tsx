"use client"; // ใช้ client-side component

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Recipe {
  id: number;
  name: string;
  image?: string;
  ingredientDetails?: string | string[];
  instructions?: string;
}

const RecipeDescription = () => {
  const params = useParams();  // ใช้ useParams เพื่อดึงค่า params จาก URL
  const name = String(params?.name);  // ดึงค่า name จาก URL params

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Ensure API URL is correct

  useEffect(() => {
    if (!name) {
      console.log("No recipe name found in the URL");
      setLoading(false);
      return;
    }

    console.log("Fetching recipe for name:", name);

    async function fetchRecipe() {
      try {
        setLoading(true);
        const response = await fetch(`/api/recipes/${name}`);
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
  }, [name]);

  if (loading) return <div className="flex justify-center items-center"><span>Loading...</span></div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!recipe) return <div className="text-center text-gray-500">No Recipe Found</div>;

  let ingredientDetails: string[] = [];
  if (typeof recipe.ingredientDetails === 'string') {
    ingredientDetails = recipe.ingredientDetails.split(',').map((ingredient) => ingredient.trim());
  } else if (Array.isArray(recipe.ingredientDetails)) {
    ingredientDetails = recipe.ingredientDetails;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{recipe.name}</h1>

      {/* ใช้ flex สำหรับจัด Layout */}
      <div className="flex justify-between mt-6">
        {/* ส่วนของ Ingredients */}
        <div className="w-1/3 ml-10 mt-10">
          <h2 className="text-2xl font-semibold">Ingredients</h2>
          {ingredientDetails.length > 0 ? (
            <ol className="list-decimal list-inside mt-2"> {/* ใช้ ol และ list-decimal สำหรับแสดงหมายเลข */}
              {ingredientDetails.map((ingredient, index) => (
                <li key={index} className="mb-2">
                  {ingredient}
                </li>
              ))}
            </ol>
          ) : (
            <div>No ingredients available.</div>
          )}
        </div>

        {/* ส่วนของรูปภาพ */}
        <div className="w-1/3 flex justify-center items-center">
          <div className="bg-yellow-400 p-4 rounded-full">
            <img
              src={recipe.image ? `/${recipe.image}` : "/fallback-image.jpg"}
              alt={recipe.name || "Recipe Image"}
              className="w-80 h-80 object-cover rounded-full"
              onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
            />
          </div>
        </div>

        {/* ส่วนของ Instructions */}
        <div className="w-1/3 ml-10 mt-10">
          <h2 className="text-2xl font-semibold">Instructions</h2>
          {recipe.instructions ? (
            <ol className="list-decimal list-inside mt-2">
              {recipe.instructions.split("\n").map((instruction, index) => (
                <li key={index}>{instruction.trim()}</li>
              ))}
            </ol>
          ) : (
            <div>No instructions available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDescription;
