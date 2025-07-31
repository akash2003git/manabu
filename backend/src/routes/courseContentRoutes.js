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
const { checkCoursePurchase } = require("../middleware/courseAccessMiddleware");

router
  .route("/")
  .get(authenticateJwt, checkCoursePurchase, getCourseContent)
  .post(authenticateAdmin, addCourseContent);

router
  .route("/:courseContentId")
  .get(authenticateJwt, checkCoursePurchase, getCourseContentById)
  .put(authenticateAdmin, updateCourseContent)
  .delete(authenticateAdmin, deleteCourseContent);

module.exports = router;
