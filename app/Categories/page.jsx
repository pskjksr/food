"use client"
import React from "react";
import data from "../data";
import Link from "next/link";

export default function Breakfast() {
  const Breakfast = data.filter((item) => item.category === "Breakfast");
  const Lunch = data.filter((item) => item.category === "Lunch");
  const Dinner = data.filter((item) => item.category === "Dinner");
  const Dessert = data.filter((item) => item.category === "Dessert");
  const Drink = data.filter((item) => item.category === "Drink");

  return (
    <section className="recipe-section">
      <div className="recipe-category">
        <div className="ml-5 mt-5 font-semibold text-[26px] text-gray-700">
          <h2>Breakfast</h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-16 p-5">
          {/* <!-- Card 1 --> */}
          {Breakfast.map((item) => (
            <div
              className="bg-gray-100 rounded-lg shadow-md overflow-hidden text-center transition-transform duration-300 ease-in-out flex flex-col hover:shadow-lg hover:-translate-y-1 relative"
              key={item.id}
            >
              {/* รูปภาพ */}
              <div className="flex justify-center mt-5">
                <img
                  src={`/${item.image}`}
                  alt={item.title}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              </div>
              {/* เนื้อหาในการ์ด */}
              <div className="relative p-10 text-center">
                <h3 className="mb-14 text-[20px]">{item.title}</h3>
                {/* ปุ่ม RECIPE อยู่ในลิงก์ */}
                <Link href={`/RecipeDescription/${item.slug}`}>
                  <button className="absolute right-5 bottom-5 px-4 py-2 border-2 bg-yellow-400 text-gray-800 text-md rounded-xl border-[#FFECC1] hover:text-[#FFB100] hover:bg-[#FFECC1] hover:border-[#EFBD4C] active:bg-[#F8F8F8] transition-colors duration-300">
                    RECIPE
                  </button>
                </Link>
              </div>

              {/* หัวใจในตำแหน่งที่ถูกต้อง */}
              <i className="fa-solid fa-heart absolute bottom-5 left-5 border-2 text-xl border-[#FFECC1] bg-yellow-400 text-[#fbfbfb] hover:text-[#FFB100] hover:bg-[#FFECC1] hover:border-[#EFBD4C] active:bg-[#F8F8F8] rounded-full p-2 cursor-pointer"></i>
            </div>
          ))}
        </div>
      </div>

      <div className="recipe-category">
        <div className="ml-5 font-semibold text-[26px] text-gray-700">
          <h2>Lunch</h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-16 p-5">
          {/* <!-- Card 2 --> */}
          {Lunch.map((item) => (
            <div
              className="bg-gray-100 rounded-lg shadow-md overflow-hidden text-center transition-transform duration-300 ease-in-out flex flex-col hover:shadow-lg hover:-translate-y-1 relative"
              key={item.id}
            >
              {/* รูปภาพ */}
              <div className="flex justify-center mt-5">
                <img
                  src={`/${item.image}`}
                  alt={item.title}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              </div>
              {/* เนื้อหาในการ์ด */}
              <div className="relative p-10 text-center">
                <h3 className="mb-14 text-[20px]">{item.title}</h3>
                {/* ปุ่ม RECIPE อยู่ในลิงก์ */}
                <Link href={`/RecipeDescription/${item.slug}`}>
                  <button className="absolute right-5 bottom-5 px-4 py-2 border-2 bg-yellow-400 text-gray-800 text-md rounded-xl border-[#FFECC1] hover:text-[#FFB100] hover:bg-[#FFECC1] hover:border-[#EFBD4C] active:bg-[#F8F8F8] transition-colors duration-300">
                    RECIPE
                  </button>
                </Link>
              </div>

              {/* หัวใจในตำแหน่งที่ถูกต้อง */}
              <i className="fa-solid fa-heart absolute bottom-5 left-5 border-2 text-xl border-[#FFECC1] bg-yellow-400 text-[#fbfbfb] hover:text-[#FFB100] hover:bg-[#FFECC1] hover:border-[#EFBD4C] active:bg-[#F8F8F8] rounded-full p-2 cursor-pointer"></i>
            </div>
          ))}
        </div>
      </div>

      <div className="recipe-category">
        <div className="ml-5 font-semibold text-[26px] text-gray-700">
          <h2>Dinner</h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-16 p-5">
          {/* <!-- Card 3 --> */}
          {Dinner.map((item) => (
            <div
              className="bg-gray-100 rounded-lg shadow-md overflow-hidden text-center transition-transform duration-300 ease-in-out flex flex-col hover:shadow-lg hover:-translate-y-1 relative"
              key={item.id}
            >
              {/* รูปภาพ */}
              <div className="flex justify-center mt-5">
                <img
                  src={`/${item.image}`}
                  alt={item.title}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              </div>
              {/* เนื้อหาในการ์ด */}
              <div className="relative p-10 text-center">
                <h3 className="mb-14 text-[20px]">{item.title}</h3>
                {/* ปุ่ม RECIPE อยู่ในลิงก์ */}
                <Link href={`/RecipeDescription/${item.slug}`}>
                  <button className="absolute right-5 bottom-5 px-4 py-2 border-2 bg-yellow-400 text-gray-800 text-md rounded-xl border-[#FFECC1] hover:text-[#FFB100] hover:bg-[#FFECC1] hover:border-[#EFBD4C] active:bg-[#F8F8F8] transition-colors duration-300">
                    RECIPE
                  </button>
                </Link>
              </div>

              {/* หัวใจในตำแหน่งที่ถูกต้อง */}
              <i className="fa-solid fa-heart absolute bottom-5 left-5 border-2 text-xl border-[#FFECC1] bg-yellow-400 text-[#fbfbfb] hover:text-[#FFB100] hover:bg-[#FFECC1] hover:border-[#EFBD4C] active:bg-[#F8F8F8] rounded-full p-2 cursor-pointer"></i>
            </div>
          ))}
        </div>
      </div>

      <div className="recipe-category">
        <div className="ml-5 font-semibold text-[26px] text-gray-700">
          <h2>Dessert</h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-16 p-5">
          {/* <!-- Card 4 --> */}
          {Dessert.map((item) => (
            <div
              className="bg-gray-100 rounded-lg shadow-md overflow-hidden text-center transition-transform duration-300 ease-in-out flex flex-col hover:shadow-lg hover:-translate-y-1 relative"
              key={item.id}
            >
              {/* รูปภาพ */}
              <div className="flex justify-center mt-5">
                <img
                  src={`/${item.image}`}
                  alt={item.title}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              </div>
              {/* เนื้อหาในการ์ด */}
              <div className="relative p-10 text-center">
                <h3 className="mb-14 text-[20px]">{item.title}</h3>
                {/* ปุ่ม RECIPE อยู่ในลิงก์ */}
                <Link href={`/RecipeDescription/${item.slug}`}>
                  <button className="absolute right-5 bottom-5 px-4 py-2 border-2 bg-yellow-400 text-gray-800 text-md rounded-xl border-[#FFECC1] hover:text-[#FFB100] hover:bg-[#FFECC1] hover:border-[#EFBD4C] active:bg-[#F8F8F8] transition-colors duration-300">
                    RECIPE
                  </button>
                </Link>
              </div>

              {/* หัวใจในตำแหน่งที่ถูกต้อง */}
              <i className="fa-solid fa-heart absolute bottom-5 left-5 border-2 text-xl border-[#FFECC1] bg-yellow-400 text-[#fbfbfb] hover:text-[#FFB100] hover:bg-[#FFECC1] hover:border-[#EFBD4C] active:bg-[#F8F8F8] rounded-full p-2 cursor-pointer"></i>
            </div>
          ))}
        </div>
      </div>

      <div className="recipe-category">
        <div className="ml-5 font-semibold text-[26px] text-gray-700">
          <h2>Drink</h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-16 p-5">
          {/* <!-- Card 5 --> */}
          {Drink.map((item) => (
            <div
              className="bg-gray-100 rounded-lg shadow-md overflow-hidden text-center transition-transform duration-300 ease-in-out flex flex-col hover:shadow-lg hover:-translate-y-1 relative"
              key={item.id}
            >
              {/* รูปภาพ */}
              <div className="flex justify-center mt-5">
                <img
                  src={`/${item.image}`}
                  alt={item.title}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              </div>
              {/* เนื้อหาในการ์ด */}
              <div className="relative p-10 text-center">
                <h3 className="mb-14 text-[18px]">{item.title}</h3>
                {/* ปุ่ม RECIPE อยู่ในลิงก์ */}
                <Link href={`/RecipeDescription/${item.slug}`}>
                  <button className="absolute right-5 bottom-5 px-4 py-2 border-2 bg-yellow-400 text-gray-800 text-md rounded-xl border-[#FFECC1] hover:text-[#FFB100] hover:bg-[#FFECC1] hover:border-[#EFBD4C] active:bg-[#F8F8F8] transition-colors duration-300">
                    RECIPE
                  </button>
                </Link>
              </div>

              {/* หัวใจในตำแหน่งที่ถูกต้อง */}
              <i className="fa-solid fa-heart absolute bottom-5 left-5 border-2 text-xl border-[#FFECC1] bg-yellow-400 text-[#fbfbfb] hover:text-[#FFB100] hover:bg-[#FFECC1] hover:border-[#EFBD4C] active:bg-[#F8F8F8] rounded-full p-2 cursor-pointer"></i>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
