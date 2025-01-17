import React from 'react'
import Link from 'next/link';
import Home from '../page';

function Navbar() {
  return (
    <div>
      <header >
        <div className="logo">LOGO</div>
        <nav>
          <ul>
            <li>
              <a href="/homepage">HOME</a>
            </li>
            <li>
              <a href="#">RECIPE</a>
            </li>
            <li>
              <Link href="/Categories">CATEGORIES</Link>
            </li>
          </ul>
        </nav>
        <div className="header-search">
          <div className="search-bar">
            <input type="text" />
            <div className="icon search-icon">
              <i className="fas fa-search"></i>
            </div>
          </div>
          <Link href="/profile" className="icon user-icon">
            <i className="fas fa-user"></i>
          </Link>
        </div>
      </header>
    </div>
  );
}

export default Navbar