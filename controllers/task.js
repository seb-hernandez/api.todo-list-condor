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
      body: { userId, title, description },
    } = req;
    const result = await taskService.create(userId, title, description);
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { getAll, create };
