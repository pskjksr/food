"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import data from "../data.js";
import ThaiRecipes from "../components/thaiRecipes";
import JapaneseRecipes from "../components/japaneseRecipes";
import ChineseRecipes from "../components/ChineseRecipes";
import WesternRecipes from "../components/WesternRecipes";
import CleanEatingRecipes from "../components/CleanEatingRecipes";

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
      <section className="p-10 bg-white">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Image src="/teokbokki.png" alt="Tteokbokki" width={500} height={300} />
          <div>
            <h1 className="text-2xl font-bold">Tteokbokki</h1>
            <p>A popular Korean street food...</p>
            <Link href="/RecipeDescription/tteokbokki">
              <button className="bg-yellow-400 px-6 py-2 rounded">RECIPE</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Recipe Sections */}
      <section id="recipe-section" className="p-10 bg-white">
        <h1 className="text-2xl font-bold">RECIPE</h1>

        {/* Japanese Recipes */}
        <h2>Japanese Cuisine</h2>
        <Link href="/japaneseCuisine">
          <i className="fa-solid fa-chevron-right"></i>
        </Link>
        <JapaneseRecipes />

        {/* Thai Recipes */}
        <h2>Thai Cuisine</h2>
        <Link href="/thaiCuisine">
          <i className="fa-solid fa-chevron-right"></i>
        </Link>
        <ThaiRecipes />

        {/* Chinese Recipes */}
        <h2>Chinese Cuisine</h2>
        <Link href="/chineseCuisine">
          <i className="fa-solid fa-chevron-right"></i>
        </Link>
        <ChineseRecipes />

        {/* Western Recipes */}
        <h2>Western Cuisine</h2>
        <Link href="/westernCuisine">
          <i className="fa-solid fa-chevron-right"></i>
        </Link>
        <WesternRecipes />

        {/* Clean Eating Recipes */}
        <h2>Clean Eating Cuisine</h2>
        <Link href="/cleanEatingCuisine">
          <i className="fa-solid fa-chevron-right"></i>
        </Link>
        <CleanEatingRecipes />
      </section>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-4/5 max-w-xl">
            <div className="grid grid-cols-4 gap-4">
              {ingredientsList.map((ingredient, index) => (
                <div
                  key={index}
                  className={`p-2 cursor-pointer ${
                    selectedIngredients.includes(ingredient) ? "bg-yellow-400" : "bg-gray-100"
                  }`}
                  onClick={() => toggleIngredient(ingredient)}
                >
                  {ingredient}
                </div>
              ))}
            </div>
            <button onClick={() => setShowPopup(false)} className="bg-yellow-400 px-4 py-2 rounded">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
