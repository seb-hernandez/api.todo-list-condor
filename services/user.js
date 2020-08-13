const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const getAll = async () => {
  const users = await User.find();
  return users;
};

const getById = async (userId) => {
  const user = await User.findById(userId);
  return user;
};

const getByUsername = async (username) => {
  const user = await User.findOne({ username });
  return user;
};

const getToken = async (userId) => {
  const token = await jwt.sign({ userId }, 'jwtsecretkey');
  return token;
};

const create = async (username, password) => {
  const existingUser = await getByUsername(username);
  if (existingUser) {
    throw new Error('User already exists');
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = new User({
    username,
    password: hashedPassword,
  });
  const token = await getToken(user.id);
  await user.save();
  return { userId: user.id, token };
};

module.exports = {
  getAll,
  getById,
  create,
};
