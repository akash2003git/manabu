const { z } = require("zod");
const Course = require("../models/Course");
const { courseContentSchema } = require("../validations/zodSchemas.js");

const addCourseContent = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const { title, description, videoUrl } = courseContentSchema.parse(
      req.body,
    );

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }

    const newContentItem = { title, description, videoUrl };
    course.content.push(newContentItem);

    await course.save();

    // Get the last added item
    const addedContentWithId = course.content[course.content.length - 1];

    res.status(201).json({
      message: "New content added successfully!",
      courseContent: addedContentWithId, // Return the item with its generated _id
    });
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

    console.error("Server error while adding course content:", error);
    res.status(500).json({
      message: "Server error while adding course content",
      error: error.message,
    });
  }
};

const getCourseContent = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }
    res.status(200).json(course.content);
  } catch (error) {
    console.error("Server error while fetching course content:", error);
    res.status(500).json({
      message: "Server error while fetching course content",
      error: error.message,
    });
  }
};

const getCourseContentById = async (req, res) => {
  try {
    const { courseId, courseContentId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }

    const contentItem = course.content.id(courseContentId);
    if (!contentItem) {
      return res
        .status(404)
        .json({ message: "Course content not found within this course!" });
    }

    res.status(200).json(contentItem);
  } catch (error) {
    console.error("Server error while fetching course content:", error);
    res.status(500).json({
      message: "Server error while fetching course content",
      error: error.message,
    });
  }
};

const updateCourseContent = async (req, res) => {
  try {
    const { courseId, courseContentId } = req.params;
    const updates = courseContentSchema.partial().parse(req.body);

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }

    const contentItem = course.content.id(courseContentId);
    if (!contentItem) {
      return res
        .status(404)
        .json({ message: "Course content not found within this course!" });
    }

    // Merge the 'updates' into the 'contentItem' subdocument
    Object.assign(contentItem, updates);

    await course.save();
    res.status(200).json({
      message: "Course content updated successfully!",
      courseContent: contentItem, // Return the updated subdocument
    });
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

    console.error("Server error while updating course content:", error);
    res.status(500).json({
      message: "Server error while updating course content",
      error: error.message,
    });
  }
};

const deleteCourseContent = async (req, res) => {
  try {
    const { courseId, courseContentId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }

    const contentItem = course.content.id(courseContentId);
    if (!contentItem) {
      return res
        .status(404)
        .json({ message: "Course content not found within this course!" });
    }

    // Remove the subdocument by its _id
    course.content.pull(courseContentId);

    await course.save();

    res.status(200).json({
      message: "Course content deleted successfully!",
      deletedContentId: courseContentId,
    });
  } catch (error) {
    console.error("Server error while deleting course content:", error);
    res.status(500).json({
      message: "Server error while deleting course content",
      error: error.message,
    });
  }
};

module.exports = {
  addCourseContent,
  getCourseContent,
  getCourseContentById,
  updateCourseContent,
  deleteCourseContent,
};
