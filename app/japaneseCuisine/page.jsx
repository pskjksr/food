"use client"
import {useState,useEffect} from "react";
import JapaneseRecipes from "../components/japaneseRecipes";


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
      <div className="mb-8 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-700 ml-5">
            Japanese Cuisine
          </h2>
        </div>
        <div className="px-5"><JapaneseRecipes /></div>

    </section>
  );
}
