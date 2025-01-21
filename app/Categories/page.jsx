import React from "react";
import data from "../data";
import Link from "next/link";
import "../homepage/Homepage.css";

export default function Breakfast() {
  const Breakfast = data.filter((item) => item.category === "Breakfast");
  const Lunch = data.filter((item) => item.category === "Lunch");
  const Dinner = data.filter((item) => item.category === "Dinner");
  const Dessert = data.filter((item) => item.category === "Dessert");
  const Drink = data.filter((item) => item.category === "Drink");

  return (
    <section className="recipe-section">
      <div className="recipe-category">
        <h2>Breakfast</h2>
        <div className="recipe-grid">
          {/* <!-- Card 1 --> */}
          {Breakfast.map((item) => (
            <div className="recipe-card" key={item.id}>
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
              <div className="card-content">
                <h3>{item.title}</h3>
                <Link href={`/RecipeDescription/${item.slug}`}>
                  <button>RECIPE</button>
                </Link>
                {/* หัวใจในตำแหน่งที่ถูกต้อง */}
                <i className="fa-solid fa-heart absolute bottom-2 left-2 border-2 text-sm border-[#FFECC1] bg-[#EFBD4C] text-[#fbfbfb] hover:text-[#FFB100] hover:bg-[#FFECC1] hover:border-[#EFBD4C] active:bg-[#F8F8F8] rounded-full p-1.5 cursor-pointer"></i>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="recipe-category">
        <h2>Lunch</h2>
        <div className="recipe-grid">
          {/* <!-- Card 2 --> */}
          {Lunch.map((item) => (
            <div className="recipe-card" key={item.id}>
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
              <div className="card-content">
                <h3>{item.title}</h3>
                <Link href={`/RecipeDescription/${item.slug}`}>
                  <button>RECIPE</button>
                </Link>
                {/* หัวใจในตำแหน่งที่ถูกต้อง */}
                <i className="fa-solid fa-heart absolute bottom-2 left-2 border-2 text-sm border-[#FFECC1] bg-[#EFBD4C] text-[#fbfbfb] hover:text-[#FFB100] hover:bg-[#FFECC1] hover:border-[#EFBD4C] active:bg-[#F8F8F8] rounded-full p-1.5 cursor-pointer"></i>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="recipe-category">
        <h2>Dinner</h2>
        <div className="recipe-grid">
          {/* <!-- Card 3 --> */}
          {Dinner.map((item) => (
            <div className="recipe-card" key={item.id}>
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
              <div className="card-content">
                <h3>{item.title}</h3>
                <Link href={`/RecipeDescription/${item.slug}`}>
                  <button>RECIPE</button>
                </Link>
                {/* หัวใจในตำแหน่งที่ถูกต้อง */}
                <i className="fa-solid fa-heart absolute bottom-2 left-2 border-2 text-sm border-[#FFECC1] bg-[#EFBD4C] text-[#fbfbfb] hover:text-[#FFB100] hover:bg-[#FFECC1] hover:border-[#EFBD4C] active:bg-[#F8F8F8] rounded-full p-1.5 cursor-pointer"></i>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="recipe-category">
        <h2>Dessert</h2>
        <div className="recipe-grid">
          {/* <!-- Card 4 --> */}
          {Dessert.map((item) => (
            <div className="recipe-card" key={item.id}>
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
              <div className="card-content">
                <h3>{item.title}</h3>
                <Link href={`/RecipeDescription/${item.slug}`}>
                  <button>RECIPE</button>
                </Link>
                {/* หัวใจในตำแหน่งที่ถูกต้อง */}
                <i className="fa-solid fa-heart absolute bottom-2 left-2 border-2 text-sm border-[#FFECC1] bg-[#EFBD4C] text-[#fbfbfb] hover:text-[#FFB100] hover:bg-[#FFECC1] hover:border-[#EFBD4C] active:bg-[#F8F8F8] rounded-full p-1.5 cursor-pointer"></i>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="recipe-category">
        <h2>Drink</h2>
        <div className="recipe-grid">
          {/* <!-- Card 5 --> */}
          {Drink.map((item) => (
            <div className="recipe-card" key={item.id}>
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
              <div className="card-content">
                <h3>{item.title}</h3>
                <Link href={`/RecipeDescription/${item.slug}`}>
                  <button>RECIPE</button>
                </Link>
                {/* หัวใจในตำแหน่งที่ถูกต้อง */}
                <i className="fa-solid fa-heart absolute bottom-2 left-2 border-2 text-sm border-[#FFECC1] bg-[#EFBD4C] text-[#fbfbfb] hover:text-[#FFB100] hover:bg-[#FFECC1] hover:border-[#EFBD4C] active:bg-[#F8F8F8] rounded-full p-1.5 cursor-pointer"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
