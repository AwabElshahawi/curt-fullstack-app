const express = require('express');
const router = express.Router();
const { createTask, getTasks, getTaskById, updateTask, deleteTask } = require('../controllers/tasksController');

router.post('/', createTask);
router.get('/', getTasks);
router.get('/:id', getTaskById);
router.put('/update/:id', updateTask);
router.delete('/delete/:id', deleteTask);

module.exports = router;