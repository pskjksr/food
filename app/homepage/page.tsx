"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import data from "../data.js";
import ThaiRecipes from "../components/thaiRecipes.jsx";
import JapaneseRecipes from "../components/japaneseRecipes.jsx";
import ChineseRecipes from "../components/ChineseRecipes.jsx";
import WesternRecipes from "../components/WesternRecipes.jsx";
import CleanEatingRecipes from "../components/CleanEatingRecipes.jsx";

const ingredientsList = [
  "Pork", "Beef", "Chicken", "Egg", "Butter", "Gai choy", "Garlic",
  "Tteok", "Cabbage", "Holy basil", "Lime", "Spinach", "Rice", "Kale",
  "Cinnamon", "Cheese", "Tomato sauce", "Mustard", "Oats", "Pasta sauce",
  "Curry powder", "Salad dressing", "Seafood", "Fish", "Meatball",
  "Fish ball", "Rice noodles", "Sausages", "Bread", "Onion"
];

const Page: React.FC = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  // ✅ Random recipes
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
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-10 relative">
        <div className="absolute -left-1/3 w-[950px] h-[850px] bg-yellow-400 rounded-full z-[-1]" />
        <div className="flex flex-col md:flex-row items-center gap-6 z-10">
          <Image src="/teokbokki.png" alt="Tteokbokki" width={500} height={300} className="rounded-lg" />
          <div className="max-w-md text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Tteokbokki : 떡볶이</h1>
            <p className="text-gray-600 mb-6">
              Tteokbokki is a popular Korean street food made from soft rice cakes, fish cakes, and a sweet and spicy sauce called gochujang.
            </p>
            <Link href="/RecipeDescription/tteokbokki">
              <button className="border-2 bg-yellow-400 text-white hover:bg-[#FFECC1] py-2 px-6 rounded-3xl shadow">
                RECIPE
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Recipe Section */}
      <section id="recipe-section" className="p-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          RECIPE
          <span className="w-8 h-8 flex items-center justify-center bg-yellow-400 rounded-full cursor-pointer" onClick={() => setShowPopup(true)}>
            +
          </span>
        </h1>

        {[{ title: "Japanese Cuisine", component: <JapaneseRecipes />, link: "/japaneseCuisine" },
          { title: "Thai Cuisine", component: <ThaiRecipes />, link: "/thaiCuisine" },
          { title: "Chinese Cuisine", component: <ChineseRecipes />, link: "/chineseCuisine" },
          { title: "Western Cuisine", component: <WesternRecipes />, link: "/westernCuisine" },
          { title: "Clean Eating Cuisine", component: <CleanEatingRecipes />, link: "/cleanEatingCuisine" }].map((category, index) => (
          <div key={index} className="my-8 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-700">{category.title}</h2>
            <Link href={category.link}>
              <i className="fa-solid fa-chevron-right text-xl text-gray-500"></i>
            </Link>
            {category.component}
          </div>
        ))}
      </section>

      {/* Popup for ingredients */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-4/5 max-w-xl">
            <div className="grid grid-cols-4 gap-4">
              {ingredientsList.map((ingredient, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-md cursor-pointer ${selectedIngredients.includes(ingredient) ? "bg-yellow-400 text-white" : "bg-gray-100"}`}
                  onClick={() => toggleIngredient(ingredient)}
                >
                  {ingredient}
                </div>
              ))}
            </div>
            <div className="mt-4 text-right">
              <button onClick={() => setShowPopup(false)} className="bg-yellow-400 text-gray-800 py-2 px-4 rounded shadow">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;