const { z } = require("zod");
const Course = require("../models/Course");
const { createCourseSchema } = require("../validations/zodSchemas.js");

const createCourse = async (req, res) => {
  try {
    const { title, description, price, imageLink, published, featured } =
      createCourseSchema.parse(req.body);
    const course = await Course.create({
      title,
      description,
      price,
      imageLink,
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
    if (featured === "true") {
      filter.featured = true;
    }
    // if ?featured=false => find({})
    // if ?featured=true => find({featured: true})
    const courses = await Course.find(filter).sort({ createdAt: -1 });
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
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }
    res.status(200).json(course);
  } catch (error) {
    console.error("Server error fetching course:", error);
    res.status(500).json({
      message: "Server error fetching course:",
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
