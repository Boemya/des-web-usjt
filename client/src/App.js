import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/home';
import Login from './components/Login';
import Navigation from './components/navigation';
import axios from 'axios';
import Register from './components/Register';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const response = await axios.get('http://localhost:3003/auth/verify', {
        withCredentials: true,
      });

      if (response && response.data && response.data.authenticated) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    } catch (error) {
      console.error(error);
      setAuthenticated(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3003/auth/logout', null, {
        withCredentials: true,
      });

      setAuthenticated(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      console.log('Email:', email);
      console.log('Password:', password);

      const response = await axios.post('http://localhost:3003/auth/login', {
        email,
        password,
      });

      console.log('Response:', response);

      if (response && response.data) {
        console.log('Login successful');
        setAuthenticated(true);
      } else {
        console.log('Empty response');
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <Router>
      <div>
        <header>
          <h1>FINDIE</h1>
          <h2>Seu jeito diferente de conhecer novas músicas</h2>
        </header>
        {authenticated && <Navigation handleLogout={handleLogout} />}

        <Routes>
          <Route
            path="/"
            element={authenticated ? <Home /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/login"
            element={<Login setAuthenticated={setAuthenticated} handleLogin={handleLogin} />}
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
