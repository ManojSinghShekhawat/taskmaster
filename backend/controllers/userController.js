const mongoose = require("mongoose");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const ErrorHandler = require("../utils/errorHandler");

const sendToken = require("../utils/sendToken");

const User = require("../models/userModal");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//create user
exports.createUser = asyncErrorHandler(async (req, res) => {
  const user = await User.create(req.body);

  sendToken(user, 201, res, "user created successfully");
});

//login a user
exports.loginUser = asyncErrorHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide email and password" });
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }
  sendToken(user, 200, res, "user logged in successfully");
});

//get all users
exports.getAllUsers = asyncErrorHandler(async (req, res) => {
  const users = await User.find();
  res
    .status(200)
    .json({ success: true, message: "users fetched successfully", users });
});

//get single user
exports.getSingleUser = asyncErrorHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  res
    .status(200)
    .json({ success: true, message: "user fetched successfully", user });
});

//delete user
exports.deleteUser = asyncErrorHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  res
    .status(200)
    .json({ success: true, message: "user deleted successfully", user });
});

//delete all users
exports.deleteAllUsers = asyncErrorHandler(async (req, res) => {
  const users = await User.deleteMany();
  res
    .status(200)
    .json({ success: true, message: "users deleted successfully", users });
});

//update user
exports.updateUser = asyncErrorHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res
    .status(200)
    .json({ success: true, message: "user updated successfully", user });
});

//update user role
exports.updateUserRole = asyncErrorHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res
    .status(200)
    .json({ success: true, message: "user updated successfully", user });
});

//update user password
exports.updateUserPassword = asyncErrorHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("+password");
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid old password" });
  }
  user.password = req.body.password;
  await user.save();
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .status(200)
    .json({ success: true, message: "User password updated successfully" });
});

//check authStatus
exports.checkAuthStatus = asyncErrorHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("user is not authorize", 404));
  }
  const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decodedUser.id).select("+password");
  return res.status(200).json({
    success: true,
    user,
    message: "user is loggedIn",
  });
});

//logout user
exports.logoutUser = asyncErrorHandler(async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res
    .status(200)
    .json({ success: true, message: "user logged out successfully" });
});
