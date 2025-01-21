"use client";
import React, { useState, useEffect } from "react";
import "./Homepage.css";
import Link from "next/link";
import data from "../data.js";
import ThaiRecipes from "../components/thaiRecipes";
import JapaneseRecipes from "../components/japaneseRecipes";
import ChineseRecipes from "../components/ChineseRecipes";
import WesternRecipes from "../components/WesternRecipes";
import CleanEatingRecipes from "../components/CleanEatingRecipes";

function page() {
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
      // ตรวจสอบว่ารายการถูกอัปเดตตามที่คาดหวังหรือไม่
      console.log("ก่อนการอัปเดต: ", prevSelected);

      // ถ้า ingredient อยู่ในรายการที่เลือกไว้ ให้ลบออก
      if (prevSelected.includes(ingredient)) {
        const updatedIngredients = prevSelected.filter(
          (item) => item !== ingredient
        );
        console.log("รายการหลังการลบ: ", updatedIngredients);
        return updatedIngredients;
      }

      // ถ้า ingredient ไม่อยู่ในรายการที่เลือก ให้เพิ่มเข้าไป
      const updatedIngredients = [...prevSelected, ingredient];
      console.log("รายการหลังการเพิ่ม: ", updatedIngredients);
      return updatedIngredients;
    });
  };

  return (
    <>
      <section className="highlight">
        <div className="highlight-content">
          <img src="teokbokki.png" alt="Tteokbokki" />
          <div className="info">
            <h1>Tteokbokki : 떡볶이</h1>
            <p>
              Tteokbokki is a popular Korean street food made from soft rice
              cakes, fish cakes, and a sweet and spicy sauce called gochujang.
              It’s often garnished with boiled eggs, scallions, or sesame seeds.
              This dish is loved for its chewy texture and bold flavors, making
              it a favorite comfort food in Korea.
            </p>
            <Link href="/RecipeDescription/tteokbokki">
              <button className="recipe-button">RECIPE</button>
            </Link>
          </div>
        </div>
      </section>

      <section id="recipe-section" className="recipe-section">
        <h1 className="section-title">
          RECIPE{" "}
          <span className="add-icon" onClick={() => setShowPopup(true)}>
            +
          </span>
        </h1>
        <div
          className="recipe-category"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2>Japanese Cuisine</h2>
          <Link href="/japaneseCuisine" className="flex items-center">
            <i className="fa-solid fa-chevron-right text-xl text-[#717171]"></i>
          </Link>
        </div>
        <JapaneseRecipes />
      </section>

      <section className="recipe-section">
        <div
          className="recipe-category"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2>Thai Cuisine</h2>
          <i className="fa-solid fa-chevron-right text-xl text-[#717171]"></i>
        </div>
        <ThaiRecipes />
      </section>

      <section className="recipe-section">
        <div
          className="recipe-category"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2>Chinese Cuisine</h2>
          <i className="fa-solid fa-chevron-right text-xl text-[#717171]"></i>
        </div>
        <ChineseRecipes />
      </section>

      <section className="recipe-section">
        <div
          className="recipe-category"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2>Western Cuisine</h2>
          <i className="fa-solid fa-chevron-right text-xl text-[#717171]"></i>
        </div>
        <WesternRecipes />
      </section>

      <section className="recipe-section">
        <div
          className="recipe-category"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2>Clean Eating Cuisine</h2>
          <i className="fa-solid fa-chevron-right text-xl text-[#717171]"></i>
        </div>
        <CleanEatingRecipes />
      </section>

      {/* Popup (Modal ของ DaisyUI) */}
      {showPopup && (
        <div className="modal modal-open border border-black">
          <div className="modal-box w-xl border border-black">
            <div className="grid grid-cols-4 gap-2">
              {ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className={`badge badge-outline text-center p-4 cursor-pointer ${
                    selectedIngredients.includes(ingredient)
                      ? "bg-yellow-400 text-white"
                      : "bg-white text-black"
                  }`}
                  onClick={() => toggleIngredient(ingredient)}
                >
                  {ingredient}
                </div>
              ))}
            </div>
            <div className="modal-action">
              <button
                className="btn bg-[#EFBD4C] text-white hover:bg-[#EFBD4C]"
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

export default page;
