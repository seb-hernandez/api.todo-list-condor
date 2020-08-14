const taskService = require('../services/task');

const getAll = async (req, res) => {
  try {
    const result = await taskService.getAll();
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

const create = async (req, res) => {
  try {
    const {
      body: { title },
      isAuth,
      userId,
    } = req;
    if (!isAuth) {
      throw new Error('Unauthenticated');
    }
    const result = await taskService.create(userId, title);
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const {
      params: { id: taskId },
      body: { input },
    } = req;
    const result = await taskService.update(taskId, input);
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

const assignUser = async (req, res) => {
  try {
    const {
      params: { taskId },
      body: { userId },
    } = req;
    const result = await taskService.assignUser(taskId, userId);
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

const unassignUser = async (req, res) => {
  try {
    const {
      params: { taskId },
      body: { userId },
    } = req;
    const result = await taskService.unassignUser(taskId, userId);
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

const remove = async (req, res) => {
  try {
    const {
      params: { taskId },
    } = req;
    const result = await taskService.remove(taskId);
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { getAll, create, update, assignUser, unassignUser, remove };
