const express = require('express');
const Post = require('../models/Post');

const router = express.Router();

// Middleware de autenticação
const authenticateUser = (req, res, next) => {
  const userId = req.session.userId; // Obtém o ID do usuário da sessão

  if (userId) {
    // Se o ID do usuário estiver presente na sessão, o usuário está autenticado
    req.userId = userId; // Armazena o ID do usuário na requisição para uso posterior
    return next();
  }

  res.status(401).json({ error: 'Acesso não autorizado' });
};

// Rota para criar um novo post (requer autenticação)
router.post('/create', authenticateUser, async (req, res) => {
  try {
    const { title, description, albumPhoto } = req.body;
    const userId = req.userId; // Obtém o ID do usuário da requisição

    // Criação do post no banco de dados
    const newPost = await Post.create({ title, description, albumPhoto, userId });

    res.status(201).json({ post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para obter todos os posts
router.get('/list', async (req, res) => {
  try {
    const posts = await Post.findAll();

    res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
