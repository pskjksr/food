import React from "react";
import data from "../data";
import Link from "next/link";

function Like() {
  const Breakfast = data.filter((item) => item.category === "Breakfast");

  return (
    <section className="recipe-section">
      <div className="recipe-category">
        <h2>
          <span style={{ color: "#EFBD4C" }}>●</span> like
        </h2>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Like;
