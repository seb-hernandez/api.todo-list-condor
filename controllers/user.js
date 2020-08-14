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

const getCurrent = async (req, res) => {
  try {
    const { isAuth, userId } = req;
    if (!isAuth) {
      throw new Error('Unauthenticated');
    }
    const result = await userService.getCurrent(userId);
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
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

module.exports = { getAll, getCurrent, create, login };
