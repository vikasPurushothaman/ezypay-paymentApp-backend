require('dotenv').config();
const { Sequelize } = require('sequelize');

// Create a Sequelize instance and configure the connection
const sequelize = new Sequelize({
  host: process.env.DB_HOST,  // MySQL host from .env
  dialect: 'mysql',          // MySQL database
  username: process.env.DB_USER,  // MySQL user from .env
  password: process.env.DB_PASS,  // MySQL password from .env
  database: process.env.DB_NAME,  // Database name from .env
});

module.exports = sequelize;
