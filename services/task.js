const Task = require('../models/Task');
const userService = require('./user');

const getAll = async () => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  return tasks;
};

const getById = async (taskId) => {
  const task = await Task.findById(taskId);
  return task;
};

const getByTitle = async (title) => {
  const task = await Task.find({ title }).collation({
    locale: 'en',
    strength: 2,
  });
  return task;
};

const removeById = async (taskId) => {
  const task = await Task.findByIdAndRemove(taskId);
  return task;
};

const create = async (userId, title) => {
  const user = await userService.getById(userId);
  const task = new Task({
    title,
    creator: userId,
  });
  user.createdTasks.push(task.id);
  user.save();
  await task.save();
  return task;
};

const update = async (taskId, input) => {
  await Task.findOneAndUpdate({ _id: taskId }, { $set: input }, { new: true });
  const allTasks = await getAll();
  return allTasks;
};

const assignUser = async (taskId, userId) => {
  const task = await getById(taskId);
  task.assignedUsers.push(userId);
  userService.assignTask(userId, taskId);
  await task.save();
  const allTasks = await getAll();
  return allTasks;
};

const unassignUser = async (taskId, userId) => {
  await removeAssignedUser(taskId, userId);
  userService.unassignTask(userId, taskId);
  const allTasks = await getAll();
  return allTasks;
};

const removeAssignedUser = async (taskId, userId) => {
  const task = await getById(taskId);
  const index = task.assignedUsers.indexOf(userId);
  if (index > -1) {
    task.assignedUsers.splice(index, 1);
  }
  await task.save();
  return task;
};

const remove = async (taskId) => {
  const task = await removeById(taskId);
  userService.removeCreatedTask(task.creator, taskId);
  const assignedUsers = await userService.getManyById(task.assignedUsers);
  assignedUsers.map((user) => {
    userService.unassignTask(user.id, taskId);
  });
  const tasks = await getAll();
  return tasks;
};

module.exports = {
  getAll,
  getByTitle,
  create,
  update,
  assignUser,
  unassignUser,
  remove,
};
