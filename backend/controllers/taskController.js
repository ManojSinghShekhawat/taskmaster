const ErrorHandler = require("../utils/errorHandler");
const Task = require("../models/taskModal");
const Project = require("../models/projectModal");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const mongoose = require("mongoose");

//create task
exports.createTask = asyncErrorHandler(async (req, res) => {
  const taskData = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    dueDate: req.body.dueDate,
    priority: req.body.priority,
    user: req.user._id,
    assignees: req.body.assignees.map(
      (assignee) => new mongoose.Types.ObjectId(assignee)
    ),
    tags: req.body.tags,
    project: new mongoose.Types.ObjectId(req.body.project), //req.body.project,
  };

  try {
    const task = await Task.create(taskData);

    res.status(201).json({ task });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//get all tasks
exports.getAllTasks = asyncErrorHandler(async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//get single task
exports.getSingleTask = asyncErrorHandler(async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.status(200).json({ task });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//update task
exports.updateTask = asyncErrorHandler(async (req, res) => {
  const taskData = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    dueDate: req.body.dueDate,
    priority: req.body.priority,
    user: req.user._id,
    assignees: req.body.assignees.map(
      (assignee) => new mongoose.Types.ObjectId(assignee.value)
    ),
    tags: req.body.tags,
    project: new mongoose.Types.ObjectId(req.body.project),
  };

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, taskData, {
      new: true,
    });
    res.status(200).json({ task });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//delete task
exports.deleteTask = asyncErrorHandler(async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ task });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//delete all
exports.deleteAllTasks = asyncErrorHandler(async (req, res) => {
  try {
    const tasks = await Task.deleteMany();
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//get tasks belongs to user
exports.getTasksByUser = asyncErrorHandler(async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });

    const tasksWithProjects = await Promise.all(
      tasks.map(async (task) => {
        const project = await Project.findById(task.project);
        return {
          task: task,
          project: project,
        };
      })
    );

    // console.log(tasksWithProjects);

    res.status(200).json({ tasksWithProjects });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
