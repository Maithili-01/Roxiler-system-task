const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Rating = sequelize.define('Rating', {
  userId: { type: DataTypes.INTEGER },
  storeId: { type: DataTypes.INTEGER },
  ratingValue: { type: DataTypes.INTEGER }
});

module.exports = Rating;
