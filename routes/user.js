const express = require('express');
const router = express.Router();
const { getAll, getCurrent, create, login } = require('../controllers/user');

router.get('/', getCurrent);
router.get('/all', getAll);
router.post('/signup', create);
router.post('/login', login);

module.exports = router;
