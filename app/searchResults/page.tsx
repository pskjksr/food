"use client"; // Mark the file as a client-side component

import { useSearchParams } from "next/navigation"; 
import React, { useEffect, useState } from "react";
import Link from "next/link";

const SearchResults: React.FC = () => {
  const searchParams = useSearchParams();  
  const query = searchParams.get("ingredients"); // Get ingredients from the URL params
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const API_URL = "http://localhost:3000";  
  const [likedRecipes, setLikedRecipes] = useState<number[]>([]);

  // Function to toggle the like status for a recipe
  const toggleLike = (id: number) => {
    setLikedRecipes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      // If no ingredients are provided, do not make the API call
      if (!query) return;

      setLoading(true); // Set loading state to true
      try {
        const queryParams = `ingredients=${encodeURIComponent(query)}`; // Prepare query params
        const response = await fetch(`/api/recipes/by-ingredients?${queryParams}`);
        const data = await response.json();
        
        // Handle the case when no recipes are found
        if (data.recipes) {
          setRecipes(data.recipes); // Set recipes state with fetched data
        } else {
          setRecipes([]); // Set recipes state to an empty array if no results
        }
      } catch (error) {
        console.error("Error fetching recipes:", error); // Log any error
      } finally {
        setLoading(false); // Set loading state to false after fetching
      }
    };

    fetchRecipes();
  }, [query]); // Run this effect when `query` changes

  return (
    <section className="p-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">ผลการค้นหา</h2>

      {/* Show loading message while fetching */}
      {loading ? (
        <p>กำลังค้นหาสูตรอาหาร...</p>
      ) : (
        <>
          {/* If recipes are found, display them */}
          {recipes.length > 0 ? (
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4">
              {recipes.map((recipe, index) => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-lg shadow-md overflow-hidden text-center 
                            transition-transform duration-300 ease-in-out flex flex-col 
                            hover:shadow-lg hover:-translate-y-1 relative"
                >
                  {/* Recipe Image */}
                  <div className="flex justify-center p-3">
                    <img
                      src={recipe.image ? `${API_URL}/${recipe.image}` : "/fallback-image.jpg"}
                      alt={recipe.name || "Recipe Image"}
                      className="w-40 h-40 object-cover rounded-md"
                      onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
                    />
                  </div>

                  {/* Recipe Name & View Button */}
                  <div className="relative p-4 flex-grow">
                    <h3 className="mb-3 font-semibold text-lg">{recipe.name}</h3>
                    <Link href={`/RecipeDescription/${encodeURIComponent(recipe.name)}`}>
                      <button className="px-3 py-1.5 bg-yellow-400 text-gray-800 text-sm rounded-md hover:bg-yellow-500 transition-colors duration-300">
                        RECIPE
                      </button>
                    </Link>
                  </div>

                  {/* Like Button */}
                  <i
                    className={`fa-solid fa-heart absolute top-2 right-2 border-2 text-xs border-[#FFECC1] 
                                ${likedRecipes.includes(recipe.id) ? "text-red-500 bg-yellow-300" : "text-slate-100 bg-[#EFBD4C]"} 
                                hover:text-[#FFB100] hover:bg-[#FFECC1] hover:border-[#EFBD4C] 
                                active:bg-[#F8F8F8] rounded-full p-2 cursor-pointer`}
                    onClick={() => toggleLike(recipe.id)}
                  ></i>
                </div>
              ))}
            </div>
          ) : (
            <p>ไม่พบสูตรอาหารที่ตรงกับวัตถุดิบที่เลือก</p> // No results found message
          )}
        </>
      )}
    </section>
  );
};

export default SearchResults;
