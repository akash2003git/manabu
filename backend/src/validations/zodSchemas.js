const { z } = require("zod");

const signupSchema = z.object({
  username: z
    .string()
    .min(3, "Username must have at least 3 characters!")
    .max(30, "Username must not exceed 30 characters")
    .trim(),
  email: z.email("Invalid email address!").trim().toLowerCase(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long!")
    .max(100, "Password must not exceed 100 characters"),
});

const loginSchema = z.object({
  email: z.email("Invalid email address!").trim().toLowerCase(),
  password: z.string().min(1, "Password is required!"),
});

const createCourseSchema = z.object({
  title: z.string().min(1, "Title is required!"),
  description: z.string().min(1, "Description is required!"),
  price: z.number().min(0, "Price cannot be negative!"),
  imageLink: z
    .url("Enter a valid URL for image link!")
    .optional()
    .or(z.literal("")),
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
});

const courseContentSchema = z.object({
  title: z.string().min(1, "Title is required!"),
  videoUrl: z.url("Enter a valid URL for video!"),
  description: z.string().optional(),
});

const purchaseCourseSchema = z.object({
  courseId: z.string().length(24, "Invalid course ID format."),
});

module.exports = {
  signupSchema,
  loginSchema,
  createCourseSchema,
  courseContentSchema,
  purchaseCourseSchema,
};
