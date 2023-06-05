const express = require('express');
const Post = require('../models/Post');
const { EventEmitter } = require('events');

const router = express.Router();
const postEventEmitter = new EventEmitter();

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

    // Emitir evento de novo post criado
    postEventEmitter.emit('postCreated', newPost);

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

// Rota para excluir um post
router.delete('/delete/:id', authenticateUser, async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.userId; // Obtém o ID do usuário da requisição

    // Verifica se o post pertence ao usuário autenticado antes de excluí-lo
    const post = await Post.findOne({ where: { id: postId, userId: userId } });
    if (!post) {
      return res.status(404).json({ error: 'Post não encontrado' });
    }

    // Exclui o post do banco de dados
    await post.destroy();

    // Emitir evento de post excluído
    postEventEmitter.emit('postDeleted', postId);

    res.status(200).json({ message: 'Post excluído com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para atualizar um post
router.put('/update/:id', authenticateUser, async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.userId; // Obtém o ID do usuário da requisição

    const { title, description, albumPhoto } = req.body;

    // Verifica se o post pertence ao usuário autenticado antes de atualizá-lo
    const post = await Post.findOne({ where: { id: postId, userId: userId } });
    if (!post) {
      return res.status(404).json({ error: 'Post não encontrado' });
    }

    // Atualiza os campos do post no banco de dados
    post.title = title;
    post.description = description;
    post.albumPhoto = albumPhoto;
    await post.save();

    res.status(200).json({ message: 'Post atualizado com sucesso', post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para adicionar um like a um post
router.post('/like/:id', authenticateUser, async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.userId; // Obtém o ID do usuário da requisição

    // Verifica se o post existe antes de adicionar o like
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post não encontrado' });
    }

    // Verifica se o usuário já deu like no post
    if (post.likes.includes(userId)) {
      return res.status(400).json({ error: 'Você já deu like neste post' });
    }

    // Incrementa o contador de likes
    post.likes += 1;

    // Salva as alterações no banco de dados
    await post.save();

    res.status(200).json({ message: 'Like adicionado com sucesso', post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para adicionar um comentário a um post
router.post('/comment/:id', authenticateUser, async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.userId; // Obtém o ID do usuário da requisição
    const comment = req.body.comment; // Obtém o comentário enviado na requisição

    // Verifica se o post existe antes de adicionar o comentário
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post não encontrado' });
    }

    // Adiciona o comentário aos comentários do post
    post.comments.push({ userId, comment });

    // Salva as alterações no banco de dados
    await post.save();

    res.status(200).json({ message: 'Comentário adicionado com sucesso', post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
