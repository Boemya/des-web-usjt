import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Login from './components/Login';
import Navigation from './components/navigation';
import logo from './logo.png';

const App = () => {
  return (
    <Router>
      <div>
        <header>
          <img src={logo} alt="Logo do Blog de Música" style={{ width: '80px', height: 'auto' }} />{/* Use a imagem importada */}
          <h1>FINDIE</h1>
        </header>
        <Navigation />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
