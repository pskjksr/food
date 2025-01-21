import React from 'react';
import Link from 'next/link';

function Profile() {
  return (
    <div className="p-6 max-w-xl mx-auto font-sans">
      <h2 className="flex items-center text-2xl mb-6 text-gray-800">
        <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full mr-2"></span> Profile
      </h2>
      <div className="flex flex-row items-start rounded-lg">
        <div className="relative mr-12">
          <img
            src="shin.jpg"
            alt="Profile"
            className="w-72 h-60 rounded-lg object-cover shadow-sm"
          />
          <button className="absolute top-2 left-2 bg-black text-white rounded-full p-2 focus:outline-none flex items-center justify-center w-10 h-10">
            <i className="fas fa-camera text-sm"></i>
          </button>
        </div>
        <div>
          <p className="mb-2 text-gray-700">
            <strong>Name:</strong> <span className="block text-gray-500">user name</span>
          </p>
          <p className="mb-2 text-gray-700">
            <strong>Email:</strong> <span className="block text-gray-500">mi@fitufx.bo</span>
          </p>
          <p className="mb-2 text-gray-700">
            <strong>Phone Number:</strong> <span className="block text-gray-500">+20-01274318900</span>
          </p>
          <p className="mb-2 text-gray-700">
            <strong>Address:</strong> <span className="block text-gray-500">285 N Broad St, Elizabeth, NJ 07208, USA</span>
          </p>
          <div className="mt-4 flex">
            <button className="px-4 bg-white text-yellow-400 rounded-md shadow-md hover:bg-white hover:text-yellow-500 border border-yellow-400 transition">
              Recipe visits graph
            </button>
            <Link href="/Like" className="ml-4 px-4 py-2 bg-white text-yellow-500 rounded-md shadow-md hover:bg-white hover:text-yellow-400 border border-yellow-400 transition flex items-center">
              <i className="fas fa-heart"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;