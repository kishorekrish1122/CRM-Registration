import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle, Mail, Shield, Calendar, KeyRound, Eye, EyeOff } from "lucide-react";
import { resetPassword } from "../../services/authApi";

function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "—";

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
    setSuccess("");
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    if (formData.newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      await resetPassword(
        { oldPassword: formData.oldPassword, newPassword: formData.newPassword },
        token
      );
      setSuccess("Password updated successfully!");
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      setShowForm(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Profile</h1>
        <p className="text-slate-500 mt-1 text-sm">Your account information</p>
      </div>

      <div className="max-w-2xl space-y-6">

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center gap-5 mb-6">
            <div className="bg-violet-100 p-4 rounded-2xl">
              <UserCircle className="w-10 h-10 text-violet-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">{user.name || "Vendor"}</h2>
              <span className="inline-block mt-1 text-xs font-semibold px-3 py-1 rounded-full bg-violet-50 text-violet-600 capitalize">
                {user.role || "vendor"}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
              <Mail className="w-5 h-5 text-slate-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-slate-400 font-medium">Email</p>
                <p className="text-sm font-semibold text-slate-700">{user.email || "—"}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
              <Shield className="w-5 h-5 text-slate-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-slate-400 font-medium">Role</p>
                <p className="text-sm font-semibold text-slate-700 capitalize">{user.role || "vendor"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-amber-50 p-2.5 rounded-xl">
                <KeyRound className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800">Change Password</h3>
                <p className="text-xs text-slate-400">Update your account password</p>
              </div>
            </div>
            <button
              onClick={() => { setShowForm((p) => !p); setError(""); setSuccess(""); }}
              className="text-sm font-semibold text-violet-600 hover:text-violet-800 transition"
            >
              {showForm ? "Cancel" : "Change"}
            </button>
          </div>

          {success && (
            <p className="text-sm text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2 mb-4">
              {success}
            </p>
          )}

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-4">
              {error}
            </p>
          )}

          {showForm && (
            <form onSubmit={handlePasswordReset} className="space-y-4">

              {/* Old Password */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Current Password</label>
                <div className="relative">
                  <input
                    type={showOld ? "text" : "password"}
                    name="oldPassword"
                    placeholder="Enter current password"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    required
                    className="border border-slate-200 bg-slate-50 p-2.5 pr-10 w-full rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
                  />
                  <button type="button" onClick={() => setShowOld((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showOld ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">New Password</label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    name="newPassword"
                    placeholder="Enter new password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                    className="border border-slate-200 bg-slate-50 p-2.5 pr-10 w-full rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
                  />
                  <button type="button" onClick={() => setShowNew((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="border border-slate-200 bg-slate-50 p-2.5 w-full rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-violet-300 text-white font-semibold px-4 py-2.5 rounded-lg shadow-sm transition"
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}

export default Profile;