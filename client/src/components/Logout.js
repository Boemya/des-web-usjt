import React from 'react';
import axios from 'axios';

const Logout = () => {
  const handleLogout = async () => {
    try {
      // const response = await axios.post('http://localhost:3003/auth/logout', null, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Acess-Control-Allow-Credentials': 'true',
      //     'Origin': 'http://localhost:3000'
      //   },
      // } );

      const response = await fetch('http://localhost:3003/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': "*",
          'Acess-Control-Allow-Credentials': 'true',
          'Origin': 'http://localhost:3000'
        },
      });
      console.log(response.data);
       // Exemplo de tratamento de resposta
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
