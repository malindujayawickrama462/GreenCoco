import './header.css';
import React from 'react';

export default function Header() {

  const home = "HOME";
  const service = "SERVICES";
  const about = "ABOUT US";
  const cont = "CONTACT US";

  return (
    <div>
    
       <div className="header">
      <h1 className="title">GREENCOCO</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
        />
      </div>
      <nav className="nav">
        <ul className="navList">
          <li className="navItem"><a href="/" className="navLink">{home}</a></li>
          <li className="navItem"><a href="/" className="navLink">{service}</a></li>
          <li className="navItem"><a href="/about" className="navLink">{about}</a></li>
          <li className="navItem"><a href="/contact" className="navLink">{cont}</a></li>
        </ul>
      </nav>
    </div>

    <nav className="secondary-nav">
        <ul className="secondary-navList">
          <li className="secondary-navItem"><a href="/products" className="secondary-navLink">Inventory</a></li>
          <li className="secondary-navItem"><a href="/services" className="secondary-navLink">User</a></li>
          <li className="secondary-navItem"><a href="/blog" className="secondary-navLink">Supplier</a></li>
          <li className="secondary-navItem"><a href="/support" className="secondary-navLink">Transport & Delivary</a></li>
          <li className="secondary-navItem"><a href="/support" className="secondary-navLink">Financial</a></li>
          <li className="secondary-navItem"><a href="/support" className="secondary-navLink">Employee</a></li>
        </ul>
      </nav>

    </div>

    

  )
}
