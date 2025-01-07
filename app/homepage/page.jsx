import React from 'react'
import "./Homepage.css"
import Link from 'next/link'
import data from '../data.js'
import ThaiRecipes from '../components/thaiRecipes'
import JapaneseRecipes from '../components/japaneseRecipes'
import ChineseRecipes from '../components/ChineseRecipes'
import WesternRecipes from '../components/WesternRecipes'
import CleanEatingRecipes from '../components/CleanEatingRecipes'

function page() {
  const randomRecipes = data
  .sort(() => 0.5 - Math.random()) // สุ่มเรียงลำดับข้อมูล
  .slice(0, 4); // เลือกมา 4 ข้อมูลแรก
  
  return (
    <div>
      <section className="highlight">
        <div className="highlight-content">
          <img src="teokbokki.png" alt="Tteokbokki" />
          <div className="info">
            <h1>Tteokbokki : 떡볶이</h1>
            <p>
              Tteokbokki is a popular Korean street food made from soft rice
              cakes, fish cakes, and a sweet and spicy sauce called gochujang.
              It’s often garnished with boiled eggs, scallions, or sesame seeds.
              This dish is loved for its chewy texture and bold flavors, making
              it a favorite comfort food in Korea.
            </p>
            <Link href="/RecipeDescription/tteokbokki">
              <button className="recipe-button">RECIPE</button>
            </Link>
          </div>
        </div>
      </section>

      <section className="recipe-section">
        <h1 className="section-title">
          RECIPE <span className="add-icon">+</span>
        </h1>
        <div className="recipe-category">
          <h2>Japanese Cruisene</h2>
          <JapaneseRecipes />
        </div>
      </section>

      <section className="recipe-section">
        <div className="recipe-category">
          <h2>Thai Cruisene</h2>
          <ThaiRecipes />
        </div>
      </section>

      <section className="recipe-section">
        <div className="recipe-category">
          <h2>Chinese Cuisine</h2>
          <ChineseRecipes />
        </div>
      </section>

      <section className="recipe-section">
        <div className="recipe-category">
          <h2>Western Cuisine</h2>
          <WesternRecipes />
        </div>
      </section>

      <section className="recipe-section">
        <div className="recipe-category">
          <h2>Clean Eating Cuisine</h2>
          <CleanEatingRecipes />
        </div>
      </section>

    </div>
  );
}

export default page