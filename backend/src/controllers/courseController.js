const { z } = require("zod");
const Course = require("../models/Course");
const { createCourseSchema } = require("../validations/zodSchemas.js");
const User = require("../models/User");

const createCourse = async (req, res) => {
  try {
    const { title, description, price, imageLink, published, featured } =
      createCourseSchema.parse(req.body);

    // Generate placeholder text from title (take first 3 words)
    const placeholderText = title.split(" ").slice(0, 3).join("+");

    const course = await Course.create({
      title,
      description,
      price,
      imageLink:
        imageLink ||
        `https://placehold.co/600x400/120D09/ffffff?text=${placeholderText}`,
      published,
      featured: featured || false,
    });

    res.status(201).json({ message: "Course create successfully!", course });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation failed:", error);
      return res.status(400).json({
        message: "Validation failed",
        errors: error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    console.error("Server error creating course:", error);
    res
      .status(500)
      .json({ message: "Sever error creating course", error: error.message });
  }
};

const getCourses = async (req, res) => {
  try {
    const { featured } = req.query;
    const filter = {};
    // Admin can see everything, users only see published
    if (req.user?.role !== "admin") {
      filter.published = true;
    }
    if (featured === "true") {
      filter.featured = true;
    }

    // if ?featured=false => find({})
    // if ?featured=true => find({featured: true})
    const courses = await Course.find(filter)
      .select("-content")
      .sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (error) {
    console.error("Server error fetching courses:", error);
    res
      .status(500)
      .json({ message: "Sever error fetching courses", error: error.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId).lean();

    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }

    const isAdmin = req.user?.role === "admin";
    const hasPurchased = req.user?.purchasedCourses?.includes(courseId);

    // If course is not published and user is neither admin nor purchaser => deny
    if (!course.published && !isAdmin && !hasPurchased) {
      return res
        .status(403)
        .json({ message: "This course is not yet published!" });
    }

    let response = { ...course };

    // If admin OR purchaser => full course content
    if (isAdmin || hasPurchased) {
      return res.status(200).json(response);
    }

    // Otherwise (guest or normal user without purchase) => only titles
    response.content = course.content.map((item) => ({
      title: item.title,
    }));

    res.status(200).json(response);
  } catch (error) {
    console.error("Server error fetching course:", error);
    res.status(500).json({
      message: "Server error fetching course",
      error: error.message,
    });
  }
};

const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const updates = createCourseSchema.partial().parse(req.body);

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }

    const updatedCourse = await Course.findOneAndUpdate(
      { _id: courseId },
      updates,
      {
        new: true,
        runValidators: true,
      },
    );
    res
      .status(200)
      .json({ message: "Course updated successfully!", course: updatedCourse });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation failed:", error);
      return res.status(400).json({
        message: "Validation failed",
        errors: error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    console.error("Server error updating course:", error);
    res
      .status(500)
      .json({ message: "Sever error updating course", error: error.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const deletedCourse = await Course.findByIdAndDelete(courseId);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found!" });
    }

    // Remove course reference from all users who purchased it
    await User.updateMany(
      { purchasedCourses: courseId },
      { $pull: { purchasedCourses: courseId } },
    );

    res.status(200).json({ message: "Course deleted successfully!" });
  } catch (error) {
    console.error("Server error deleting course:", error);
    res
      .status(500)
      .json({ message: "Server error deleting course", error: error.message });
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
