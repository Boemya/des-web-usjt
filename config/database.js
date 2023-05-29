// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('findie_db', 'root', 'senha', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
  // Outras opções, se necessário
});

module.exports = sequelize;
