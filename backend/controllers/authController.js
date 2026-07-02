const crypto = require("crypto");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");

const OTP_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes

// Hash the OTP before storing — mirrors why we never store raw passwords.
const hashOtp = (otp) => crypto.createHash("sha256").update(otp).digest("hex");

// Generates a 6-digit numeric OTP as a string, e.g. "042913"
const generateOtp = () => String(Math.floor(100000 + Math.random() * 900000));

// Register User
// Self-registration always lands in status "pending" with a placeholder
// role of "vendor" — the superadmin assigns the real role on approval.
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: null,
      status: "pending",
    });

    if (user) {
      // No token issued here — account is pending approval, login is blocked until then
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        status: user.status,
        message: "Registration successful. Your account is pending admin approval.",
      });
    }
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// Login User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    if (user.status === "pending") {
      return res.status(403).json({
        message: "Your account is pending admin approval. Please wait for approval before logging in.",
      });
    }

    if (user.status === "rejected") {
      return res.status(403).json({
        message: "Your registration was rejected. Please contact the admin.",
      });
    }

    // status === "active" — proceed with login
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Forgot Password — Step 1: request an OTP
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    // Always return the same generic message whether or not the user exists,
    // so this endpoint can't be used to check which emails are registered.
    const genericResponse = {
      message: "If that email is registered, an OTP has been sent.",
    };

    if (!user) {
      return res.status(200).json(genericResponse);
    }

    const otp = generateOtp();

    user.resetOtp = hashOtp(otp);
    user.resetOtpExpiry = new Date(Date.now() + OTP_EXPIRY_MS);
    // Skip password re-hashing — only resetOtp/resetOtpExpiry changed, not password.
    await user.save({ validateBeforeSave: true });

    try {
      await sendEmail({
        to: user.email,
        subject: "Your password reset code",
        text: `Your password reset code is ${otp}. It expires in 10 minutes. If you didn't request this, you can ignore this email.`,
        html: `<p>Your password reset code is <strong>${otp}</strong>.</p><p>It expires in 10 minutes. If you didn't request this, you can ignore this email.</p>`,
      });
    } catch (emailError) {
      console.error("FORGOT PASSWORD - EMAIL SEND ERROR:", emailError);
      // Roll back the OTP so a failed-to-send code can't be used later,
      // and so the user can immediately retry without hitting a stale OTP.
      user.resetOtp = undefined;
      user.resetOtpExpiry = undefined;
      await user.save();
      return res.status(500).json({ message: "Failed to send OTP email. Please try again." });
    }

    res.status(200).json(genericResponse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reset Password with OTP — Step 2: verify the OTP and set the new password
const resetPasswordWithOtp = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        message: "Email, OTP, and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "New password must be at least 6 characters",
      });
    }

    const user = await User.findOne({ email });

    if (!user || !user.resetOtp || !user.resetOtpExpiry) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    if (user.resetOtpExpiry.getTime() < Date.now()) {
      // Clear the stale OTP so it can't be reused.
      user.resetOtp = undefined;
      user.resetOtpExpiry = undefined;
      await user.save();
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const isOtpMatch = user.resetOtp === hashOtp(otp);

    if (!isOtpMatch) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.password = newPassword;
    // Clear the OTP so it can't be reused for another reset.
    user.resetOtp = undefined;
    user.resetOtpExpiry = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: "New password must be at least 6 characters" });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.matchPassword(oldPassword);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid old password" });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Change Password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current password and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "New password must be at least 6 characters",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  forgotPassword,
  resetPasswordWithOtp,
  resetPassword,
  changePassword,
};