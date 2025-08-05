const express = require("express");
const { createCheckoutSession } = require("../controllers/paymentController");
const { authenticateUser } = require("../middleware/authMiddleware");

const router = express.Router();

// Checkout session
router.post(
  "/create-checkout-session",
  authenticateUser,
  createCheckoutSession,
);

module.exports = router;
