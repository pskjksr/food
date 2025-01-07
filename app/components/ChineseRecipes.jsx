import React from 'react'
import data from '../data.js';
import Link from 'next/link';

export default function ChineseRecipes() {

    const ChineseRecipes = data.filter((item) => item.category === "Chinese");

  return (
    
      
    <div className="recipe-grid">
            {/* <!-- Card 3 --> */}
            {ChineseRecipes.map((item) => (
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
        
  
  );
}