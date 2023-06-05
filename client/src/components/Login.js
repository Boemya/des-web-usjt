import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';

const Login = ({ setAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    console.log('teste')
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3003/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': "*"
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setAuthenticated(true);
        navigate('/');
      } else {
        console.log('Resposta vazia');
      }
    } catch (error) {
      console.error('Resposta vazia');
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
