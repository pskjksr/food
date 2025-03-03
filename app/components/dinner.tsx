"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface Recipe {
  id: number;
  name: string;
  image?: string;
}

export default function CleanEatingRecipes() {
  const { data: session, status } = useSession();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [likedRecipes, setLikedRecipes] = useState<number[]>([]);

  // Fetch recipes
  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch(`/api/recipes?categoryId=22`);
        if (!response.ok) throw new Error("Failed to fetch recipes");
        const result: Recipe[] = await response.json();
        setRecipes(result);
        setError(null); // Clear error on success
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    }
    fetchRecipes();
  }, []);

  // Fetch liked recipes
  useEffect(() => {
    async function fetchLikedRecipes() {
      if (status !== "authenticated" || !session?.user?.id) {
        console.log("User is not authenticated, skipping liked recipes fetch");
        return;
      }

      try {
        const response = await fetch(`/api/likes?userId=${session.user.id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch liked recipes: ${errorText}`);
        }
        const data = await response.json();
        if (!data.likes) throw new Error("No likes data returned from API");
        const likedRecipeIds = data.likes.map((like: any) => like.recipeId);
        setLikedRecipes(likedRecipeIds);
        setError(null); // Clear error on success
      } catch (err) {
        console.error("Error fetching liked recipes:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      }
    }
    fetchLikedRecipes();
  }, [session?.user?.id, status]);

  // Toggle like functionality (unchanged)
  const toggleLike = async (recipeId: number) => {
    if (status !== "authenticated" || !session?.user?.id) {
      alert("You need to be logged in to like recipes.");
      return;
    }
    const method = likedRecipes.includes(recipeId) ? "DELETE" : "POST";
    try {
      const response = await fetch(`/api/likes`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipeId, userId: session.user.id }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update like status: ${errorText}`);
      }
      setLikedRecipes((prev) =>
        method === "POST" ? [...prev, recipeId] : prev.filter((id) => id !== recipeId)
      );
      setError(null); // Clear error on success
    } catch (err) {
      console.error("Error updating like status:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
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
          className="bg-gray-100 border-2  rounded-lg shadow-md overflow-hidden text-center 
                    transition-transform duration-300 ease-in-out flex flex-col 
                    hover:shadow-lg hover:-translate-y-1 relative"
        >
          <div className="flex justify-center p-3 w-full h-48 overflow-hidden">
         <img
            src={item.image ? `/${item.image}` : "/fallback-image.jpg"}
            alt={item.name || "Recipe Image"}
            className="w-full h-full object-cover rounded-md"
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