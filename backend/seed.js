const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./src/models/User");
const Admin = require("./src/models/Admin");
const Course = require("./src/models/Course");
const courses = require("./courseData");

dotenv.config(); // Load environment variables from .env file

if (!process.env.MONGO_URI) {
  console.error("Error: MONGO_URI is not defined in the .env file.");
  process.exit(1);
}

// Sample data for users and admins
const users = [
  {
    username: "john_doe",
    email: "john@example.com",
    password: "john123",
  },
  {
    username: "jane_smith",
    email: "jane@example.com",
    password: "jane123",
  },
];

const admins = [
  {
    username: "admin",
    email: "admin@example.com",
    password: "admin123",
  },
];

// --- Seeding Function ---

const seedDatabase = async () => {
  try {
    // Connect to the database
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully.");

    // --- Clear existing data before seeding ---
    console.log("Clearing existing data...");
    await User.deleteMany({});
    await Admin.deleteMany({});
    await Course.deleteMany({});
    console.log("Existing data cleared.");

    // Hash passwords before inserting users and admins
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return { ...user, password: hashedPassword };
      }),
    );

    const hashedAdmins = await Promise.all(
      admins.map(async (admin) => {
        const hashedPassword = await bcrypt.hash(admin.password, 10);
        return { ...admin, password: hashedPassword };
      }),
    );

    // Seed users
    console.log("Seeding users...");
    await User.insertMany(hashedUsers);
    console.log(`Seeded ${hashedUsers.length} users`);

    // Seed admins
    console.log("Seeding admins...");
    await Admin.insertMany(hashedAdmins);
    console.log(`Seeded ${hashedAdmins.length} admins`);

    // Seed courses
    console.log("Seeding courses...");
    await Course.insertMany(courses);
    console.log(`Seeded ${courses.length} courses`);

    console.log("Database seeding complete! Tables are now populated.");
  } catch (error) {
    console.error("An error occurred during seeding:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected.");
  }
};

// Run the seeding function
seedDatabase();
