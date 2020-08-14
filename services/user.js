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

const generateToken = async (userId) => {
  const token = await jwt.sign({ userId }, 'jwtsecretkey');
  return token;
};

const getCurrent = async (userId) => {
  const user = await getById(userId);
  return user;
};

const create = async (username, password) => {
  const existingUser = await getByUsername(username);
  if (existingUser) {
    throw new Error('User already exists.');
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = new User({
    username,
    password: hashedPassword,
  });
  const token = await generateToken(user.id);
  await user.save();
  return { user: { ...user._doc, password: null }, token };
};

const login = async (username, password) => {
  const user = await getByUsername(username);
  if (!user) {
    throw new Error('User does not exist.');
  }
  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    throw new Error('Password is incorrect.');
  }
  const token = await generateToken(user.id);
  return { user: { ...user._doc, password: null }, token };
};

const assignTask = async (userId, taskId) => {
  const user = await getById(userId);
  user.assignedTasks.push(taskId);
  await user.save();
  return user;
};

const unassignTask = async (userId, taskId) => {
  const user = await getById(userId);
  const index = user.assignedTasks.indexOf(taskId);
  if (index > -1) {
    user.assignedTasks.splice(index, 1);
  }
  await user.save();
  return user;
};

module.exports = {
  getAll,
  getCurrent,
  getById,
  create,
  login,
  assignTask,
  unassignTask,
};
