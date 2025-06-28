const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModal");

const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return next(
        new ErrorHandler("Please login to access this resource", 401)
      );
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    return next(new ErrorHandler(error.message, 401));
  }
};

module.exports = isAuthenticated;
