const User = require('../models/User');
const Store = require('../models/Store');
const Rating = require('../models/Rating');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

// Add a New User (Admin creating user)
exports.addUser = async (req, res) => {
  try {
    const { name, email, address, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, address, password: hashedPassword, role });

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a New Store
exports.addStore = async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body;
    const store = await Store.create({ name, email, address, ownerId });

    res.status(201).json({ message: 'Store created successfully', store });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// List All Users (with Filter/Search)
exports.getUsers = async (req, res) => {
  try {
    const { name, email, address, role } = req.query;
    const where = {};

    if (name) where.name = { [Op.like]: `%${name}%` };
    if (email) where.email = { [Op.like]: `%${email}%` };
    if (address) where.address = { [Op.like]: `%${address}%` };
    if (role) where.role = role;

    const users = await User.findAll({ where });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// List All Stores (with Filter/Search)
exports.getStores = async (req, res) => {
  try {
    const { name, email, address } = req.query;
    const where = {};

    if (name) where.name = { [Op.like]: `%${name}%` };
    if (email) where.email = { [Op.like]: `%${email}%` };
    if (address) where.address = { [Op.like]: `%${address}%` };

    const stores = await Store.findAll({ where });

    res.json(stores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin Dashboard Summary
exports.getDashboardData = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();

    res.json({ totalUsers, totalStores, totalRatings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
