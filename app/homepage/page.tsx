"use client"; // Mark the file as a client-side component

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation"; // Use 'next/navigation' instead of 'next/router'


// Dynamic imports without SSR
const ThaiRecipes = dynamic(() => import("../components/thaiRecipes"), { ssr: false });
const JapaneseRecipes = dynamic(() => import("../components/japaneseRecipes"), { ssr: false });
const ChineseRecipes = dynamic(() => import("../components/ChineseRecipes"), { ssr: false });
const WesternRecipes = dynamic(() => import("../components/WesternRecipes"), { ssr: false });
const CleanEatingRecipes = dynamic(() => import("../components/CleanEatingRecipes"), { ssr: false });

const Page: React.FC = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  
  useEffect(() => {
    setMounted(true);
  }, []);

  // ดึงข้อมูลวัตถุดิบจาก API
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const res = await fetch("/api/ingredients");
        if (!res.ok) throw new Error("ไม่สามารถดึงข้อมูลวัตถุดิบได้");
        const data = await res.json();
        setIngredients(data.map((item: any) => item.name));
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลวัตถุดิบ:", error);
      }
    };
    fetchIngredients();
  }, []);

  // ค้นหาสูตรอาหารจากวัตถุดิบที่เลือก
  const searchRecipes = () => {
    if (selectedIngredients.length === 0) return;
    const query = selectedIngredients.map((ing) => `ingredients=${encodeURIComponent(ing)}`).join("&");
    router.push(`/searchResults?${query}`);
  };

  // เปลี่ยนสถานะการเลือกวัตถุดิบ
  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((item) => item !== ingredient)
        : [...prev, ingredient]
    );
  };

  if (!mounted) return null; // Prevent rendering until client-side is ready

  return (
    <>
      {/* ส่วนของเนื้อหาหลัก (Tteokbokki และส่วนของประเภทอาหารต่างๆ) */}
      <section className="flex flex-col items-center justify-center px-10 relative">
        <div className="absolute -left-1/3 bottom-0 w-[950px] h-[850px] bg-yellow-400 rounded-full z-[-1]" />
        <div className="flex flex-col md:flex-row items-center gap-6 z-10">
          <Image src="/teokbokki.png" alt="Tteokbokki" width={500} height={300} className="w-full md:w-[500px] rounded-lg" />
          <div className="max-w-md text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Tteokbokki : 떡볶이</h1>
            <p className="text-gray-600 mb-6">Tteokbokki is a popular Korean street food made from soft rice cakes, fish cakes, and a sweet and spicy sauce called gochujang.</p>
            <Link href="/RecipeDescription/tteokbokki">
            <button className="border-2 bg-yellow-400  border-[#FFECC1] text-white hover:text-[#FFB100] hover:bg-[#FFECC1] hover:border-[#EFBD4C] active:bg-[#F8F8F8] py-2 px-6 rounded-3xl shadow">RECIPE</button>
            </Link>
          </div>
        </div>
      </section>

      <section id="recipe-section" className="p-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          RECIPE
          <span className="w-8 h-8 flex items-center justify-center border-2 bg-yellow-400  border-[#FFECC1] text-white hover:text-[#FFB100] hover:bg-[#FFECC1] hover:border-[#EFBD4C] active:bg-[#F8F8F8] rounded-full cursor-pointer" onClick={() => setShowPopup(true)}>+</span>
        </h1>

        {/* ส่วนต่างๆ ของสูตรอาหาร (Japanese, Thai, etc.) */}
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

        <div className="my-8 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-700">Western Cuisine</h2>
          <Link href="/westernCuisine"><i className="fa-solid fa-chevron-right text-xl text-gray-500"></i></Link>
        </div>
        <WesternRecipes />

        <div className="my-8 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-700">Clean Eating Cuisine</h2>
          <Link href="/cleanEatingCuisine"><i className="fa-solid fa-chevron-right text-xl text-gray-500"></i></Link>
        </div>
        <CleanEatingRecipes />
      </section>

      {/* Popup ให้เลือกวัตถุดิบ */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-4/5 max-w-xl">
            <h2 className="text-xl font-bold text-gray-800 mb-4">เลือกวัตถุดิบ</h2>
            <div className="grid grid-cols-4 gap-4">
              {ingredients.map((ingredient, index) => (
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
              <button onClick={searchRecipes} className="bg-green-500 text-white py-2 px-4 rounded shadow">ค้นหาสูตรอาหาร</button>
              <button onClick={() => setShowPopup(false)} className="bg-gray-400 text-white py-2 px-4 rounded shadow ml-2">ปิด</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
