const express = require('express');
const router = express.Router();
const { getAll, getCurrent, create, login } = require('../controllers/user');

router.get('/', getAll);
router.get('/current', getCurrent);
router.post('/signup', create);
router.post('/login', login);

module.exports = router;
