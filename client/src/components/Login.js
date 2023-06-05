import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';

const Login = ({ setAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3003/auth/login', {
        email,
        password,
      });

      if (response && response.data) {
        console.log(response.data);
        setAuthenticated(true);
        navigate('/'); // Redireciona o usuário para a página Home
      } else {
        console.log('Resposta vazia');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.error(error.response.data);
      } else {
        console.error('Resposta vazia');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        {/* Coloque aqui o código ou o componente do seu logo */}
      </div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="input-container">
          <label>Email</label>
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label>Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <p>
          Não é cadastrado? <Link to="./Register">Cadastre-se</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
