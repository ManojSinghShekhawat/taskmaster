const express = require("express");
const router = express.Router();

const {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  loginUser,
  checkAuthStatus,
  logoutUser,
} = require("../controllers/userController");

const isAuthenticated = require("../middleware/isAuthenticated");

router.route("/new").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/authstatus").get(isAuthenticated, checkAuthStatus);
router.route("/").get(getAllUsers);
router.route("/:id").get(getSingleUser).put(updateUser).delete(deleteUser);

module.exports = router;
