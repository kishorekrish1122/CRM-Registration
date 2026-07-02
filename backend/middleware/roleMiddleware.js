const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    console.log("=== AUTHORIZE ROLES HIT:", req.originalUrl, "| user role:", req.user?.role, "| required:", roles, "===");

    if (!req.user) {
      return res.status(401).json({ message: "Not authorized, no user" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access Denied",
      });
    }

    next();
  };
};

module.exports = authorizeRoles;