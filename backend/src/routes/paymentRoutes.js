const express = require("express");
const {
  createCheckoutSession,
  verifyCheckoutSession,
} = require("../controllers/paymentController");
const { authenticateUser } = require("../middleware/authMiddleware");

const router = express.Router();

// Checkout session
router.post(
  "/create-checkout-session",
  authenticateUser,
  createCheckoutSession,
);

router.get("/verify-session", verifyCheckoutSession);

module.exports = router;
