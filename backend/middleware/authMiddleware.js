const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  console.log("=== PROTECT MIDDLEWARE HIT:", req.method, req.originalUrl, "===");
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "Not authorized, user no longer exists" });
      }

      if (req.user.status !== "active") {
        return res.status(403).json({ message: "Account is not active" });
      }

      console.log("=== PROTECT PASSED, user role:", req.user.role, "===");
      next();
    } else {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
  } catch (error) {
    console.log("=== PROTECT ERROR:", error.message, "===");
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

module.exports = { protect };