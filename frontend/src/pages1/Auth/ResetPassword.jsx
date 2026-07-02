// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { resetPassword } from "../../services/authApi";

// function ResetPassword() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     oldPassword: "",
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
//       const token = localStorage.getItem("token");

//       const data = await resetPassword(formData, token);

//       setMessage(data.message);
//       setError("");

//       setTimeout(() => {
//         navigate("/login");
//       }, 1500);

//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//         "Password reset failed"
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
//           Reset Password
//         </h1>

//         {message && (
//           <p className="text-green-600 mb-3">
//             {message}
//           </p>
//         )}

//         {error && (
//           <p className="text-red-500 mb-3">
//             {error}
//           </p>
//         )}

//         <input
//           type="password"
//           name="oldPassword"
//           placeholder="Old Password"
//           className="border p-2 w-full mb-3"
//           value={formData.oldPassword}
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

//         <button
//           className="bg-green-600 text-white p-2 w-full rounded"
//         >
//           Reset Password
//         </button>
//       </form>
//     </div>
//   );
// }

// export default ResetPassword;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/authApi";

function ResetPassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    oldPassword: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setMessage("");

    try {
      // FIX: resetPassword() in authApi.js already reads the token from
      // localStorage internally and attaches the Authorization header —
      // no need to fetch or pass it here.
      const data = await resetPassword(formData);

      setMessage(data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Password reset failed"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 w-full max-w-sm"
      >
        <div className="flex justify-center mb-4">
          <div className="bg-emerald-50 p-3 rounded-xl">
            <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3m-3 0a3 3 0 11-6 0 3 3 0 016 0zm0 0v6m6-6v6M9 17h6" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-slate-800 text-center tracking-tight">
          Reset Password
        </h1>
        <p className="text-sm text-slate-500 text-center mt-1 mb-6">
          Enter your old and new password
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

        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Old Password
          </label>
          <input
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            className="border border-slate-200 bg-slate-50 p-2.5 w-full rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            value={formData.oldPassword}
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
            className="border border-slate-200 bg-slate-50 p-2.5 w-full rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            value={formData.newPassword}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-60 text-white font-medium p-2.5 w-full rounded-lg shadow-sm transition"
        >
          {submitting ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;