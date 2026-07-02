import axios from "axios";

// If /auth/register 404s, this baseURL prefix is the first thing to check.
// Two common fixes:
//   1) If your backend mounts routes at app.use("/auth", ...) and you have
//      a Vite proxy forwarding "/auth" to the backend port — leave as is.
//   2) If there's no proxy, point this at the full backend URL instead, e.g.
//      const API_URL = "http://localhost:5000/auth";
const API_URL = "http://localhost:5000/api/auth";

export const registerUser = async (formData) => {
  const res = await axios.post(`${API_URL}/register`, formData);
  return res.data;
};

export const loginUser = async (formData) => {
  const res = await axios.post(`${API_URL}/login`, formData);
  return res.data;
};

// authRoutes.js defines this as router.post("/forgot-password", ...).
// Step 1 of the OTP flow — sends an OTP to the user's email.
export const forgotPassword = async (formData) => {
  const res = await axios.post(`${API_URL}/forgot-password`, formData);
  return res.data;
};

// FIX: was missing entirely. authRoutes.js defines
// router.post("/reset-password-otp", resetPasswordWithOtp) — this is step 2
// of the OTP flow. Without this function, there was no way for the
// frontend to actually submit the OTP + new password and complete a reset.
// formData shape: { email, otp, newPassword }
export const resetPasswordWithOtp = async (formData) => {
  const res = await axios.post(`${API_URL}/reset-password-otp`, formData);
  return res.data;
};

// authRoutes.js defines this as router.put("/reset-password", protect, ...)
// — requires a logged-in user's token, since authController.resetPassword
// reads req.user._id. Must send the Authorization header.
export const resetPassword = async (formData) => {
  const token = localStorage.getItem("token");
  const res = await axios.put(`${API_URL}/reset-password`, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const changePassword = async (formData) => {
  const token = localStorage.getItem("token");
  const res = await axios.put(`${API_URL}/change-password`, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};