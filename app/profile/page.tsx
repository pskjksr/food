"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

function Profile() {
  const [name, setName] = useState('user name');
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null); // State สำหรับเก็บภาพที่อัพโหลด

  useEffect(() => {
    fetch('/api/user')
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setImage(data.image || 'shin.jpg'); // หากไม่มีภาพให้แสดงค่าเริ่มต้น
      })
      .catch((err) => console.error('Error fetching user data:', err));
  }, []);

  const handleSave = () => {
    fetch('/api/user', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, image })
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setImage(data.image); // หากได้รูปภาพใหม่มา ให้ใช้รูปที่อัพเดต
        setIsEditing(false);
      })
      .catch((err) => console.error('Error updating name:', err));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('image', file);

      // ส่งข้อมูลไปที่ server
      fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
        .then((res) => res.json())
        .then((data) => {
          setImage(data.imageUrl); // สมมติว่า server ส่ง URL ของภาพที่อัพโหลด
        })
        .catch((err) => console.error('Error uploading image:', err));
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto font-sans">
      <h2 className="flex items-center text-2xl mb-6 text-gray-800">
        <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full mr-2"></span> Profile
      </h2>
      <div className="flex flex-row items-start rounded-lg">
        <div className="relative mr-12">
          <img
            src={image ? image : '/shin.jpg'} // แสดงภาพที่อัพโหลดหรือภาพเริ่มต้น
            alt="Profile"
            className="w-72 h-60 rounded-lg object-cover shadow-sm"
          />
          <label htmlFor="image-upload" className="absolute top-2 left-2 bg-black text-white rounded-full p-2 focus:outline-none w-10 h-10 cursor-pointer">
            <i className="fas fa-camera text-sm"></i>
          </label>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden" // ซ่อนปุ่ม input
          />
        </div>
        <div>
          <p className="mb-2 text-gray-700">
            <strong>Name:</strong>
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-1 ml-2"
              />
            ) : (
              <span className="block text-gray-500">{name}</span>
            )}
          </p>
          
          {isEditing ? (
            <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-1 rounded-md">Save</button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="bg-gray-300 px-3 py-1 rounded-md">Edit</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
