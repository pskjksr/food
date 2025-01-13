import React from 'react';
import data from '../data.js';
import Link from 'next/link';

export default function japaneseRecipes() {
  
  const japaneseRecipes = data.filter((item) => item.category === 'Japanese');

  return (


    <div className="recipe-grid">
      {/* <!-- Card 1 --> */}
      {japaneseRecipes.map((item) => (
        <div className="recipe-card relative" key={item.id}>
          {/* รูปภาพ */}
          <div className="flex justify-center">
            <img
              src={`/${item.image}`}
              alt={item.title}
              style={{
                width: '150px',
                height: '150px',
                objectFit: 'cover',
              }}
            />
          </div>
          {/* เนื้อหาในการ์ด */}
          <div className="card-content text-center">
            <h3>{item.title}</h3>
            {/* ปุ่ม RECIPE อยู่ในลิงก์ */}
            <Link href={`/RecipeDescription/${item.slug}`}>
              <button>
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
