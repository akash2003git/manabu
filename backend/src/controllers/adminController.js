const { z } = require("zod");
const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    // Find all users and select all fields EXCEPT the password
    const users = await User.find({}).select("-password");

    res.status(200).json(users);
  } catch (error) {
    console.error("Server error fetching all users:", error);
    res
      .status(500)
      .json({
        message: "Server error fetching all users",
        error: error.message,
      });
  }
};

module.exports = {
  getAllUsers,
};
