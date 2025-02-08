"use client"; // Mark the component as client-side component

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamic imports with no SSR
const ThaiRecipes = dynamic(() => import("../components/thaiRecipes"), { ssr: false });
const JapaneseRecipes = dynamic(() => import("../components/japaneseRecipes"), { ssr: false });
const ChineseRecipes = dynamic(() => import("../components/ChineseRecipes"), { ssr: false });
const WesternRecipes = dynamic(() => import("../components/WesternRecipes"), { ssr: false });
const CleanEatingRecipes = dynamic(() => import("../components/CleanEatingRecipes"), { ssr: false });

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
  const [shuffledIngredients, setShuffledIngredients] = useState<string[]>([]);

  // Shuffle ingredients only when component mounts on the client-side
  useEffect(() => {
    const shuffleIngredients = () => {
      const shuffled = [...ingredientsList].sort(() => 0.5 - Math.random());
      setShuffledIngredients(shuffled);
    };

    shuffleIngredients(); // Shuffling ingredients after mount
  }, []); // Empty dependency array ensures this effect runs only once after mount

  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients((prevSelected) =>
      prevSelected.includes(ingredient)
        ? prevSelected.filter((item) => item !== ingredient)
        : [...prevSelected, ingredient]
    );
  };

  return (
    <>
      <section className="flex flex-col items-center justify-center px-10 relative">
        <div className="absolute -left-1/3 bottom-0 w-[950px] h-[850px] bg-yellow-400 rounded-full z-[-1]" />
        <div className="flex flex-col md:flex-row items-center gap-6 z-10">
          <Image src="/teokbokki.png" alt="Tteokbokki" width={500} height={300} className="w-full md:w-[500px] rounded-lg" />
          <div className="max-w-md text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Tteokbokki : 떡볶이</h1>
            <p className="text-gray-600 mb-6">
              Tteokbokki is a popular Korean street food made from soft rice cakes, fish cakes, and a sweet and spicy sauce called gochujang.
            </p>
            <Link href="/RecipeDescription/tteokbokki">
              <button className="border-2 bg-yellow-400 border-[#FFECC1] text-white hover:text-[#FFB100] hover:bg-[#FFECC1] hover:border-[#EFBD4C] active:bg-[#F8F8F8] py-2 px-6 rounded-3xl shadow">
                RECIPE
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section id="recipe-section" className="p-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          RECIPE
          <span className="w-8 h-8 flex items-center justify-center border-2 bg-yellow-400 border-[#FFECC1] text-white hover:text-[#FFB100] hover:bg-[#FFECC1] hover:border-[#EFBD4C] active:bg-[#F8F8F8] rounded-full cursor-pointer" onClick={() => setShowPopup(true)} >
            +
          </span>
        </h1>

        <div className="my-8 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-700">Japanese Cuisine</h2>
          <Link href="/japaneseCuisine"><i className="fa-solid fa-chevron-right text-xl text-gray-500"></i></Link>
        </div>
        <JapaneseRecipes />

        <div className="my-8 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-700">Thai Cuisine</h2>
          <Link href="/thaiCuisine"><i className="fa-solid fa-chevron-right text-xl text-gray-500"></i></Link>
        </div>
        <ThaiRecipes />

        <div className="my-8 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-700">Chinese Cuisine</h2>
          <Link href="/chineseCuisine"><i className="fa-solid fa-chevron-right text-xl text-gray-500"></i></Link>
        </div>
        <ChineseRecipes />

        <h2>Western Cuisine</h2>
        <Link href="/westernCuisine">
          <i className="fa-solid fa-chevron-right text-xl text-gray-500"></i></Link>
        <WesternRecipes />

        <h2>Clean Eating Cuisine</h2>
        <Link href="/cleanEatingCuisine">
          <i className="fa-solid fa-chevron-right text-xl text-gray-500"></i></Link>
        <CleanEatingRecipes />
      </section>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-4/5 max-w-xl">
            <div className="grid grid-cols-4 gap-4">
              {shuffledIngredients.map((ingredient, index) => (
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
