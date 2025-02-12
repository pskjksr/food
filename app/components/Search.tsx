"use client";
import React, { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation"; // ใช้ useRouter

interface SearchProps {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  handleSearch: (event: React.FormEvent) => void;
}

const Search: React.FC<SearchProps> = ({ searchQuery, setSearchQuery, handleSearch }) => {
  const router = useRouter(); // ใช้ useRouter

  // การค้นหาที่จะนำไปที่หน้าใหม่เมื่อค้นหาสำเร็จ
  const handleSearchWithRedirect = (event: React.FormEvent) => {
    event.preventDefault(); // ป้องกันไม่ให้หน้ารีเฟรช
    // แปลง searchQuery ให้เป็นเส้นทางที่สามารถไปได้
    const encodedQuery = encodeURIComponent(searchQuery.trim());
    // เปลี่ยนเส้นทางไปยังหน้า RecipeDescription โดยใช้ searchQuery
    if (encodedQuery) {
      router.push(`/RecipeDescription/${encodedQuery}`);
    }
  };

  return (
    <form onSubmit={handleSearchWithRedirect}>
      <div className="bg-[#EFBD4C] flex items-center rounded-full p-1 group hover:bg-[#FFECC1] border-2 border-[#FFECC1]">
        <input
          type="text"
          className="bg-transparent rounded-full px-4 outline-none text-white placeholder-white group-hover:text-[#FFB100]"
          placeholder="ค้นหา..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="p-2 cursor-pointer" onClick={handleSearchWithRedirect}>
          <i className="fas fa-search text-white group-hover:text-[#FFB100]"></i>
        </div>
      </div>
    </form>
  );
};

export default Search;
