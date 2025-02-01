"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// 🟢 สร้าง Type สำหรับ Recipe
interface Recipe {
  id: number;
  title: string;
  slug: string;
  image: string;
}

export default function RandomRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch(`${API_URL}/api/recipes`);
        if (!response.ok) throw new Error("Failed to fetch data");

        const result: Recipe[] = await response.json();

        // สุ่มเรียงข้อมูล และเลือก 4 รายการ
        const shuffledRecipes = result.sort(() => 0.5 - Math.random()).slice(0, 4);
        setRecipes(shuffledRecipes);
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
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-5">
      {recipes.map((item) => (
        <div
          className="bg-gray-100 rounded-lg shadow-md overflow-hidden text-center transition-transform duration-300 ease-in-out flex flex-col hover:shadow-lg hover:-translate-y-1 relative"
          key={item.id}
        >
          <div className="flex justify-center p-2">
            <Image
              src={item.image ? `${API_URL}/${item.image}` : "/fallback-image.jpg"}
              alt={item.title}
              width={150}
              height={150}
              className="object-cover rounded-md"
            />
          </div>
          <div className="relative p-4 text-center">
            <h3 className="mb-4">{item.title}</h3>
            <Link href={`/RecipeDescription/${item.slug}`}>
              <button className="absolute right-4 bottom-1 px-4 py-2 bg-yellow-400 text-gray-800 text-sm rounded-md hover:bg-yellow-500 transition-colors duration-300">
                RECIPE
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
