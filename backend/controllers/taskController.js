const Task = require('../models/Task');

// Helper for consistent API responses
const sendResponse = (res, statusCode, success, message, data = null) => {
  res.status(statusCode).json({ success, message, data });
};

// GET /api/tasks
exports.getTasks = async (req, res) => {
  try {
    const { status, sortBy } = req.query;
    
    // Filtering
    const query = {};
    if (status) {
      query.status = status;
    }

    // Sorting
    let sortObj = {};
    if (sortBy === 'dueDate') {
      sortObj.dueDate = 1; // Ascending by default for due dates
    } else if (sortBy === 'createdAt') {
      sortObj.createdAt = -1; // Descending (newest first) for creation dates
    }

    const tasks = await Task.find(query).sort(sortObj);
    sendResponse(res, 200, true, 'Tasks retrieved successfully', tasks);
  } catch (error) {
    sendResponse(res, 500, false, 'Failed to retrieve tasks', error.message);
  }
};

// GET /api/tasks/:id
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return sendResponse(res, 404, false, 'Task not found');
    }
    sendResponse(res, 200, true, 'Task retrieved successfully', task);
  } catch (error) {
    // Handle invalid ObjectId format which throws a CastError
    if (error.name === 'CastError') {
      return sendResponse(res, 400, false, 'Invalid task ID format');
    }
    sendResponse(res, 500, false, 'Failed to retrieve task', error.message);
  }
};

// POST /api/tasks
exports.createTask = async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    sendResponse(res, 201, true, 'Task created successfully', savedTask);
  } catch (error) {
    // Usually validation errors on creation
    sendResponse(res, 400, false, 'Failed to create task', error.message);
  }
};

// PUT /api/tasks/:id
exports.updateTask = async (req, res) => {
  try {
    // { new: true } returns the document after update
    // { runValidators: true } ensures enum/length constraints are checked on update
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { 
      new: true, 
      runValidators: true 
    });
    
    if (!updatedTask) {
      return sendResponse(res, 404, false, 'Task not found');
    }
    sendResponse(res, 200, true, 'Task updated successfully', updatedTask);
  } catch (error) {
    if (error.name === 'CastError') {
      return sendResponse(res, 400, false, 'Invalid task ID format');
    }
    sendResponse(res, 400, false, 'Failed to update task', error.message);
  }
};

// DELETE /api/tasks/:id
exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return sendResponse(res, 404, false, 'Task not found');
    }
    sendResponse(res, 200, true, 'Task deleted successfully', deletedTask);
  } catch (error) {
    if (error.name === 'CastError') {
      return sendResponse(res, 400, false, 'Invalid task ID format');
    }
    sendResponse(res, 500, false, 'Failed to delete task', error.message);
  }
};
