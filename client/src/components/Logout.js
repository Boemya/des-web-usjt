import React from 'react';
import axios from 'axios';

const Logout = () => {
  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:3003/auth/logout');
      console.log(response.data); // Exemplo de tratamento de resposta
      // Lógica adicional após o logout bem-sucedido
    } catch (error) {
      console.error(error.response.data); // Exemplo de tratamento de erro
      // Lógica adicional para tratamento de erro
    }
  };

  return (
    <div>
      <h1>Logout</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
