"use client";
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";

interface Like {
  id: number;
  recipeId: number;
  recipeName: string;
  recipeImage?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || ""; // Define API_URL

const LikePage = () => {
  const [likes, setLikes] = useState<Like[]>([]);
  const [likedRecipes, setLikedRecipes] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLikes() {
      const userId = 1; // Replace with actual userId from authentication
      try {
        const response = await fetch(`/api/like?userId=${userId}`);
        if (!response.ok) throw new Error("Failed to fetch likes");
        const result: Like[] = await response.json();
        setLikes(result);
        setLikedRecipes(result.map((like) => like.recipeId)); // Store liked recipes
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchLikes();
  }, []);

  const toggleLike = useCallback(async (recipeId: number) => {
    const isLiked = likedRecipes.includes(recipeId);
    setLikedRecipes((prev) =>
      isLiked ? prev.filter((id) => id !== recipeId) : [...prev, recipeId]
    );

    try {
      const response = await fetch(`/api/like`, {
        method: isLiked ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: 1, recipeId }), // Replace userId with actual auth user
      });

      if (!response.ok) {
        throw new Error("Failed to update like status");
      }
    } catch (err) {
      console.error(err);
      setLikedRecipes((prev) =>
        isLiked ? [...prev, recipeId] : prev.filter((id) => id !== recipeId)
      ); // Revert UI on failure
    }
  }, [likedRecipes]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="p-4">
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4">
        {likes.map((item) => (
          <div
            key={item.recipeId}
            className="bg-gray-100 rounded-lg shadow-md overflow-hidden text-center 
                      transition-transform duration-300 ease-in-out flex flex-col 
                      hover:shadow-lg hover:-translate-y-1 relative"
          >
            {/* Recipe Image */}
            <div className="flex justify-center p-3">
              <img
                src={item.recipeImage ? `${API_URL}/${item.recipeImage}` : "/fallback-image.jpg"}
                alt={item.recipeName || "Recipe Image"}
                className="w-40 h-40 object-cover rounded-md"
                onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
              />
            </div>

            {/* Recipe Name & View Recipe Button */}
            <div className="relative p-4 flex-grow">
              <h3 className="mb-3 font-semibold text-lg">{item.recipeName}</h3>
              <Link href={`/RecipeDescription/${encodeURIComponent(item.recipeName)}`}>
                <button className="px-3 py-1.5 bg-yellow-400 text-gray-800 text-sm rounded-md hover:bg-yellow-500 transition-colors duration-300">
                  RECIPE
                </button>
              </Link>
            </div>

            {/* Like Button */}
            <i
              className={`fa-solid fa-heart absolute top-2 right-2 border-2 text-xs border-[#FFECC1] 
                          ${likedRecipes.includes(item.recipeId) ? "text-red-500 bg-yellow-300" : "text-slate-100 bg-[#EFBD4C]"} 
                          hover:text-[#FFB100] hover:bg-[#FFECC1] hover:border-[#EFBD4C] 
                          active:bg-[#F8F8F8] rounded-full p-2 cursor-pointer`}
              onClick={() => toggleLike(item.recipeId)}
            ></i>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikePage;
