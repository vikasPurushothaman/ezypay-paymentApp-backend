const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');  // Import User model for the foreign key

// Define the Payment model
const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  sender_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,  // Foreign key relation to User model (sender)
      key: 'id',
    },
  },
  receiver_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,  // Foreign key relation to User model (receiver)
      key: 'id',
    },
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  payment_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'failed'),
    defaultValue: 'pending',
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  tableName: 'payments',
  timestamps: false,
});

// Define relationships
User.hasMany(Payment, { foreignKey: 'sender_id', as: 'sentPayments' });
User.hasMany(Payment, { foreignKey: 'receiver_id', as: 'receivedPayments' });

module.exports = Payment;
