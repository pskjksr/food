"use client"; // Mark the file as a client-side component

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation"; // Use 'next/navigation' instead of 'next/router'

const Breakfast = dynamic(() => import("../components/Breakfast"), { ssr: false });
const Lunch = dynamic(() => import("../components/lunch"), { ssr: false });
const Dinner = dynamic(() => import("../components/dinner"), { ssr: false });
const Dessert = dynamic(() => import("../components/dessert"), { ssr: false });
const Drink = dynamic(() => import("../components/drink"), { ssr: false });

const RecipeCategories: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <section id="recipe-section" className="p-10">


        {/* ส่วนต่างๆ ของสูตรอาหาร (Breakfast, Lunch, etc.) */}
        <div className="my-8 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-700">Breakfast</h2>
          <Link href="/breakcategories"><i className="fa-solid fa-chevron-right text-xl text-gray-500"></i></Link>
        </div>
        <Breakfast />

        <div className="my-8 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-700">Lunch</h2>
          <Link href="/Lunchcategories"><i className="fa-solid fa-chevron-right text-xl text-gray-500"></i></Link>
        </div>
        <Lunch />

        <div className="my-8 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-700">Chinese Cuisine</h2>
          <Link href="/Dinnercategories"><i className="fa-solid fa-chevron-right text-xl text-gray-500"></i></Link>
        </div>
        <Dinner />

        <div className="my-8 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-700">Western Cuisine</h2>
          <Link href="/Dessertcategorie"><i className="fa-solid fa-chevron-right text-xl text-gray-500"></i></Link>
        </div>
        <Dessert />

        <div className="my-8 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-700">Clean Eating Cuisine</h2>
          <Link href="/Drinkcategorie"><i className="fa-solid fa-chevron-right text-xl text-gray-500"></i></Link>
        </div>
        <Drink />
      </section>
    </>
  );
};

export default RecipeCategories;
