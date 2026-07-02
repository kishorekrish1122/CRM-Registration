const express = require("express");
const router = express.Router();

const {
  createAdmin,
  getAdmins,
  getPendingAdmins,
  approveAdmin,
  rejectAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  getDashboardStats,
  getAllVendorsForSuperAdmin,
  getAllClientsForSuperAdmin,
} = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// FIX: validate :id param is a 24-char hex ObjectId before reaching
// any handler. If it's not (e.g. "all-vendors", "all-clients", "pending"),
// skip this route entirely so Express falls through to other routes.
router.param("id", (req, res, next, id) => {
  if (!/^[0-9a-fA-F]{24}$/.test(id)) {
    return next("route");
  }
  next();
});

router.get(
  "/dashboard",
  protect,
  authorizeRoles("superadmin"),
  getDashboardStats
);

router.post(
  "/",
  protect,
  authorizeRoles("superadmin"),
  createAdmin
);

router.get(
  "/",
  protect,
  authorizeRoles("superadmin"),
  getAdmins
);

router.get(
  "/pending",
  protect,
  authorizeRoles("superadmin"),
  getPendingAdmins
);

router.get(
  "/all-vendors",
  protect,
  authorizeRoles("superadmin"),
  getAllVendorsForSuperAdmin
);

router.get(
  "/all-clients",
  protect,
  authorizeRoles("superadmin"),
  getAllClientsForSuperAdmin
);

router.patch(
  "/:id/approve",
  protect,
  authorizeRoles("superadmin"),
  approveAdmin
);

router.patch(
  "/:id/reject",
  protect,
  authorizeRoles("superadmin"),
  rejectAdmin
);

router.get(
  "/:id",
  protect,
  authorizeRoles("superadmin"),
  getAdminById
);

router.put(
  "/:id",
  protect,
  authorizeRoles("superadmin"),
  updateAdmin
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("superadmin"),
  deleteAdmin
);

module.exports = router;