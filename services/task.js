const Task = require('../models/Task');
const userService = require('./user');

const getAll = async () => {
  const tasks = await Task.find();
  return tasks;
};

const getById = async (userId) => {
  const user = await User.findById(userId);
  return user;
};

const create = async (userId, title, description) => {
  const user = await userService.getById(userId);
  const task = new Task({
    title,
    description,
    creator: userId,
  });
  user.createdTasks.push(task.id);
  user.save();
  await task.save();
  return task;
};

module.exports = {
  getAll,
  create,
};
