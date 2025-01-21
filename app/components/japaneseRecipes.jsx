import React from "react";
import data from "../data.js";
import Link from "next/link";

export default function japaneseRecipes() {
  const japaneseRecipes = data.filter((item) => item.category === "Japanese");

  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-5">
      {/* <!-- Card 1 --> */}
      {japaneseRecipes.map((item) => (
        <div
          className="bg-gray-100 rounded-lg shadow-md overflow-hidden text-center transition-transform duration-300 ease-in-out flex flex-col hover:shadow-lg hover:-translate-y-1 relative"
          key={item.id}
        >
          {/* รูปภาพ */}
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
          {/* เนื้อหาในการ์ด */}
          <div className="relative p-4 text-center">
            <h3 className="mb-4">{item.title}</h3>
            {/* ปุ่ม RECIPE อยู่ในลิงก์ */}
            <Link href={`/RecipeDescription/${item.slug}`}>
              <button className="absolute right-4 bottom-1 px-4 py-2 bg-yellow-400 text-gray-800 text-sm rounded-md hover:bg-yellow-500 transition-colors duration-300">
                RECIPE
              </button>
            </Link>
          </div>

          {/* หัวใจในตำแหน่งที่ถูกต้อง */}
          <i className="fa-solid fa-heart absolute bottom-2 left-2 border-2 text-sm border-[#FFECC1] bg-[#EFBD4C] text-[#fbfbfb] hover:text-[#FFB100] hover:bg-[#FFECC1] hover:border-[#EFBD4C] active:bg-[#F8F8F8] rounded-full p-1.5 cursor-pointer"></i>
        </div>
      ))}
    </div>
  );
}
