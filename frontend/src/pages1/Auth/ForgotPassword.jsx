// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { forgotPassword } from "../../services/authApi";

// function ForgotPassword() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     newPassword: "",
//   });

//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const data = await forgotPassword(formData);

//       setMessage(data.message);
//       setError("");

//       setTimeout(() => {
//         navigate("/login");
//       }, 1500);
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           "Failed to update password"
//       );
//       setMessage("");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded shadow w-96"
//       >
//         <h1 className="text-2xl font-bold mb-5 text-center">
//           Forgot Password
//         </h1>

//         {message && (
//           <p className="text-green-600 mb-3">{message}</p>
//         )}

//         {error && (
//           <p className="text-red-500 mb-3">{error}</p>
//         )}

//         <input
//           type="email"
//           name="email"
//           placeholder="Enter Email"
//           className="border p-2 w-full mb-3"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="password"
//           name="newPassword"
//           placeholder="New Password"
//           className="border p-2 w-full mb-3"
//           value={formData.newPassword}
//           onChange={handleChange}
//           required
//         />

//         <button className="bg-blue-500 text-white p-2 rounded w-full">
//           Update Password
//         </button>
//       </form>
//     </div>
//   );
// }

// export default ForgotPassword;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword, resetPasswordWithOtp } from "../../services/authApi";

function ForgotPassword() {
  const navigate = useNavigate();

  // step 1 = enter email, request OTP
  // step 2 = enter OTP + new password, complete reset
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setMessage("");

    try {
      const data = await forgotPassword({ email: formData.email });
      setMessage(data.message || "If that email is registered, an OTP has been sent.");
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    setSubmitting(true);
    setError("");
    setMessage("");

    try {
      const data = await forgotPassword({ email: formData.email });
      setMessage(data.message || "A new OTP has been sent.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setMessage("");

    try {
      const data = await resetPasswordWithOtp({
        email: formData.email,
        otp: formData.otp,
        newPassword: formData.newPassword,
      });
      setMessage(data.message || "Password reset successful.");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <form
        onSubmit={step === 1 ? handleRequestOtp : handleResetPassword}
        className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 w-full max-w-sm"
      >
        <div className="flex justify-center mb-4">
          <div className="bg-blue-50 p-3 rounded-xl">
            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3m-3 0a3 3 0 11-6 0 3 3 0 016 0zm0 0v6m6-6v6M9 17h6" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-slate-800 text-center tracking-tight">
          Forgot Password
        </h1>
        <p className="text-sm text-slate-500 text-center mt-1 mb-6">
          {step === 1
            ? "Enter your email to receive a reset code"
            : "Enter the code sent to your email and your new password"}
        </p>

        {message && (
          <p className="text-sm text-green-700 bg-green-50 border border-green-100 rounded-lg px-3 py-2 mb-4">
            {message}
          </p>
        )}

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-4">
            {error}
          </p>
        )}

        {step === 1 && (
          <div className="mb-5">
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              className="border border-slate-200 bg-slate-50 p-2.5 w-full rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {step === 2 && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-600 mb-1">
                OTP Code
              </label>
              <input
                type="text"
                name="otp"
                placeholder="Enter 6-digit code"
                inputMode="numeric"
                maxLength={6}
                className="border border-slate-200 bg-slate-50 p-2.5 w-full rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={formData.otp}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-slate-600 mb-1">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                className="border border-slate-200 bg-slate-50 p-2.5 w-full rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={formData.newPassword}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60 text-white font-medium p-2.5 rounded-lg w-full shadow-sm transition"
        >
          {step === 1
            ? submitting ? "Sending..." : "Send Code"
            : submitting ? "Resetting..." : "Reset Password"}
        </button>

        {step === 2 && (
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={submitting}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium mt-3 w-full text-center"
          >
            Didn't get a code? Resend
          </button>
        )}

        <p className="text-center text-sm text-slate-500 mt-5">
          Remembered your password?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Back to Login
          </button>
        </p>
      </form>
    </div>
  );
}

export default ForgotPassword;