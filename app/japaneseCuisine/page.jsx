"use client"
import {useState,useEffect} from "react";
import data from "../data.js";
import "../homepage/Homepage.css";
import JapaneseRecipes from "../components/japaneseRecipes.jsx";

export default function page() {
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    const shuffledRecipes = data.sort(() => 0.5 - Math.random()).slice(0, 4);
    setRandomRecipes(shuffledRecipes);
  }, []);

  return (
    <section id="recipe-section" className="recipe-section">
      <div
        className="recipe-category"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2>Japanese Cuisine</h2>
      </div>
      <JapaneseRecipes />
    </section>
  );
}
