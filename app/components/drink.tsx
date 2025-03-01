"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

// Define Type for Recipe
interface Recipe {
  id: number;
  name: string;
  image?: string;
}

export default function CleanEatingRecipes() {
  const { data: session, status } = useSession(); // Get session from next-auth
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [likedRecipes, setLikedRecipes] = useState<number[]>([]); // To store liked recipes
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  // Fetch recipes
  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch(`${API_URL}/api/recipes?categoryId=25`);
        if (!response.ok) throw new Error("Failed to fetch data");

        const result: Recipe[] = await response.json();
        setRecipes(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, [API_URL]);

  // Fetch liked recipes
  useEffect(() => {
    async function fetchLikedRecipes() {
      if (!session?.user?.id) {
        console.error("User is not authenticated");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/likes`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${session?.user?.token}`, // If your session has token
          },
        });

        if (response.ok) {
          const data = await response.json();
          const likedRecipeIds = data.likes.map((like: any) => like.recipeId);
          setLikedRecipes(likedRecipeIds);
        } else {
          console.error("Failed to fetch liked recipes");
        }
      } catch (err) {
        console.error("Error fetching liked recipes:", err);
      }
    }

    fetchLikedRecipes();
  }, [API_URL, session]);

  const toggleLike = async (recipeId: number) => {
    if (!session) {
      console.error("User is not authenticated");
      return; // Stop if user is not authenticated
    }
  
    // ถ้าผู้ใช้ได้ไลค์แล้ว เราจะลบออก
    const method = likedRecipes.includes(recipeId) ? 'DELETE' : 'POST';
    
    const response = await fetch(`${API_URL}/api/likes`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipeId }),
    });
  
    if (response.ok) {
      setLikedRecipes((prevLikedRecipes) =>
        method === 'POST'
          ? [...prevLikedRecipes, recipeId] // เพิ่มไลค์
          : prevLikedRecipes.filter((id) => id !== recipeId) // ลบไลค์
      );
    } else {
      console.error("Failed to update like status");
    }
  };
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="p-4">
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4">
        {recipes.slice(0, 6).map((item) => (
          <div
            key={item.id}
            className="bg-gray-100 rounded-lg shadow-md overflow-hidden text-center 
                      transition-transform duration-300 ease-in-out flex flex-col 
                      hover:shadow-lg hover:-translate-y-1 relative"
          >
            <div className="flex justify-center p-3">
              <img
                src={item.image ? `${API_URL}/${item.image}` : "/fallback-image.jpg"}
                alt={item.name || "Recipe Image"}
                className="w-40 h-40 object-cover rounded-md"
                onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
              />
            </div>

            <div className="relative p-4 flex-grow">
              <h3 className="mb-3 font-semibold text-lg">{item.name}</h3>
              <Link href={`/RecipeDescription/${encodeURIComponent(item.name)}`}>
                <button className="px-3 py-1.5 bg-yellow-400 text-gray-800 text-sm rounded-md hover:bg-yellow-500 transition-colors duration-300">
                  RECIPE
                </button>
              </Link>
            </div>

            <i
              className={`fa-solid fa-heart absolute top-2 right-2 border-2 text-xs border-[#FFECC1] 
                          ${likedRecipes.includes(item.id) ? "text-red-500 bg-yellow-300" : "text-slate-100 bg-[#EFBD4C]"} 
                          hover:text-[#FFB100] hover:bg-[#FFECC1] hover:border-[#EFBD4C] 
                          active:bg-[#F8F8F8] rounded-full p-2 cursor-pointer`}
              onClick={() => toggleLike(item.id)}
            ></i>
          </div>
        ))}
      </div>
    </div>
  );
}
