const express = require("express");
const router = express.Router();

const {
  getDashboardReport,
  getRecentUsers,
} = require("../controllers/reportController");

const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Dashboard Statistics
router.get(
  "/dashboard",
  protect,
  authorizeRoles("superadmin", "admin"),
  getDashboardReport
);

// Recent Users
router.get(
  "/recent-users",
  protect,
  authorizeRoles("superadmin"),
  getRecentUsers
);

module.exports = router;