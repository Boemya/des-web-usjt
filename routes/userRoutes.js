// routes/userRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const eventBus = require('../config/eventBus');

const router = express.Router();

// Rota para cadastro de usuário
router.post('/register', async (req, res) => {
  try {
    const { name, lastName, spotifyProfile, email, password } = req.body;

    // Verifica se o usuário já existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criação do usuário no banco de dados
    const newUser = await User.create({ name, lastName, spotifyProfile, email, password: hashedPassword });

    // Publica um evento de usuário registrado no barramento
    const eventData = JSON.stringify({ userId: newUser.id, name: newUser.name, lastName: newUser.lastName, email: newUser.email });
    await eventBus.publishEvent('user-exchange', 'user.registered', eventData);

    res.status(201).json({ user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
