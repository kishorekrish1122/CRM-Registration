const express = require("express");

const router = express.Router();

const {
  createVendor,
  getVendors,
  deleteVendor,
} = require("../controllers/vendorController");

const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createVendor
);

router.get(
  "/",
  protect,
  authorizeRoles("admin"),
  getVendors
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteVendor
);

module.exports = router;