"use client";
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface Like {
  id: number;
  recipeId: number;
  name: string;
  recipeImage?: string;
}

const LikePage = () => {
  const { data: session, status } = useSession();
  const [likes, setLikes] = useState<Like[]>([]);
  const [likedRecipes, setLikedRecipes] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user?.id) {
      setError("Authentication required. Please login.");
      setLoading(false);
      return;
    }

    const fetchLikes = async () => {
      try {
        const response = await fetch(`/api/likes?userId=${session.user.id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch likes");

        const result = await response.json();
        setLikes(result.likes || []);
        setLikedRecipes(result.likes.map((like: { recipeId: number }) => like.recipeId));
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchLikes();
  }, [status, session]);

  const toggleLike = useCallback(
    async (recipeId: number) => {
      if (!session?.user?.id) {
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
          body: JSON.stringify({ userId: session.user.id, recipeId }),
        });

        if (!response.ok) throw new Error("Failed to update like status");
      } catch (err) {
        console.error(err);
        setLikedRecipes((prev) =>
          isLiked ? [...prev, recipeId] : prev.filter((id) => id !== recipeId)
        );
      }
    },
    [likedRecipes, session]
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Likes</h2>

      <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4 " >
        {likes.length === 0 ? (
          <div>No likes found. Please add some favorites!</div>
        ) : (
          likes.map((item) => (
            <div
              key={item.recipeId}
              className="bg-gray-100  border-2 rounded-lg shadow-md text-center flex flex-col hover:shadow-lg hover:-translate-y-1 relative"
            >
              <div className="flex justify-center p-3">
                <img
                  src={item.recipeImage ? `/${item.recipeImage}` : "/fallback-image.jpg"}
                  alt={item.name || "Recipe Image"}
                  className="w-40 h-40 object-cover rounded-md"
                  onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
                />
              </div>

              <div className="relative p-4 flex-grow ">
                <h3 className="mb-3 font-semibold text-lg ">{item.name}</h3>
                <Link href={`/RecipeDescription/${encodeURIComponent(item.name)}`}>
                  <button className="px-3 py-1.5 bg-yellow-400 text-gray-800 text-sm rounded-md hover:bg-yellow-500 transition-colors duration-300">
                    RECIPE
                  </button>
                </Link>
              </div>

              <i
                className={`fa-solid fa-heart absolute top-2 right-2 border-2 text-xs 
                ${likedRecipes.includes(item.recipeId) ? "text-red-500 bg-yellow-300" : "text-gray-300 bg-gray-200"} 
                hover:text-yellow-500 hover:bg-yellow-300 border-gray-400 rounded-full p-2 cursor-pointer`}
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
