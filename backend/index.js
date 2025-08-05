const dotenv = require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./src/config/db");
const cors = require("cors");
const userAuthRoutes = require("./src/routes/userAuthRoutes");
const adminAuthRoutes = require("./src/routes/adminAuthRoutes");
const courseRoutes = require("./src/routes/courseRoutes");
const courseContentRoutes = require("./src/routes/courseContentRoutes");
const userRoutes = require("./src/routes/userRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const paymentRoutes = require("./src/routes/paymentRoutes.js");

const app = express();
const PORT = process.env.PORT || 3000;

// Webhook route BEFORE express.json()
const { handleStripeWebhook } = require("./src/controllers/paymentController");
app.post(
  "/api/payment/webhook",
  express.raw({ type: "application/json" }),
  handleStripeWebhook,
);

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
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);

// --- Start the Server ---
async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Manabu Backend Server running on port ${PORT}`);
  });
}
startServer();
