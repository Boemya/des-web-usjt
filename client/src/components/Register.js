import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import { useNavigate, redirect } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [spotifyProfile, setSpotifyProfile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // const response = await axios.post('http://localhost:3003/users/register', {
      //   name,
      //   lastName,
      //   spotifyProfile,
      //   email,
      //   password,
      // },{headers:{
      //   'Content-Type': 'application/json',
      //   'Access-Control-Allow-Origin': "*"
      // }
      // }
      // );
      const response = await fetch('http://localhost:3003/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': "*"
        },
        body: JSON.stringify({
          name,
          lastName,
          spotifyProfile,
          email,
          password,
        }),
      });
      navigate('/login')
    } catch (error) {
      console.error(error); 
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Spotify Profile"
          value={spotifyProfile}
          onChange={(e) => setSpotifyProfile(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
