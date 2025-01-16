import React from 'react';
import './Profile.css';
import Link from 'next/link';

function Profile() {
  return (
    <div className="profile-container">
      <h2 className="profile-title">
        <span className="title-highlight"></span> Profile
      </h2>
      <div className="profile-card">
        <div className="profile-image">
          <img src="shin.jpg" alt="Profile" />
          <button className="edit-button">
            <i className="fas fa-camera"></i>
          </button>
        </div>
        <div className="profile-info">
          <p>
            <strong>Name:</strong> 
          </p>
          <p>user name</p>
          <p>
            <strong>Email:</strong> 
          </p>
          <p>mi@fitufx.bo</p>
          <p>
            <strong>Phone Number:</strong>
          </p>
          <p>+20-01274318900</p>
          <p>
            <strong>Address:</strong>
          </p>
          <p>285 N Broad St, Elizabeth, NJ 07208, USA</p>
          <div className="profile-actions">
            <button className="graph-button">Recipe visits graph</button>
            <button className="favorite-button">
            <Link href="/Like" style={{ textDecoration: "none", color: "inherit" }}>
            <i className="fas fa-heart"></i>
            </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
