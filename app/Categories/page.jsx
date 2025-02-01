"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function RecipeCategories() {
  const [breakfastData, setBreakfastData] = useState([]);
  const [lunchData, setLunchData] = useState([]);
  const [dinnerData, setDinnerData] = useState([]);
  const [dessertData, setDessertData] = useState([]);
  const [drinkData, setDrinkData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define API_URL as the base URL
  const API_URL = "http://localhost:3000"; // Add this line to define the base URL

  // Function to fetch data based on categoryId
  const fetchData = async (categoryId) => {
    try {
      const response = await fetch(`${API_URL}/api/recipes?categoryId=${categoryId}`);
      const result = await response.json();
      return result; // Return fetched data
    } catch (error) {
      console.error("Error fetching recipes:", error);
      return []; // Return empty array in case of an error
    }
  };

  useEffect(() => {
    const loadData = async () => {
      // Fetch data based on categoryId (adjust the ids as needed)
      const breakfast = await fetchData(21); // Example: categoryId for Breakfast is 21
      const lunch = await fetchData(23); // Example: categoryId for Lunch is 23
      const dinner = await fetchData(22); // Example: categoryId for Dinner is 22
      const dessert = await fetchData(24); // Example: categoryId for Dessert is 24
      const drink = await fetchData(25); // Example: categoryId for Drink is 25

      // Set the state with the fetched data
      setBreakfastData(breakfast);
      setLunchData(lunch);
      setDinnerData(dinner);
      setDessertData(dessert);
      setDrinkData(drink);

      setLoading(false); // Set loading to false after fetching data
    };

    loadData(); // Fetch data when the component mounts
  }, []);

  // Render a loading message while data is being fetched
  if (loading) {
    return (
      <div className="p-4">
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-5">
          {/* This part renders a loading message or skeleton instead of actual recipes */}
          <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden text-center 
                          transition-transform duration-300 ease-in-out flex flex-col 
                          hover:shadow-lg hover:-translate-y-1 relative">
            <div className="flex justify-center p-2">
              <div className="w-40 h-40 bg-gray-300 rounded-md animate-pulse"></div>
            </div>
            <div className="relative p-4 text-center">
              <div className="mb-4 font-semibold text-lg bg-gray-300 rounded-md animate-pulse w-3/4 mx-auto"></div>
              <div className="bg-gray-300 rounded-md animate-pulse w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render recipe data after loading
  const renderCategory = (categoryData, categoryTitle) => (
    <div className="recipe-category">
      <div className="ml-5 font-semibold text-lg text-gray-700">
        <h2>{categoryTitle}</h2>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-5 p-5">
        {/* Only show the first 5 items */}
        {categoryData.slice(0, 5).map((item) => (
          <div
            key={item.id}
            className="bg-gray-100 rounded-lg shadow-md overflow-hidden text-center 
                      transition-transform duration-300 ease-in-out flex flex-col 
                      hover:shadow-lg hover:-translate-y-1 relative"
          >
            {/* Image Section */}
            <div className="flex justify-center p-2">
              <img
                src={item.image ? `${API_URL}/${item.image}` : "/fallback-image.jpg"}
                alt={item.name || "Recipe Image"}
                className="w-40 h-40 object-cover rounded-md"
                onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
              />
            </div>

            {/* Card Content */}
            <div className="relative p-4 text-center">
              <h3 className="mb-4 font-semibold text-lg">{item.name}</h3>
              {item.id ? (
                <Link href={`/RecipeDescription/${item.id}`}>
                  <button className="absolute right-4 bottom-1 px-4 py-2 bg-yellow-400 
                                      text-gray-800 text-sm rounded-md hover:bg-yellow-500 
                                      transition-colors duration-300">
                    RECIPE
                  </button>
                </Link>
              ) : (
                <p className="text-gray-500 text-sm">Recipe coming soon!</p>
              )}
            </div>

            {/* Heart Icon (Favorite) */}
            <i className="fa-solid fa-heart absolute bottom-2 left-2 border-2 text-sm border-[#FFECC1] 
                          bg-[#EFBD4C] text-white hover:text-[#FFB100] hover:bg-[#FFECC1] 
                          hover:border-[#EFBD4C] active:bg-[#F8F8F8] rounded-full p-1.5 cursor-pointer"></i>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="recipe-section">
      {renderCategory(breakfastData, "Breakfast")}
      {renderCategory(lunchData, "Lunch")}
      {renderCategory(dinnerData, "Dinner")}
      {renderCategory(dessertData, "Dessert")}
      {renderCategory(drinkData, "Drink")}
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
