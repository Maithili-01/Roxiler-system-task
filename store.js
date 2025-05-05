const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Store = sequelize.define('Store', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING },
  address: { type: DataTypes.STRING },
  ownerId: { type: DataTypes.INTEGER },
  rating: { type: DataTypes.FLOAT, defaultValue: 0 }
});

module.exports = Store;
