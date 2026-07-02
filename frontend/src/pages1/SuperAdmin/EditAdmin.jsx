import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";

function EditAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAdmin();
  }, []);

  const fetchAdmin = async () => {
    try {
      const response = await axiosInstance.get(`/admin/${id}`);
      setFormData({ name: response.data.name, email: response.data.email, password: "" });
    } catch (err) {
      setError("Failed to load admin details");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const body = { name: formData.name, email: formData.email };
      if (formData.password) body.password = formData.password;
      await axiosInstance.put(`/admin/${id}`, body);
      navigate("/superadmin/admins");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update admin");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 shadow-xl rounded-2xl border border-slate-100">

        <div className="flex justify-center mb-4">
          <div className="bg-violet-50 p-3 rounded-xl">
            <svg className="w-6 h-6 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-slate-800 text-center tracking-tight">Edit Admin</h1>
        <p className="text-sm text-slate-500 text-center mt-1 mb-6">Update admin account details</p>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter admin name"
              className="border border-slate-200 bg-slate-50 p-2.5 w-full rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="admin@example.com"
              className="border border-slate-200 bg-slate-50 p-2.5 w-full rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              New Password <span className="text-slate-400 font-normal">(leave blank to keep current)</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="border border-slate-200 bg-slate-50 p-2.5 w-full rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={() => navigate("/superadmin/admins")}
              className="w-full border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium px-4 py-2.5 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white font-medium px-4 py-2.5 rounded-lg shadow-sm transition"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditAdmin;