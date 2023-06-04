const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const sequelize = require('./config/database');
const User = require('./models/User');
const Post = require('./models/Post');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const { EventEmitter } = require('events');

dotenv.config();

const secretKey = process.env.SECRET_KEY;

const app = express();
const port = process.env.PORT || 3003;
const postEventEmitter = new EventEmitter();

app.use(express.json());

// Configuração da sessão
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false
  })
);

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

// Subscrever eventos de novo post criado e post excluído
postEventEmitter.on('postCreated', (post) => {
  console.log('Novo post criado:', post);
  // Lógica adicional para lidar com o novo post criado
});

postEventEmitter.on('postDeleted', (postId) => {
  console.log('Post excluído:', postId);
  // Lógica adicional para lidar com o post excluído
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão com o Banco estabelecida com Sucesso!');

    // Sincroniza os modelos com o banco de dados
    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log('Models sicronizados com o Banco de Dados');

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao tentar se conectar ao Banco de Dados:', error);
  });
