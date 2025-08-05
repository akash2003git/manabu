const { Stripe } = require("stripe");
const Course = require("../models/Course");
const User = require("../models/User");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: course.title,
              description: course.description,
            },
            unit_amount: Math.round(course.price * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}&courseId=${courseId}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-failed?courseId=${courseId}`,
      metadata: { courseId, userId: req.user.id },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ message: "Unable to create checkout session" });
  }
};

const handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { courseId, userId } = session.metadata;

    const user = await User.findById(userId);
    if (user && !user.purchasedCourses.includes(courseId)) {
      user.purchasedCourses.push(courseId);
      await user.save();
    }
  }

  res.json({ received: true });
};

const verifyCheckoutSession = async (req, res) => {
  try {
    const { sessionId } = req.query;

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      return res.json({ success: true });
    }

    return res.json({ success: false, status: session.payment_status });
  } catch (error) {
    console.error("Stripe verify error:", error);
    res.status(500).json({ message: "Unable to verify payment session" });
  }
};

module.exports = {
  createCheckoutSession,
  handleStripeWebhook,
  verifyCheckoutSession,
};
