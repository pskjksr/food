"use client"; // Mark the file as a client-side component

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamically import components with SSR turned off
const Breakfast = dynamic(() => import("../components/Breakfast"), { ssr: false });
const Lunch = dynamic(() => import("../components/lunch"), { ssr: false });
const Dinner = dynamic(() => import("../components/dinner"), { ssr: false });
const Dessert = dynamic(() => import("../components/dessert"), { ssr: false });
const Drink = dynamic(() => import("../components/drink"), { ssr: false });

const RecipeCategories: React.FC = () => {
  return (
    <section id="recipe-section" className="p-10">
      {/* Breakfast Section */}
      <div className="my-8 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">Breakfast</h2>
        <Link href="/breakcategories">
          <i className="fa-solid fa-chevron-right text-xl text-gray-500"></i>
        </Link>
      </div>
      <Breakfast />

      {/* Lunch Section */}
      <div className="my-8 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">Lunch</h2>
        <Link href="/lunchcategories">
          <i className="fa-solid fa-chevron-right text-xl text-gray-500"></i>
        </Link>
      </div>
      <Lunch />

      {/* Chinese Cuisine Section */}
      <div className="my-8 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">Dinner</h2>
        <Link href="/dinnercategories">
          <i className="fa-solid fa-chevron-right text-xl text-gray-500"></i>
        </Link>
      </div>
      <Dinner />

      {/* Western Cuisine Section */}
      <div className="my-8 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">Dessert</h2>
        <Link href="/Dessertcategorie">
          <i className="fa-solid fa-chevron-right text-xl text-gray-500"></i>
        </Link>
      </div>
      <Dessert  />

      {/* Clean Eating Cuisine Section */}
      <div className="my-8 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">Drink</h2>
        <Link href="/drinkcategorie">
          <i className="fa-solid fa-chevron-right text-xl text-gray-500"></i>
        </Link>
      </div>
      <Drink />
    </section>
  );
};

export default RecipeCategories;
