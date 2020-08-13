const userService = require('../services/user');

const getAll = async (req, res) => {
  try {
    const result = await userService.getAll();
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

const create = async (req, res) => {
  try {
    const {
      body: { username, password },
    } = req;
    const result = await userService.create(username, password);
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const {
      body: { username, password },
    } = req;
    const result = await userService.login(username, password);
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { getAll, create, login };
