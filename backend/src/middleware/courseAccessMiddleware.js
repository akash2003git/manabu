const User = require("../models/User");

async function checkCoursePurchase(req, res, next) {
  if (!req.user || !req.user.id || !req.user.role) {
    return res
      .status(401)
      .json({ message: "Unauthorized: User not identified for access check." });
  }

  if (req.user.role === "admin") {
    return next(); // Admin has access to all content by default
  }

  try {
    const courseId = req.params.courseId;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found for purchase check." });
    }

    const hasPurchased = user.purchasedCourses.some((purchasedCourseId) =>
      purchasedCourseId.equals(courseId),
    );

    if (hasPurchased) {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "Forbidden: Course not purchased by this user." });
    }
  } catch (error) {
    console.error("Server error during course purchase check:", error);
    res.status(500).json({
      message: "Server error checking course purchase status",
      error: error.message,
    });
  }
}

module.exports = {
  checkCoursePurchase,
};
