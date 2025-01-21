"use client"
import React from 'react';
import Link from 'next/link';


function Navbar() {
  const scrollToSection = () => {
    const section = document.getElementById('recipe-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex justify-between items-center font-semibold text-xl px-5 py-2">
      <div>LOGO</div>
      <nav className="ml-40">
        <ul className="flex gap-5">
          <li>
            <a href="/homepage">HOME</a>
          </li>
          <li>
            <a className="cursor-pointer" onClick={scrollToSection}>
              RECIPE
            </a>
          </li>
          <li>
            <Link href="/Categories">CATEGORIES</Link>
          </li>
        </ul>
      </nav>
      <div className="flex items-center gap-6">
        <div className="bg-yellow-500 flex rounded-full p-1">
          <input
            type="text"
            className="bg-transparent rounded-full outline-yellow-500"
          />
          <div className="p-1">
            <i className="fas fa-search text-white"></i>
          </div>
        </div>
        <div className="bg-yellow-500 rounded-full w-12 h-12 flex items-center text-center justify-center">
          <Link href="/profile">
            <i className="fas fa-user text-white"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
