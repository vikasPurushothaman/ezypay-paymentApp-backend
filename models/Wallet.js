const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');  // Import User model for the foreign key

// Define the WalletTransaction model
const WalletTransaction = sequelize.define('WalletTransaction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,  // Foreign key relation to User model
      key: 'id',
    },
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  transaction_type: {
    type: DataTypes.ENUM('credit', 'debit'),
    allowNull: false,
  },
  transaction_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('success', 'failed'),
    defaultValue: 'success',
  },
}, {
  tableName: 'wallet_transactions',
  timestamps: false,
});

// Define the relationship between User and WalletTransaction
User.hasMany(WalletTransaction, { foreignKey: 'user_id' });
WalletTransaction.belongsTo(User, { foreignKey: 'user_id' });

module.exports = WalletTransaction;
