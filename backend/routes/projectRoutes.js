const express = require("express");
const Router = express.Router();

const {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  getProjectsByUser,
  getProjectsAssignedToUser,
} = require("../controllers/projectController");
const isAuthenticated = require("../middleware/isAuthenticated");

Router.route("/new").post(isAuthenticated, createProject);
Router.route("/").get(isAuthenticated, getAllProjects);
Router.route("/myprojects/created").get(isAuthenticated, getProjectsByUser);
Router.route("/myprojects/assigned").get(
  isAuthenticated,
  getProjectsAssignedToUser
);
Router.route("/:id")
  .get(isAuthenticated, getSingleProject)
  .put(isAuthenticated, updateProject);

// Router.route("/").delete(deleteAllProjects);

module.exports = Router;
