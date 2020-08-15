const express = require('express');
const router = express.Router();
const {
  getAll,
  getByTitle,
  create,
  remove,
  update,
  assignUser,
  unassignUser,
} = require('../controllers/task');

router.get('/', getAll);
router.post('/search', getByTitle);
router.post('/', create);
router.patch('/:id', update);
router.patch('/assign/:taskId', assignUser);
router.patch('/unassign/:taskId', unassignUser);
router.delete('/:taskId', remove);

module.exports = router;
