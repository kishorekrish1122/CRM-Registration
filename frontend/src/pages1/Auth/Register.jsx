import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authApi";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false); // true once registration succeeds

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await registerUser(formData);
      setSubmitted(true); // shows the success card below instead of alert()
    } catch (error) {
      setError(error.response?.data?.message || "Registration Failed");
    }
  };

  // ── Success state: shown after a successful POST /auth/register ──
  if (submitted) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 w-full max-w-[400px] text-center">

          <div className="flex justify-center mb-4">
            <div className="bg-emerald-50 p-3 rounded-xl">
              <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Registration Successful
          </h1>
          <p className="text-sm text-slate-500 mt-2 mb-6">
            Your account is pending admin approval. You'll be able to log in once an admin approves your account.
          </p>

          <Link
            to="/login"
            className="inline-flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium py-2.5 rounded-lg shadow-sm transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  // ── Default state: the registration form ──
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 w-full max-w-[400px]">

        <div className="flex justify-center mb-4">
          <div className="bg-blue-50 p-3 rounded-xl">
            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-3a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-slate-800 text-center tracking-tight">
          Create Account
        </h1>
        <p className="text-sm text-slate-500 text-center mt-1 mb-6">
          Register to get started
        </p>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-600 mb-1">Name</label>
            <input
              type="text" name="name" placeholder="Name"
              value={formData.name} onChange={handleChange}
              className="w-full border border-slate-200 bg-slate-50 p-2.5 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-600 mb-1">Email</label>
            <input
              type="email" name="email" placeholder="Email"
              value={formData.email} onChange={handleChange}
              className="w-full border border-slate-200 bg-slate-50 p-2.5 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-slate-600 mb-1">Password</label>
            <input
              type="password" name="password" placeholder="Password"
              value={formData.password} onChange={handleChange}
              className="w-full border border-slate-200 bg-slate-50 p-2.5 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium py-2.5 rounded-lg shadow-sm transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-5">
          Already have an account?
          <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium ml-2">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;