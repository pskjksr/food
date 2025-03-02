"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Search from "../components/Search"; // ตรวจสอบ path ว่าตรงกับโครงสร้างโฟลเดอร์จริง
import { useSession, signOut } from "next-auth/react";


function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>(""); // ระบุประเภทให้ชัดเจน
  const router = useRouter();

  const { data: session, status: sessionStatus} = useSession(); // ดึงข้อมูล session จาก hook useSession

  useEffect(() => {
    if (sessionStatus == 'authenticated') {
      console.log("session", session);
    }
  }, []);

  const scrollToSection = () => {
    const section = document.getElementById("recipe-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${searchQuery}`);
    }
  };

  // ปิด dropdown เมื่อคลิกที่พื้นที่อื่น
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.querySelector('.relative.group');
      if (dropdown && !dropdown.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // ฟังก์ชัน logout
  const handleLogout = () => {
    // ลบ token ออกจาก localStorage หรือ cookies
    localStorage.removeItem("token");
    router.push("/login"); // รีไดเร็กต์ไปยังหน้า login
  };

  return (
    <div className="flex justify-between items-center font-semibold text-xl px-5 py-2 relative z-10">
      <div>
        <Image src="/logo.png" width={50} height={50} alt="logo" />
      </div>
      <nav className="ml-20">
        <ul className="flex gap-12">
          <li>
            <a className="text-[20px]" href="/homepage">
              HOME
            </a>
          </li>
          <li>
            <a className="cursor-pointer text-[20px]" onClick={scrollToSection}>
              RECIPE
            </a>
          </li>
          <li>
            <Link className="text-[20px]" href="/Categories">
              CATEGORIES
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex items-center gap-12">
        {/* ค้นหา */}
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />

        {/* ปุ่มโปรไฟล์ */}
        <div className="relative group">
          <div
            className="border-[#FFECC1] bg-[#EFBD4C] text-white border-2 rounded-full w-12 h-12 flex items-center overflow-hidden justify-center cursor-pointer hover:text-[#FFB100] hover:bg-[#FFECC1] hover:border-[#EFBD4C] active:bg-[#F8F8F8]"
            onClick={toggleDropdown}
          >
            {/* ถ้ามี session ให้แสดงรูปโปรไฟล์ */}
            {sessionStatus == 'authenticated' && session?.user?.profileImage && (
              <Image src={session.user.profileImage} width={50} height={50} alt="profile" className="w-full h-full object-cover" />
            )}
            {/* ถ้าไม่มี session ให้แสดงไอคอน user */}
            {sessionStatus != 'authenticated' && (
               <i className="fas fa-user group-hover:text-[#FFB100]"></i>
            )}
          </div>

          {/* เมนู Dropdown */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              {/* ถ้ายังไม่มี session ให้แสดงปุ่ม Login และ Register */}
              {sessionStatus == 'authenticated' && (
                <>
                  <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                  <button
                    onClick={() => signOut()} // เรียกใช้ฟังก์ชัน logout
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </>
              )}
              {sessionStatus != 'authenticated' && (
                <>
                  <Link href="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Login
                  </Link>
                  <Link href="/signup" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Register
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
