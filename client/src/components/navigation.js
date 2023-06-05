// Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
import './navigation.css'; 

const Navigation = () => {
  return (
    <header className="header"> 
      <div className="logo-container">
       
      </div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
        </ul>
        <div className="login-container">
        <Link to="/login">Login</Link>
      </div>
      </nav>
    </header>
  );
};

export default Navigation;

  
  
  
  
  
  
  