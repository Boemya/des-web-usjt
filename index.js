// index.js
const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const sequelize = require('./config/database');
const User = require('./models/User');
const Post = require('./models/Post'); // Importação do modelo Post
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

dotenv.config();

const secretKey = process.env.SECRET_KEY;

const app = express();
const port = process.env.PORT || 3002;

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

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database');

    // Sincroniza os modelos com o banco de dados
    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log('Models synchronized with the database');

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
