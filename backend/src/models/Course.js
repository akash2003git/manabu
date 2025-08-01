const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageLink: {
      type: String,
    },
    published: {
      type: Boolean,
      default: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    content: [
      {
        title: {
          type: String,
          required: true,
        },
        videoUrl: {
          type: String,
          required: true,
        },
        description: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true },
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
