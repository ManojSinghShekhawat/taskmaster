const ErrorHandler = require("../utils/errorHandler");
const Project = require("../models/projectModal");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

//create project
exports.createProject = asyncErrorHandler(async (req, res) => {
  try {
    const project = await Project.create({ ...req.body, user: req.user._id });

    res.status(201).json({ project });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//get all projects
exports.getAllProjects = asyncErrorHandler(async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({ projects });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//get all projects belongs to user
exports.getProjectsByUser = asyncErrorHandler(async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user._id });
    res.status(200).json({ projects });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//get single project
exports.getSingleProject = asyncErrorHandler(async (req, res) => {
  // console.log(req);

  try {
    const project = await Project.findById(req.params.id);
    res.status(200).json({ project });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//update a project
exports.updateProject = asyncErrorHandler(async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ project });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//get projects with status todo
exports.getProjectsTodo = asyncErrorHandler(async (req, res) => {
  try {
    const projects = await Project.find({ status: "todo" });
    res.status(200).json({ projects });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//get projects with status inprogress
exports.getProjectsInProgress = asyncErrorHandler(async (req, res) => {
  try {
    const projects = await Project.find({ status: "inprogress" });
    res.status(200).json({ projects });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//get projects with status completed
exports.getProjectsCompleted = asyncErrorHandler(async (req, res) => {
  try {
    const projects = await Project.find({ status: "completed" });
    res.status(200).json({ projects });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//get all projects assigned to user
exports.getProjectsAssignedToUser = asyncErrorHandler(async (req, res) => {
  try {
    const projects = await Project.find({ teamMembers: req.user._id });
    console.log(projects);
    res.status(200).json({ projects });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
