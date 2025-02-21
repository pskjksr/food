"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

function Profile() {
  const DEFAULT_IMAGE = "/uploads/default-avatar.jpg"; // รูปโปรไฟล์เริ่มต้น

  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string>(DEFAULT_IMAGE);

  // ดึงข้อมูลผู้ใช้จาก API (GET /api/user)
  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setName(data.name || ""); // ใช้ค่า API ถ้ามี
          setEmail(data.email || ""); // ใช้ค่า API ถ้ามี
          setProfileImage(data.profileImage || DEFAULT_IMAGE);
        }
      })
      .catch((err) => console.error("Error fetching user data:", err));
  }, []);

  // ฟังก์ชันสำหรับบันทึกข้อมูลอัปเดต (PUT /api/user)
  const handleSave = () => {
    fetch("/api/user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, profileImage }),
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data.name || "");
        setProfileImage(data.profileImage || DEFAULT_IMAGE);
        setIsEditing(false);
      })
      .catch((err) => console.error("Error updating profile:", err));
  };

  // ฟังก์ชันสำหรับอัปโหลดรูปโปรไฟล์ (POST /api/upload)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);

      fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.imageUrl) {
            setProfileImage(data.imageUrl);
          } else {
            console.error("Upload error:", data.error);
            setProfileImage(DEFAULT_IMAGE);
          }
        })
        .catch((err) => {
          console.error("Error uploading image:", err);
          setProfileImage(DEFAULT_IMAGE);
        });
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto font-sans">
      <h2 className="flex items-center text-2xl mb-6 text-gray-800">
        <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full mr-2"></span> Profile
      </h2>
      <div className="flex flex-row items-start rounded-lg">
        <div className="relative mr-12">
          <Image
            src={profileImage}
            alt="Profile"
            width={288}
            height={240}
            className="rounded-lg object-cover shadow-sm"
          />
          <label
            htmlFor="image-upload"
            className="absolute top-2 left-2 bg-black text-white rounded-full p-2 cursor-pointer w-10 h-10 flex items-center justify-center"
          >
            📷
          </label>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
        <div>
          <p className="mb-2 text-gray-700">
            <strong>Name:</strong>
            {isEditing ? (
              <input
                type="text"
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
                className="border p-1 ml-2"
              />
            ) : (
              <span className="block text-gray-500">{name || "Loading..."}</span>
            )}
          </p>
          <p className="mb-4 text-gray-700">
            <strong>Email:</strong> <span className="text-gray-500">{email || "Loading..."}</span>
          </p>
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-1 rounded-md"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-gray-300 px-3 py-1 rounded-md"
            >
              Edit
            </button>
          )}
        </div>
      </div>
      <div className="mt-6 flex space-x-4">
        <Link href="/Like" className="bg-green-500 text-white px-4 py-2 rounded-md">
          My Likes
        </Link>
        <Link href="/dashboard" className="bg-purple-500 text-white px-4 py-2 rounded-md">
          Dashboard
        </Link>
      </div>
    </div>
  );
}

export default Profile;
