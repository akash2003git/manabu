const dotenv = require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
const cors = require("cors");
const userAuthRoutes = require("./src/routes/userAuthRoutes");
const adminAuthRoutes = require("./src/routes/adminAuthRoutes");
const courseRoutes = require("./src/routes/courseRoutes");
const courseContentRoutes = require("./src/routes/courseContentRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Manabu API!");
});

app.use("/api/user", userAuthRoutes);
app.use("/api/admin", adminAuthRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/courses/:courseId/content", courseContentRoutes);

// --- Start the Server ---
async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Manabu Backend Server running on port ${PORT}`);
  });
}
startServer();
