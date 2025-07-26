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
  const tasksWithProjects = await Task.findById(req.params.id)
    .populate("project")
    .exec();
  res.status(200).json({
    success: true,
    message: "task created successfully",
    tasksWithProjects,
  });
});

//update task
exports.updateTask = asyncErrorHandler(async (req, res) => {
  const ExistingTask = await Task.findById(req.params.id);
  if (!ExistingTask) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }

  const taskData = {
    title: req.body.title ?? ExistingTask.title,
    description: req.body.description ?? ExistingTask.description,
    status: req.body.status ?? ExistingTask.status,
    dueDate: req.body.dueDate ?? ExistingTask.dueDate,
    priority: req.body.priority ?? ExistingTask.priority,
    user: req.user._id ?? ExistingTask.user,
    assignees: req.body.assignees
      ? req.body.assignees.map((a) => new mongoose.Types.ObjectId(a.value))
      : ExistingTask.assignees,
    tags: req.body.tags ?? ExistingTask.tags,
    project: req.body.project
      ? new mongoose.Types.ObjectId(req.body.project)
      : ExistingTask.project,
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
  const tasksWithProjects = await Task.find({ user: req.user._id })
    .populate("project")
    .exec();

  res.status(200).json({
    success: true,
    message: "task created successfully",
    tasksWithProjects,
  });
});

//get tasks belongs to project
exports.getTasksByProject = asyncErrorHandler(async (req, res) => {
  const tasksWithProjects = await Task.find({ project: req.params.id })
    .populate("project")
    .exec();

  res.status(200).json({
    success: true,
    message: "task fetched successfully",
    tasksWithProjects,
  });
});
