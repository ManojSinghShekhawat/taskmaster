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
    project: new mongoose.Types.ObjectId(req.body.project),
  };

  const task = await Task.create(taskData);

  res
    .status(201)
    .json({ success: true, message: "task created successfully", task });
});

//get all tasks
exports.getAllTasks = asyncErrorHandler(async (req, res) => {
  const tasks = await Task.find();
  res
    .status(200)
    .json({ success: true, message: "task created successfully", tasks });
});

//get single task
exports.getSingleTask = asyncErrorHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  res
    .status(200)
    .json({ success: true, message: "task created successfully", task });
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

  const task = await Task.findByIdAndUpdate(req.params.id, taskData, {
    new: true,
  });
  res
    .status(200)
    .json({ success: true, message: "task created successfully", task });
});

//delete task
exports.deleteTask = asyncErrorHandler(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  res
    .status(200)
    .json({ success: true, message: "task created successfully", task });
});

//delete all
exports.deleteAllTasks = asyncErrorHandler(async (req, res) => {
  const tasks = await Task.deleteMany();
  res
    .status(200)
    .json({ success: true, message: "task created successfully", tasks });
});

//get tasks belongs to user
exports.getTasksByUser = asyncErrorHandler(async (req, res) => {
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

  res.status(200).json({
    success: true,
    message: "task created successfully",
    tasksWithProjects,
  });
});
