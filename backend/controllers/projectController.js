const ErrorHandler = require("../utils/errorHandler");
const Project = require("../models/projectModal");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

//create project
exports.createProject = asyncErrorHandler(async (req, res) => {
  const project = await Project.create({ ...req.body, user: req.user._id });

  res.status(201).json({
    success: true,
    message: "project created successfully",
    project,
  });
});

//get all projects
exports.getAllProjects = asyncErrorHandler(async (req, res) => {
  const projects = await Project.find();
  res.status(200).json({
    success: true,
    message: "projects fetched successfully",
    projects,
  });
});

//get all projects belongs to user
exports.getProjectsByUser = asyncErrorHandler(async (req, res) => {
  const projects = await Project.find({ user: req.user._id });
  res.status(200).json({
    success: true,
    message: "projects fetched successfully",
    projects,
  });
});

//get single project
exports.getSingleProject = asyncErrorHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  res.status(200).json({
    success: true,
    message: "project fetched successfully",
    project,
  });
});

//update a project
exports.updateProject = asyncErrorHandler(async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    message: "project updated successfully",
    project,
  });
});

//get projects with status todo
exports.getProjectsTodo = asyncErrorHandler(async (req, res) => {
  const projects = await Project.find({ status: "todo" });
  res.status(200).json({
    success: true,
    message: "projects fetched successfully",
    projects,
  });
});

//get projects with status inprogress
exports.getProjectsInProgress = asyncErrorHandler(async (req, res) => {
  const projects = await Project.find({ status: "inprogress" });
  res.status(200).json({
    success: true,
    message: "projects fetched successfully",
    projects,
  });
});

//get projects with status completed
exports.getProjectsCompleted = asyncErrorHandler(async (req, res) => {
  const projects = await Project.find({ status: "completed" });
  res.status(200).json({
    success: true,
    message: "projects fetched successfully",
    projects,
  });
});

//get all projects assigned to user
exports.getProjectsAssignedToUser = asyncErrorHandler(async (req, res) => {
  const projects = await Project.find({ teamMembers: req.user._id });
  res.status(200).json({
    success: true,
    message: "projects fetched successfully",
    projects,
  });
});
