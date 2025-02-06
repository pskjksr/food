"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

function Like() {
  const [breakfastData, setBreakfastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from API
    fetch("") // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        // Filter breakfast items from the fetched data
        const breakfastItems = data.filter((item) => item.category === "Breakfast");
        setBreakfastData(breakfastItems);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="recipe-section">
      <div className="recipe-category">
        <h2 className="p-5 text-2xl ">
          <span style={{ color: "#EFBD4C" }}>●</span> like
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-5 p-5">
          {/* Render breakfast items */}
          {breakfastData.map((item) => (
            <div
              className="bg-gray-100 rounded-lg shadow-md overflow-hidden text-center transition-transform duration-300 ease-in-out flex flex-col hover:shadow-lg hover:-translate-y-1 relative"
              key={item.id}
            >
              {/* Image */}
              <div className="flex justify-center">
                <img
                  src={`/${item.image}`} // Assuming image is served locally
                  alt={item.title}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              </div>
              {/* Card Content */}
              <div className="relative p-4 text-center">
                <h3 className="mb-4">{item.title}</h3>
                {/* Recipe Button */}
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
