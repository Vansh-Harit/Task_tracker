const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Base path is assumed to be /api/tasks when mounted in server.js

router.route('/')
  .get(taskController.getTasks)
  .post(taskController.createTask);

router.route('/:id')
  .get(taskController.getTaskById)
  .put(taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = router;
