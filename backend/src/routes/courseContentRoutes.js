const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  addCourseContent,
  getCourseContent,
  getCourseContentById,
  updateCourseContent,
  deleteCourseContent,
} = require("../controllers/courseContentController");
const {
  authenticateJwt,
  authenticateAdmin,
} = require("../middleware/authMiddleware");

router
  .route("/")
  .get(authenticateJwt, getCourseContent)
  .post(authenticateAdmin, addCourseContent);

router
  .route("/:courseContentId")
  .get(authenticateJwt, getCourseContentById)
  .put(authenticateAdmin, updateCourseContent)
  .delete(authenticateAdmin, deleteCourseContent);

module.exports = router;
