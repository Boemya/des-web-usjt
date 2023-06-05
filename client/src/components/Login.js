import React, { useState } from 'react';
import axios from 'axios';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3003/auth/login', { email, password });
      if (response && response.data) {
        console.log(response.data); // Exemplo de tratamento de resposta
        // Lógica adicional após o login bem-sucedido
      } else {
        console.log('Resposta vazia'); // Exemplo de tratamento de erro
        // Lógica adicional para tratamento de erro
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.error(error.response.data); // Exemplo de tratamento de erro
        // Lógica adicional para tratamento de erro
      } else {
        console.error('Resposta vazia'); // Exemplo de tratamento de erro
        // Lógica adicional para tratamento de erro
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
        <p>Não é cadastrado? <a href="/register">Cadastre-se</a></p>
      </form>
    </div>
  );
};

export default Login;