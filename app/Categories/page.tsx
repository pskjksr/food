"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

// Define types for the recipe data
interface Recipe {
  id: number;
  name: string;
  image?: string;
  slug?: string;
}

export default function RecipeCategories() {
  const [breakfastData, setBreakfastData] = useState<Recipe[]>([]);
  const [lunchData, setLunchData] = useState<Recipe[]>([]);
  const [dinnerData, setDinnerData] = useState<Recipe[]>([]);
  const [dessertData, setDessertData] = useState<Recipe[]>([]);
  const [drinkData, setDrinkData] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Define API_URL as the base URL
  const API_URL = "http://localhost:3000";

  // Function to fetch data based on categoryId
  const fetchData = async (categoryId: number): Promise<Recipe[]> => {
    try {
      const response = await fetch(`${API_URL}/api/recipes?categoryId=${categoryId}`);
      const result = await response.json();
      return result; // Return fetched data
    } catch (error) {
      console.error("Error fetching recipes:", error);
      return []; // Return empty array in case of an error
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const breakfast = await fetchData(21);
      const lunch = await fetchData(23);
      const dinner = await fetchData(22);
      const dessert = await fetchData(24);
      const drink = await fetchData(25);

      setBreakfastData(breakfast);
      setLunchData(lunch);
      setDinnerData(dinner);
      setDessertData(dessert);
      setDrinkData(drink);

      setLoading(false); // Set loading to false after fetching data
    };

    loadData();
  }, []);

  // Render a loading message while data is being fetched
  if (loading) {
    return (
      <div className="p-4">
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-5">
          <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden text-center 
                          transition-transform duration-300 ease-in-out flex flex-col 
                          hover:shadow-lg hover:-translate-y-1 relative">
            <div className="flex justify-center p-2">
              <div className="w-40 h-40 bg-gray-300 rounded-md animate-pulse"></div>
            </div>
            <div className="relative p-4 text-center">
              <div className="mb-4 font-semibold text-lg bg-gray-300 rounded-md animate-pulse w-3/4 mx-auto"></div>
              <div className="bg-gray-300 rounded-md animate-pulse w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render recipe data after loading
  const renderCategory = (categoryData: Recipe[], categoryTitle: string) => (
    <div className="recipe-category">
      <div className="ml-5 font-semibold text-lg text-gray-700">
        <h2>{categoryTitle}</h2>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-5 p-5">
        {categoryData.slice(0, 5).map((item) => (
          <div
            key={item.id}
            className="bg-gray-100 rounded-lg shadow-md overflow-hidden text-center 
                      transition-transform duration-300 ease-in-out flex flex-col 
                      hover:shadow-lg hover:-translate-y-1 relative"
          >
            <div className="flex justify-center p-2">
              <img
                src={item.image ? `${API_URL}/${item.image}` : "/fallback-image.jpg"}
                alt={item.name || "Recipe Image"}
                className="w-40 h-40 object-cover rounded-md"
                onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
              />
            </div>
            <div className="relative p-4 text-center">
              <h3 className="mb-4 font-semibold text-lg">{item.name}</h3>
              {item.id ? (
                <Link href={`/RecipeDescription/${item.id}`}>
                  <button className="absolute right-4 bottom-1 px-4 py-2 bg-yellow-400 
                                      text-gray-800 text-sm rounded-md hover:bg-yellow-500 
                                      transition-colors duration-300">
                    RECIPE
                  </button>
                </Link>
              ) : (
                <p className="text-gray-500 text-sm">Recipe coming soon!</p>
              )}
            </div>
            <i className="fa-solid fa-heart absolute bottom-2 left-2 border-2 text-sm border-[#FFECC1] 
                          bg-[#EFBD4C] text-white hover:text-[#FFB100] hover:bg-[#FFECC1] 
                          hover:border-[#EFBD4C] active:bg-[#F8F8F8] rounded-full p-1.5 cursor-pointer"></i>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="recipe-section">
      {renderCategory(breakfastData, "Breakfast")}
      {renderCategory(lunchData, "Lunch")}
      {renderCategory(dinnerData, "Dinner")}
      {renderCategory(dessertData, "Dessert")}
      {renderCategory(drinkData, "Drink")}
    </section>
  );
}
