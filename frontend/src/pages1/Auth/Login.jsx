import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/authApi";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
      const data = await loginUser(formData);

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("user", JSON.stringify(data));

      if (data.role === "superadmin") {
        navigate("/superadmin/dashboard");
      } else if (data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/vendor/dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 w-full max-w-sm"
      >
        <div className="flex justify-center mb-4">
          <div className="bg-blue-50 p-3 rounded-xl">
            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m8 0a4 4 0 10-8 0m8 0v6a2 2 0 01-2 2H10a2 2 0 01-2-2v-6m8 0V9a4 4 0 10-8 0v3" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-slate-800 text-center tracking-tight">
          Welcome Back
        </h1>
        <p className="text-sm text-slate-500 text-center mt-1 mb-6">
          Login to access your dashboard
        </p>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-4">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border border-slate-200 bg-slate-50 p-2.5 w-full rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border border-slate-200 bg-slate-50 p-2.5 w-full rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium w-full p-2.5 rounded-lg shadow-sm transition"
        >
          Login
        </button>

        <div className="mt-5 text-center">
          <Link
            to="/forgot-password"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Forgot Password?
          </Link>

          <p className="mt-4 text-sm text-slate-500">
            Don't have an account?
            <Link
              to="/register"
              className="text-emerald-600 hover:text-emerald-700 font-medium ml-2"
            >
              Register
            </Link>
          </p>
        </div>

      </form>

    </div>
  );
}

export default Login;