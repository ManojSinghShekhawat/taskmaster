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
  updateUserPassword,
} = require("../controllers/userController");

const isAuthenticated = require("../middleware/isAuthenticated");

router.route("/new").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").post(isAuthenticated, logoutUser);
router.route("/authstatus").get(isAuthenticated, checkAuthStatus);
router.route("/").get(isAuthenticated, getAllUsers);
router
  .route("/:id")
  .get(isAuthenticated, getSingleUser)
  // .put(isAuthenticated, updateUser)
  .put(isAuthenticated, updateUserPassword)
  .delete(isAuthenticated, deleteUser);

module.exports = router;
