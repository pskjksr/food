"use client";
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react"; // Import useSession hook

interface Like {
  id: number;
  recipeId: number;
  name: string;
  recipeImage?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || ""; // Define API_URL

const LikePage = () => {
  const { data: session, status } = useSession(); // Use the session from next-auth
  const [likes, setLikes] = useState<Like[]>([]);
  const [likedRecipes, setLikedRecipes] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch likes when the session is available
  useEffect(() => {
    if (status === "loading") return; // Wait until the session is loaded

    if (!session) {
      setError("Authentication required. Please login.");
      setLoading(false);
      return;
    }

    const fetchLikes = async () => {
      try {
        const response = await fetch(`/api/likes?userId=${session.user?.id}`, {
          headers: {},
        });

        if (!response.ok) throw new Error("Failed to fetch likes");

        const result = await response.json();
        console.log("API Result:", result);

        if (Array.isArray(result.likes)) {
          setLikes(result.likes);
          setLikedRecipes(result.likes.map((like: { recipeId: any; }) => like.recipeId)); // Store liked recipes
        } else {
          setError("Invalid data format received. Please try again later.");
        }
      } catch (err) {
        console.error("Error fetching likes:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchLikes();
  }, [status, session]);

  const toggleLike = useCallback(async (recipeId: number) => {
    if (!session) {
      setError("Authentication required. Please login.");
      return;
    }

    const isLiked = likedRecipes.includes(recipeId);
    setLikedRecipes((prev) =>
      isLiked ? prev.filter((id) => id !== recipeId) : [...prev, recipeId]
    );

    try {
      const response = await fetch(`/api/likes`, {
        method: isLiked ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: session.user?.id, recipeId }), // Use userId instead of email
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
  }, [likedRecipes, session]);

  // Error or loading states
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4">
      {/* Title: My Likes */}
      <h2 className="text-2xl font-bold mb-4">My Likes</h2>

      <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4">
        {likes.length === 0 ? (
          <div>No likes found. Please add some favorites!</div>
        ) : (
          likes.map((item) => (
            <div
              key={item.recipeId}
              className="bg-gray-100 rounded-lg shadow-md overflow-hidden text-center 
                        transition-transform duration-300 ease-in-out flex flex-col 
                        hover:shadow-lg hover:-translate-y-1 relative"
            >
              {/* Recipe Image */}
              <div className="flex justify-center p-3">
                <img
                  src={item.recipeImage ? `/${item.recipeImage}` : "/fallback-image.jpg"}
                  alt={item.name || "Recipe Image"}
                  className="w-40 h-40 object-cover rounded-md"
                  onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
                />
              </div>

              {/* Recipe Name & View Recipe Button */}
              <div className="relative p-4 flex-grow">
                <h3 className="mb-3 font-semibold text-lg">{item.name}</h3>
                <Link href={`/RecipeDescription/${encodeURIComponent(item.name)}`}>
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
          ))
        )}
      </div>
    </div>
  );
};

export default LikePage;