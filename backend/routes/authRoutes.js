const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getProfile,
  forgotPassword,
  resetPasswordWithOtp,
  resetPassword,
  changePassword,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password-otp", resetPasswordWithOtp); // FIX: added — verifies OTP and sets new password

router.get("/profile", protect, getProfile);
router.put("/reset-password", protect, resetPassword);
router.put("/change-password", protect, changePassword);

module.exports = router;