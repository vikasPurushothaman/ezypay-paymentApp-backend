require('dotenv').config();
const sequelize = require('./config/db');
const User = require('./models/User');
const WalletTransaction = require('./models/Wallet');
const Payment = require('./models/Transaction');

// Sync the models to create tables if they don't exist
sequelize.sync({ force: false })  // Set to true to recreate tables (use in dev only)
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });
