import React from 'react';
import { Link } from 'react-router-dom';
import './navigation.css';

const Navigation = ({ handleLogout }) => {
  return (
    <header className="header">
      <div className="logo-container">
        {/* Coloque aqui o código ou componente do logo */}
      </div>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;

  
  
  