const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

// Rota para autenticação de usuário
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verifica se o usuário existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }

    // Verifica a senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }

    // Armazena o ID do usuário na sessão
    req.session.userId = user.id;

    res.status(200).json({ message: 'Autenticação bem-sucedida' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para logout do usuário
router.post('/logout', (req, res) => {
  req.session.destroy(); // Destroi a sessão
  res.status(200).json({ message: 'Usuário deslogado com sucesso' });
});

module.exports = router;
