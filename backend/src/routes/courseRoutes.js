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
  authenticateAdmin,
  attachUserIfAuthenticated,
} = require("../middleware/authMiddleware");

router
  .route("/")
  .get(attachUserIfAuthenticated, getCourses)
  .post(authenticateAdmin, createCourse);

router
  .route("/:id")
  .get(attachUserIfAuthenticated, getCourseById)
  .put(authenticateAdmin, updateCourse)
  .delete(authenticateAdmin, deleteCourse);

module.exports = router;
