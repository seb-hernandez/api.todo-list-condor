const express = require('express');
const router = express.Router();
const { getAll, create, login } = require('../controllers/user');

router.get('/', getAll);
router.post('/signup', create);
router.post('/login', login);

module.exports = router;
