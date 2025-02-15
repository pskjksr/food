"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

function Profile() {
  const [name, setName] = useState('User Name');
  const [email, setEmail] = useState('user@example.com');
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetch('/api/user')
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setEmail(data.email);
        setImage(data.image || '/shin.jpg');
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
        setImage(data.image);
        setIsEditing(false);
      })
      .catch((err) => console.error('Error updating profile:', err));
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('image', file);

      fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
        .then((res) => res.json())
        .then((data) => {
          setImage(data.imageUrl);
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
            src={image}
            alt="Profile"
            className="w-72 h-60 rounded-lg object-cover shadow-sm"
          />
          <label htmlFor="image-upload" className="absolute top-2 left-2 bg-black text-white rounded-full p-2 cursor-pointer w-10 h-10 flex items-center justify-center">
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-1 ml-2"
              />
            ) : (
              <span className="block text-gray-500">{name}</span>
            )}
          </p>
          <p className="mb-4 text-gray-700">
            <strong>Email:</strong> <span className="text-gray-500">{email}</span>
          </p>
          {isEditing ? (
            <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-1 rounded-md">Save</button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="bg-gray-300 px-3 py-1 rounded-md">Edit</button>
          )}
        </div>
      </div>
      <div className="mt-6 flex space-x-4">
        <Link href="/likes" className="bg-green-500 text-white px-4 py-2 rounded-md">My Likes</Link>
        <Link href="/dashboard" className="bg-purple-500 text-white px-4 py-2 rounded-md">Dashboard</Link>
      </div>
    </div>
  );
}

export default Profile;
