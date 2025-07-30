const { signupSchema, loginSchema } = require("../validations/zodSchemas");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

function generateToken(id, role) {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

const signupUser = async (req, res) => {
  try {
    const { username, email, password } = signupSchema.parse(req.body);

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(409).json({ message: "Email already exists" });
    }
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const user = new User({ username, email, password });
    await user.save();

    const accessToken = generateToken(user._id, "user");

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      accessToken,
      message: "New user signed-up successfully",
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

    console.error("Server error during signup", error);
    res
      .status(500)
      .json({ message: "Server error during signup", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await User.findOne({ email }).select("+password");

    if (user && (await user.comparePassword(password))) {
      const accessToken = generateToken(user._id, "user");
      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        accessToken,
        message: "User logged-in successfully",
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

    console.error("Server error during login", error);
    res
      .status(500)
      .json({ message: "Server error during login", error: error.message });
  }
};

module.exports = { signupUser, loginUser };
