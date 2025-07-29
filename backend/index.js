require("dotenv").config();

const express = require("express");
const connectDB = require("./src/config/db");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to Manabu API!");
});

// --- Start the Server ---
async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Manabu Backend Server running on port ${PORT}`);
  });
}
startServer();
