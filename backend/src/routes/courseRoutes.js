const express = require("express");
const router = express.Router();
const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");
const {
  authenticateJwt,
  authenticateAdmin,
} = require("../middleware/authMiddleware");

router
  .route("/")
  .get(authenticateJwt, getCourses)
  .post(authenticateAdmin, createCourse);

router
  .route("/:id")
  .get(authenticateJwt, getCourseById)
  .put(authenticateAdmin, updateCourse)
  .delete(authenticateAdmin, deleteCourse);

module.exports = router;
