import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const RandomRecipe = () => {
  const [recipe, setRecipe] = useState<{
    id: string;
    name: string;
    description: string;
    image: string;
  } | null>(null);

  useEffect(() => {
    const fetchRandomRecipe = async () => {
      try {
        const res = await fetch("/api/recipes");
        if (!res.ok) throw new Error("ไม่สามารถดึงข้อมูลสูตรอาหารได้");

        const data = await res.json();
        if (data.length === 0) throw new Error("ไม่มีข้อมูลสูตรอาหาร");

        const randomRecipe = data[Math.floor(Math.random() * data.length)];
        setRecipe(randomRecipe);
      } catch (error) {
        console.error("เกิดข้อผิดพลาด:", error);
      }
    };

    fetchRandomRecipe();
  }, []);

  if (!recipe) return <p className="text-center text-gray-500">กำลังโหลดเมนู...</p>;

  // Check if recipe.image exists and handle it accordingly
  const imagePath = recipe.image ? `/${recipe.image}` : "/default-image.png";

  return (
    <div className="flex flex-row items-center gap-6 ">
      {/* Ensure the image exists and load the fallback if needed */}
      <Image
        src={imagePath}
        alt={recipe.name}
        width={500}
        height={300}
        className="w-full md:w-[500px] rounded-lg"
        priority
        unoptimized={true} // You can set unoptimized to true if you're not using an optimized image loader
      />
      <div className="max-w-md text-center md:text-left ">
  <h1 className="text-2xl font-bold text-gray-800 ">{recipe.name}</h1>
  <p className="text-gray-600 mb-6">{recipe.description}</p>
  <Link href={`/RecipeDescription/${recipe.id}`}>
    <button className="border-2 bg-yellow-400 border-[#FFECC1] text-white hover:text-[#FFB100] hover:bg-[#FFECC1] hover:border-[#EFBD4C] active:bg-[#F8F8F8] py-2 px-6 rounded-3xl shadow">
      RECIPE
    </button>
  </Link>
</div>

    </div>
  );
};

export default RandomRecipe;
