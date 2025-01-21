import React from "react";
import data from "../data";
import Link from "next/link";

export default function random() {
  const randomRecipes = data
    .sort(() => 0.5 - Math.random()) // สุ่มเรียงลำดับข้อมูล
    .slice(0, 4); // เลือกมา 4 ข้อมูลแรก

  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-5">
      {randomRecipes.map((item) => (
        <div
          className="bg-gray-100 rounded-lg shadow-md overflow-hidden text-center transition-transform duration-300 ease-in-out flex flex-col hover:shadow-lg hover:-translate-y-1 relative"
          key={item.id}
        >
          <div className="flex justify-center">
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
          <div className="relative p-4 text-center">
            <h3 className="mb-4">{item.title}</h3>
            {/* ปุ่ม RECIPE อยู่ในลิงก์ */}
            <Link href={`/RecipeDescription/${item.slug}`}>
              <button className="absolute right-4 bottom-1 px-4 py-2 bg-yellow-400 text-gray-800 text-sm rounded-md hover:bg-yellow-500 transition-colors duration-300">
                RECIPE
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
