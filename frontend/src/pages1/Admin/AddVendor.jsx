// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { createVendor } from "../../services/vendorApi";

// function AddVendor() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

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
//       await createVendor(formData);

//       alert("Vendor Created Successfully");

//       navigate("/admin/vendors");
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//         "Failed to create vendor"
//       );
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white p-6 shadow rounded">

//       <h1 className="text-2xl font-bold mb-5">
//         Add Vendor
//       </h1>

//       {error && (
//         <p className="text-red-500 mb-3">
//           {error}
//         </p>
//       )}

//       <form onSubmit={handleSubmit}>

//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           className="border p-2 w-full mb-3"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           className="border p-2 w-full mb-3"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           className="border p-2 w-full mb-3"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />

//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Create Vendor
//         </button>

//       </form>

//     </div>
//   );
// }

// export default AddVendor;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createVendor } from "../../services/vendorApi";

function AddVendor() {
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
      await createVendor(formData);

      alert("Vendor Created Successfully");

      navigate("/admin/vendors");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to create vendor"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 shadow-xl rounded-2xl border border-slate-100">

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Add Vendor
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Create a new vendor account
          </p>
        </div>

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
              placeholder="Enter vendor name"
              className="border border-slate-200 bg-slate-50 p-2.5 w-full rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
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
              placeholder="vendor@example.com"
              className="border border-slate-200 bg-slate-50 p-2.5 w-full rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
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
              className="border border-slate-200 bg-slate-50 p-2.5 w-full rounded-lg text-slate-800 placeholder-xz-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium px-4 py-2.5 rounded-lg shadow-sm transition mt-2"
          >
            Create Vendor
          </button>

        </form>

      </div>
    </div>
  );
}

export default AddVendor;