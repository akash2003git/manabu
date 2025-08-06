const jwt = require("jsonwebtoken");

async function authenticateJwt(req, res, next) {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return res
          .status(401)
          .json({ message: "Not authorized, no token provided!" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;
      next();
    } catch (error) {
      console.error("Access token verification failed:", error.message);
      return res
        .status(401)
        .json({ message: "Not authorized, access token invalid or expired" });
    }
  } else {
    return res.status(401).json({
      message: "Not authorized, token format is incorrect or missing!",
    });
  }
}

function authenticateUser(req, res, next) {
  // authenticateJwt will put the decoded token payload on req.user
  authenticateJwt(req, res, () => {
    if (req.user && req.user.role === "user") {
      next(); // User is authenticated and has 'user' role
    } else {
      return res.status(403).json({ message: "Forbidden: Not a user." });
    }
  });
}

function authenticateAdmin(req, res, next) {
  authenticateJwt(req, res, () => {
    // authenticateJwt will put the decoded token payload on req.user
    if (req.user && req.user.role === "admin") {
      next(); // User is authenticated and has 'admin' role
    } else {
      return res.status(403).json({ message: "Forbidden: Not an admin." });
    }
  });
}

function attachUserIfAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      console.warn("Invalid token provided, ignoring user context.");
    }
  }

  next();
}

module.exports = {
  authenticateJwt,
  authenticateUser,
  authenticateAdmin,
  attachUserIfAuthenticated,
};
