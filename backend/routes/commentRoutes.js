const express = require("express");
const Router = express.Router();

const {
  createComment,
  getCommentsByTask,
  //   getSingleComment,
  //   updateComment,
  //   deleteComment,
  //   deleteAllComments,
} = require("../controllers/commentController");
const isAuthenticated = require("../middleware/isAuthenticated");

Router.route("/new").post(isAuthenticated, createComment);
Router.route("/task/:id").get(isAuthenticated, getCommentsByTask);
// Router.route("/").get(isAuthenticated, getAllComments);
// Router.route("/:id")
//   .get(isAuthenticated, getSingleComment)
//   .put(isAuthenticated, updateComment)
//   .delete(isAuthenticated, deleteComment);
// Router.route("/").delete(deleteAllComments);

module.exports = Router;
