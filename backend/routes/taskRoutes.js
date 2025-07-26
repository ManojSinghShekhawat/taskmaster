const express = require("express");
const Router = express.Router();

const {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
  getTasksByUser,
  getTasksByProject,
} = require("../controllers/taskController");
const isAuthenticated = require("../middleware/isAuthenticated");

Router.route("/new").post(isAuthenticated, createTask);
Router.route("/mytasks").get(isAuthenticated, getTasksByUser);
Router.route("/project/:id").get(isAuthenticated, getTasksByProject);
Router.route("/:id")
  .get(isAuthenticated, getSingleTask)
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);
// Router.route("/").delete(deleteAllTasks);

module.exports = Router;
