"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import data from "../data.js";
import ThaiRecipes from "../components/thaiRecipes";
import JapaneseRecipes from "../components/japaneseRecipes";
import ChineseRecipes from "../components/ChineseRecipes";
import WesternRecipes from "../components/WesternRecipes";
import CleanEatingRecipes from "../components/CleanEatingRecipes";

function Page() {
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    const shuffledRecipes = data.sort(() => 0.5 - Math.random()).slice(0, 4);
    setRandomRecipes(shuffledRecipes);
  }, []);

  const ingredients = [
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

  const toggleIngredient = (ingredient) => {
    setSelectedIngredients((prevSelected) => {
      if (prevSelected.includes(ingredient)) {
        return prevSelected.filter((item) => item !== ingredient);
      }
      return [...prevSelected, ingredient];
    });
  };

  return (
    
    <>
      <section className="relative flex flex-col items-center justify-center p-10  ">
        <div className="absolute -left-1/3 w-[1000px] h-[950px] bg-yellow-400 rounded-full z-[-1]" />
        <div className="flex flex-col md:flex-row items-center gap-6 ">
          <img
            src="teokbokki.png"
            alt="Tteokbokki"
            className="w-full md:w-[500px] rounded-lg"
          />
          <div className="max-w-md text-center md:text-left">
            <h1 className="text-[48px] font-bold text-gray-800 mb-4">
              Tteokbokki : 떡볶이
            </h1>
            <p className="text-gray-600 mb-6 text-[20px]">
              Tteokbokki is a popular Korean street food made from soft rice
              cakes, fish cakes, and a sweet and spicy sauce called gochujang.
              It’s often garnished with boiled eggs, scallions, or sesame seeds.
              This dish is loved for its chewy texture and bold flavors, making
              it a favorite comfort food in Korea.
            </p>
            <Link href="/RecipeDescription/tteokbokki">
              <button className="border-2 text-[25px] bg-yellow-400 text-gray-800 border-[#FFECC1] hover:text-[#FFB100] hover:bg-[#FFECC1] hover:border-[#EFBD4C] active:bg-[#F8F8F8] py-2 px-6 rounded-full shadow"> 
                RECIPE
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section id="recipe-section" className="p-10 mt-20">
        <h1 className="text-[36px] font-bold text-gray-800 mb-4 flex items-center gap-2">
          RECIPE
          <span
            className="w-10 h-10 flex items-center justify-center border-2 bg-yellow-400 text-gray-800 border-[#FFECC1] hover:text-[#FFB100] hover:bg-[#FFECC1] hover:border-[#EFBD4C] active:bg-[#F8F8F8] rounded-full cursor-pointer"
            onClick={() => setShowPopup(true)}
          >
            +
          </span>
        </h1>

        <div className="my-8 flex justify-between items-center">
          <h2 className="text-[28px] font-semibold text-gray-700">
            Japanese Cuisine
          </h2>
          <Link href="/japaneseCuisine">
            <i className="fa-solid fa-chevron-right text-xl text-gray-500"></i>
          </Link>
        </div>
        <JapaneseRecipes />

        <div className="my-8 flex justify-between items-center">
          <h2 className="text-[26px] font-semibold text-gray-700">Thai Cuisine</h2>
            <i className="fa-solid fa-chevron-right text-xl text-gray-500"></i>
        </div>
        <ThaiRecipes />

        <div className="my-8 flex justify-between items-center">
          <h2 className="text-[26px] font-semibold text-gray-700">Chinese Cuisine</h2>
            <i className="fa-solid fa-chevron-right text-xl text-gray-500"></i>
        </div>
        <ChineseRecipes />

        <div className="my-8 flex justify-between items-center">
          <h2 className="text-[26px] font-semibold text-gray-700">Western Cuisine</h2>
            <i className="fa-solid fa-chevron-right text-xl text-gray-500"></i>
        </div>
        <WesternRecipes />

        <div className="my-8 flex justify-between items-center">
          <h2 className="text-[26px] font-semibold text-gray-700">Clean Eating Cuisine</h2>        
            <i className="fa-solid fa-chevron-right text-xl text-gray-500"></i>
        </div>
        <CleanEatingRecipes />
      </section>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[5]">
          <div className="bg-white p-6 rounded-lg w-4/5 max-w-xl">
            <div className="grid grid-cols-4 gap-4">
              {ingredients.map((ingredient, index) => (
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
}

export default Page;
