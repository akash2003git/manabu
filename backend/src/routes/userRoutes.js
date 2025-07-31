const express = require("express");
const router = express.Router();
const { getMe, purchaseCourse } = require("../controllers/userController");
const {
  authenticateJwt,
  authenticateUser,
} = require("../middleware/authMiddleware");

router.route("/me").get(authenticateJwt, getMe);

router.route("/purchaseCourse").post(authenticateUser, purchaseCourse);

module.exports = router;
