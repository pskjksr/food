"use client"
import { useState, useEffect } from "react";
import JapaneseRecipes from "../components/japaneseRecipes";

export default function Page() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recipes, setRecipes] = useState([]);  // เก็บข้อมูล recipes

  // Fetch random recipes from API
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/recipes"); // ตรวจสอบ URL
        if (!response.ok) {
          throw new Error(`Failed to fetch recipes. Status: ${response.status}`);
        }
        
        // ตรวจสอบว่าเนื้อหาคือ JSON
        const contentType = response.headers.get("Content-Type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }

        const data = await response.json();

        // Randomize and slice the recipes array to show 4 recipes
        const shuffledRecipes = data.sort(() => 0.5 - Math.random()).slice(0, 4);
        setRecipes(shuffledRecipes);  // เก็บข้อมูลลงใน state
      } catch (err) {
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
        <JapaneseRecipes recipes={recipes} />
      </div>
    </section>
  );
}
