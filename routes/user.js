const express = require('express');
const router = express.Router();
const { getAll, create } = require('../controllers/user');

router.get('/', getAll);
router.post('/', create);

module.exports = router;
