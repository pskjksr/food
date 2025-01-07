import React from 'react'
import data from '../data'
import Link from 'next/link';

export default function random() {

    const randomRecipes = data
    .sort(() => 0.5 - Math.random()) // สุ่มเรียงลำดับข้อมูล
    .slice(0, 4); // เลือกมา 4 ข้อมูลแรก

  return (
    <div className="recipe-grid">
            {randomRecipes.map((item) => (
              <Link href={`/RecipeDescription/${item.slug}`} key={item.id}>
                <div className="recipe-card">
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
                    <button>RECIPE</button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
  )
}
