const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      console.error(
        "MongoDB URI not found in environment variables. Please set MONGO_URI in your .env file.",
      );
      process.exit(1); // Exit process if URI is not set
    }

    // Mongoose options for Stable API version
    const clientOptions = {
      serverApi: { version: "1", strict: true, deprecationErrors: true },
    };

    await mongoose.connect(uri, clientOptions);
    console.log("MongoDB Connected Successfully!");
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    // Exit process on connection failure
    process.exit(1);
  }
};

module.exports = connectDB;
