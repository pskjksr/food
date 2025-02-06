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
    <div className="flex justify-between items-center  font-semibold text-xl px-5 py-2 relative z-10">
      <div><Image src="/logo.png" width={50} height={50} alt="logo" /></div>
      <nav className="ml-20">
        <ul className="flex gap-12">
          <li>
            <a className='text-[20px]' href="/homepage">HOME</a>
          </li>
          <li>
            <a className="cursor-pointer text-[20px]" onClick={scrollToSection}>
              RECIPE
            </a>
          </li>
          <li>
            <Link className='text-[20px]' href="/Categories">CATEGORIES</Link>
          </li>
        </ul>
      </nav>
      <div className="flex items-center gap-12">
       <div className="bg-[#EFBD4C] flex items-center rounded-full p-1 group hover:bg-[#FFECC1]  border-2 border-[#FFECC1]">
  {/* ช่อง Input */}
  <input
    type="text"
    className="bg-transparent rounded-full   px-4 outline-none text-white placeholder-white group-hover:text-[#FFB100] "
  />

  {/* ไอคอนค้นหา */}
  <div className="p-2">
    <i className="fas fa-search text-white group-hover:text-[#FFB100]"></i>
  </div>
</div>

       <div className="relative group">
  {/* ปุ่มโปรไฟล์ */}
  <div
    className="border-[#FFECC1] 
               bg-[#EFBD4C] text-white border-2 rounded-full 
               w-12 h-12 flex items-center justify-center cursor-pointer
               hover:text-[#FFB100] hover:bg-[#FFECC1] hover:border-[#EFBD4C] 
               active:bg-[#F8F8F8]"
    onClick={toggleDropdown}
  >
    <i className="fas fa-user group-hover:text-[#FFB100]"></i>
  </div>

  {/* Dropdown Menu */}
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
