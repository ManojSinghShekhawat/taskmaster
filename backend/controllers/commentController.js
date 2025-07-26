const asyncErrorHandler = require("../utils/asyncErrorHandler");
const ErrorHandler = require("../utils/errorHandler");
const Comment = require("../models/commentModal");

//create comment
exports.createComment = asyncErrorHandler(async (req, res) => {
  const comment = await Comment.create({ ...req.body, user: req.user._id });

  res.status(201).json({
    success: true,
    message: "comment created successfully",
    comment,
  });
});

// get commnents belongs to task
exports.getCommentsByTask = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;

  const comments = await Comment.find({
    task: id,
  }).populate("user");

  res.status(200).json({
    success: true,
    message: "comments fetched successfully",
    comments,
  });
});
