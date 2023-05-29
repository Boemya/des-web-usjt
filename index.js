// index.js
const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const User = require('./models/User');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const eventBus = require('./config/eventBus');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/users', userRoutes);
app.use('/auth', authRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database');

    return User.sync({ force: false });
  })
  .then(() => {
    console.log('User model synchronized with the database');

    return eventBus.connect();
  })
  .then(() => {
    console.log('Connected to the event bus');

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
