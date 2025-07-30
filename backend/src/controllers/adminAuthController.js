const { signupSchema, loginSchema } = require("../validations/zodSchemas");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

function generateToken(id, role) {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

const signupAdmin = async (req, res) => {
  try {
    const { username, email, password } = signupSchema.parse(req.body);

    const emailExists = await Admin.findOne({ email });
    if (emailExists) {
      return res
        .status(409)
        .json({ message: "Admin with this email already exists" });
    }
    const usernameExists = await Admin.findOne({ username });
    if (usernameExists) {
      return res
        .status(409)
        .json({ message: "Admin with this username already exists" });
    }

    const admin = new Admin({ username, email, password });
    await admin.save();

    const accessToken = generateToken(admin._id, "admin");

    res.status(201).json({
      _id: admin._id,
      username: admin.username,
      email: admin.email,
      accessToken,
      message: "New admin signed up successfully",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Zod validation error:", error);
      return res.status(400).json({
        message: "Validation failed",
        errors: error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    console.error("Server error during admin signup", error);
    res.status(500).json({
      message: "Server error during admin signup",
      error: error.message,
    });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const admin = await Admin.findOne({ email }).select("+password");

    if (admin && (await admin.comparePassword(password))) {
      const accessToken = generateToken(admin._id, "admin");
      res.status(200).json({
        _id: admin._id,
        username: admin.username,
        email: admin.email,
        accessToken,
        message: "Admin logged in successfully",
      });
    } else {
      res.status(401).json({ message: "Email or password incorrect" });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Zod validation error:", error);
      return res.status(400).json({
        message: "Validation failed",
        errors: error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    console.error("Server error during admin login", error);
    res.status(500).json({
      message: "Server error during admin login",
      error: error.message,
    });
  }
};

module.exports = { signupAdmin, loginAdmin };
