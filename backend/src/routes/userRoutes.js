const express = require("express");
const router = express.Router();
const {
  getMe,
  purchaseCourse,
  getPurchasedCourses,
} = require("../controllers/userController");
const {
  authenticateJwt,
  authenticateUser,
} = require("../middleware/authMiddleware");

router.route("/me").get(authenticateJwt, getMe);

router.route("/purchaseCourse").post(authenticateUser, purchaseCourse);

router.route("/my-courses").get(authenticateJwt, getPurchasedCourses);

module.exports = router;
