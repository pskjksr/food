"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const scrollToSection = () => {
    const section = document.getElementById('recipe-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex justify-between items-center  font-semibold text-xl px-5 py-2 ">
      <div className='z-50'><Image src="/logo.png" width={50} height={50} alt="logo" /></div>
      <nav className="ml-40">
        <ul className="flex gap-20">
          <li>
            <a className='text-[25px]' href="/homepage">HOME</a>
          </li>
          <li>
            <a className="cursor-pointer text-[25px]" onClick={scrollToSection}>
              RECIPE
            </a>
          </li>
          <li>
            <Link className='text-[25px]' href="/Categories">CATEGORIES</Link>
          </li>
        </ul>
      </nav>
      <div className="flex items-center gap-12">
        <div className="bg-yellow-500 flex rounded-full p-1">
          <input
            type="text"
            className="bg-transparent rounded-full px-4 outline-yellow-500"
          />
          <div className="p-1">
            <i className="fas fa-search pr-2 text-white"></i>
          </div>
        </div>
        <div className="relative">
          <div
            className="bg-yellow-500 rounded-full w-12 h-12  flex items-center text-center justify-center cursor-pointer"
            onClick={toggleDropdown}
          >
            <i className="fas fa-user text-white"></i>
          </div>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              <Link
                href="/profile"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Profile
              </Link>
              <button
                onClick={() => alert("Logging out...")}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
