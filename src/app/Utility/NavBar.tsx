import React from 'react';
import './nav.css'; 

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <a href="/ChatPage" className="nav-link">Chat</a>
        </li>
        <li className="nav-item">
          <a href="/landing" className="nav-link">Landing</a>
        </li>
        <li className="nav-item">
          <a href="/" className="nav-link">Something</a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
