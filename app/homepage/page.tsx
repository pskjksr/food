"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import data from "../data.js";
import ThaiRecipes from "../components/thaiRecipes";
import JapaneseRecipes from "../components/japaneseRecipes";
import ChineseRecipes from "../components/ChineseRecipes";
import WesternRecipes from "../components/WesternRecipes";
import CleanEatingRecipes from "../components/CleanEatingRecipes";

const ingredientsList = [
  "Pork",
  "Beef",
  "Chicken",
  "Egg",
  "Butter",
  "Gai choy",
  "Garlic",
  "Tteok",
  "Cabbage",
  "Holy basil",
  "Lime",
  "Spinach",
  "Rice",
  "Kale",
  "Cinnamon",
  "Cheese",
  "Tomato sauce",
  "Mustard",
  "Oats",
  "Pasta sauce",
  "Curry powder",
  "Salad dressing",
  "Seafood",
  "Fish",
  "Meatball",
  "Fish ball",
  "Rice noodles",
  "Sausages",
  "Bread",
  "Onion",
];

const Page: React.FC = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  // ✅ ป้องกันการเปลี่ยนแปลงค่าของ `data` โดยใช้ `useMemo`
  const randomRecipes = useMemo(() => {
    return [...data].sort(() => 0.5 - Math.random()).slice(0, 4);
  }, []);

  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients((prevSelected) =>
      prevSelected.includes(ingredient)
        ? prevSelected.filter((item) => item !== ingredient)
        : [...prevSelected, ingredient]
    );
  };

  return (
    <>
      {/* 🟡 Hero Section */}
      <section className="flex flex-col items-center justify-center p-10 bg-white relative overflow-hidden">
        <div className="absolute -left-1/3 w-[1000px] h-[1000px] bg-yellow-400 rounded-full " />
        <div className="flex flex-col md:flex-row items-center gap-6 z-[1]">
        <Image
           src="/teokbokki.png"  // ✅ ใช้เส้นทางที่เริ่มต้นด้วย "/"
           alt="Tteokbokki"
           width={500}  // ✅ ต้องระบุความกว้าง
           height={300} // ✅ ต้องระบุความสูง
            className="w-full md:w-[500px] rounded-lg"
            />
          <div className="max-w-md text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Tteokbokki : 떡볶이
            </h1>
            <p className="text-gray-600 mb-6">
              Tteokbokki is a popular Korean street food made from soft rice
              cakes, fish cakes, and a sweet and spicy sauce called gochujang.
              It’s often garnished with boiled eggs, scallions, or sesame seeds.
              This dish is loved for its chewy texture and bold flavors, making
              it a favorite comfort food in Korea.
            </p>
            <Link href="/RecipeDescription/tteokbokki">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 py-2 px-6 rounded shadow">
                RECIPE
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 🟡 Recipe Section */}
      <section id="recipe-section" className="p-10 bg-white">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          RECIPE
          <span
            className="w-8 h-8 flex items-center justify-center bg-yellow-400 text-black rounded-full cursor-pointer"
            onClick={() => setShowPopup(true)}
          >
            +
          </span>
        </h1>

        {/* 🍣 Japanese Recipes */}
        <div className="my-8 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-700">Japanese Cuisine</h2>
          <Link href="/japaneseCuisine">
            <i className="fa-solid fa-chevron-right text-xl text-gray-500"></i>
          </Link>
        </div>
        <JapaneseRecipes />

        {/* 🥘 Thai Recipes */}
        <div className="my-8 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-700">Thai Cuisine</h2>
          <Link href="/thaiCuisine">
            <i className="fa-solid fa-chevron-right text-xl text-gray-500"></i>
          </Link>
        </div>
        <ThaiRecipes />

        {/* 🥡 Chinese Recipes */}
        <div className="my-8 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-700">Chinese Cuisine</h2>
          <Link href="/chineseCuisine">
            <i className="fa-solid fa-chevron-right text-xl text-gray-500"></i>
          </Link>
        </div>
        <ChineseRecipes />

        {/* 🍔 Western Recipes */}
        <div className="my-8 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-700">Western Cuisine</h2>
          <Link href="/westernCuisine">
            <i className="fa-solid fa-chevron-right text-xl text-gray-500"></i>
          </Link>
        </div>
        <WesternRecipes />

        {/* 🥗 Clean Eating Recipes */}
        <div className="my-8 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-700">Clean Eating Cuisine</h2>
          <Link href="/cleanEatingCuisine">
            <i className="fa-solid fa-chevron-right text-xl text-gray-500"></i>
          </Link>
        </div>
        <CleanEatingRecipes />
      </section>

      {/* 🟡 Popup for Ingredient Selection */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[5]">
          <div className="bg-white p-6 rounded-lg w-4/5 max-w-xl">
            <div className="grid grid-cols-4 gap-4">
              {ingredientsList.map((ingredient, index) => (
                <div
                  key={index}
                  className={`p-1 rounded-3xl cursor-pointer text-center border border-gray-200 ${
                    selectedIngredients.includes(ingredient)
                      ? "bg-yellow-400 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => toggleIngredient(ingredient)}
                >
                  {ingredient}
                </div>
              ))}
            </div>
            <div className="mt-4 text-right">
              <button
                className="bg-yellow-400 text-white py-2 px-6 rounded-3xl shadow"
                onClick={() => setShowPopup(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
