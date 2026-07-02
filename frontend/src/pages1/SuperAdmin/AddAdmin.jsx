
import { useState } from "react";
import { createAdmin } from "../../services/adminApi";
import { useNavigate } from "react-router-dom";

function AddAdmin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createAdmin(formData);

      alert("Admin Created Successfully");

      navigate("/superadmin/admins");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to create admin"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 shadow-xl rounded-2xl border border-slate-100">

        <div className="flex justify-center mb-4">
          <div className="bg-violet-50 p-3 rounded-xl">
            <svg className="w-6 h-6 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5L19 8v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V8l7-3.5z" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-slate-800 text-center tracking-tight">
          Add Admin
        </h1>
        <p className="text-sm text-slate-500 text-center mt-1 mb-6">
          Create a new admin account
        </p>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Name
            </label>
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
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Email
            </label>
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
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="border border-slate-200 bg-slate-50 p-2.5 w-full rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            className="w-full bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white font-medium px-4 py-2.5 rounded-lg shadow-sm transition mt-2"
          >
            Create Admin
          </button>

        </form>

      </div>
    </div>
  );
}

export default AddAdmin;