/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Link from "next/link";

// 🟢 กำหนด Type สำหรับ Recipe
interface Recipe {
  id: number;
  name: string;
  image?: string;
}

// ✅ ใช้ TypeScript และเพิ่มการตรวจสอบข้อมูล
export default function CleanEatingRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ ใช้ ENV เพื่อกำหนด API URL
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch(`${API_URL}/api/recipes?cuisineId=13`);
        if (!response.ok) throw new Error("Failed to fetch data");

        const result: Recipe[] = await response.json();
        console.log("Fetched Recipes:", result); // 🟢 Debug

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="p-4">
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-5">
        {recipes.slice(0, 6).map((item) => (
          <div
            key={item.id}
            className="bg-gray-100 rounded-lg shadow-md overflow-hidden text-center 
                      transition-transform duration-300 ease-in-out flex flex-col 
                      hover:shadow-lg hover:-translate-y-1 relative"
          >
            {/* รูปภาพ */}
            <div className="flex justify-center p-2">
              <img
                src={item.image ? `${API_URL}/${item.image}` : "/fallback-image.jpg"}
                alt={item.name || "Recipe Image"}
                className="w-40 h-40 object-cover rounded-md"
                onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
              />
            </div>

            {/* เนื้อหาภายในการ์ด */}
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

            {/* ปุ่มหัวใจ (Favorite) */}
            <i className="fa-solid fa-heart absolute bottom-2 left-2 border-2 text-sm border-[#FFECC1] 
                          bg-[#EFBD4C] text-white hover:text-[#FFB100] hover:bg-[#FFECC1] 
                          hover:border-[#EFBD4C] active:bg-[#F8F8F8] rounded-full p-1.5 cursor-pointer"></i>
          </div>
        ))}
      </div>
    </div>
  );
}
