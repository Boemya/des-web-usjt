import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [spotifyProfile, setSpotifyProfile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3003/users/register', {
        name,
        lastName,
        spotifyProfile,
        email,
        password,
      });
      console.log(response.data); // Exemplo de tratamento de resposta
      // Lógica adicional após o cadastro bem-sucedido

      // Redirecionar para a página de login, por exemplo
      // window.location.href = '/login';
    } catch (error) {
      console.error(error.response.data); // Exemplo de tratamento de erro
      // Lógica adicional para tratamento de erro
    }
  };

  return (
    <div>
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
