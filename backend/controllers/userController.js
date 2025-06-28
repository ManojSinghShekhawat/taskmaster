const mongoose = require("mongoose");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const ErrorHandler = require("../utils/errorHandler");

const sendToken = require("../utils/sendToken");

const User = require("../models/userModal");
const jwt = require("jsonwebtoken");

//create user
exports.createUser = asyncErrorHandler(async (req, res) => {
  // console.log(req.body);
  try {
    const user = await User.create(req.body);
    console.log(user);
    sendToken(user, 201, res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//login a user
exports.loginUser = asyncErrorHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  sendToken(user, 200, res);
});

//get all users
exports.getAllUsers = asyncErrorHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//get single user
exports.getSingleUser = asyncErrorHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//delete user
exports.deleteUser = asyncErrorHandler(async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//delete all users
exports.deleteAllUsers = asyncErrorHandler(async (req, res) => {
  try {
    const users = await User.deleteMany();
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//update user
exports.updateUser = asyncErrorHandler(async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//update user role
exports.updateUserRole = asyncErrorHandler(async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//update user password
exports.updateUserPassword = asyncErrorHandler(async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
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
  res.status(200).json({ message: "user logged out successfully" });
});
