"use client"
import React from "react";
import data from "../data";
import Link from "next/link";

function Like() {
  const Breakfast = data.filter((item) => item.category === "Breakfast");

  return (
    <section className="recipe-section">
      <div className="recipe-category">
        <h2 className="p-5 text-2xl ">
          <span style={{ color: "#EFBD4C" }}>●</span> like
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-5 p-5">
          {/* <!-- Card 1 --> */}
          {Breakfast.map((item) => (
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Like;
