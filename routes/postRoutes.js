// routes/postRoutes.js
const express = require('express');
const Post = require('../models/Post');

const router = express.Router();

// Middleware de autenticação
const authenticateUser = (req, res, next) => {
  if (req.session.userId) {
    // Se o ID do usuário estiver presente na sessão, o usuário está autenticado
    return next();
  }

  res.status(401).json({ error: 'Acesso não autorizado' });
};

// Rota para criar um novo post (requer autenticação)
router.post('/', authenticateUser, async (req, res) => {
  try {
    const { title, description, albumPhoto, userId } = req.body;

    // Criação do post no banco de dados
    const newPost = await Post.create({ title, description, albumPhoto, userId });

    res.status(201).json({ post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Rota para obter todos os posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll();

    res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
