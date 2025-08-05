const { z } = require("zod");
const User = require("../models/User");
const Course = require("../models/Course");
const { purchaseCourseSchema } = require("../validations/zodSchemas");

const getMe = async (req, res) => {
  try {
    // req.user is available because of the authenticateJwt middleware
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Server error fetching user details:", error);
    res.status(500).json({
      message: "Server error fetching user details",
      error: error.message,
    });
  }
};

const purchaseCourse = async (req, res) => {
  try {
    const { courseId } = purchaseCourseSchema.parse(req.body);

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    // Check if the user has already purchased this course
    if (user.purchasedCourses.includes(courseId)) {
      return res.status(400).json({ message: "Course already purchased." });
    }

    user.purchasedCourses.push(courseId);
    await user.save();

    res.status(200).json({
      message: "Course purchased successfully!",
      purchasedCourseId: courseId,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: error.issues });
    }
    console.error("Server error purchasing course:", error);
    res.status(500).json({
      message: "Server error purchasing course",
      error: error.message,
    });
  }
};

const getPurchasedCourses = async (req, res) => {
  try {
    // req.user.id comes from the authenticateJwt middleware
    const user = await User.findById(req.user.id).populate("purchasedCourses");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Return just the array of populated courses
    res.status(200).json(user.purchasedCourses);
  } catch (error) {
    console.error("Server error fetching purchased courses:", error);
    res.status(500).json({
      message: "Server error fetching purchased courses",
      error: error.message,
    });
  }
};

module.exports = {
  getMe,
  purchaseCourse,
  getPurchasedCourses,
};
