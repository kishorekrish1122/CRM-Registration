import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";

function VendorList() {
  const [vendors, setVendors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      // FIX: changed from "/admin/vendors/all" to "/admin/all-vendors"
      // to avoid Express 5 router ambiguity with the "/:id" route
      const response = await axiosInstance.get("/admin/all-vendors");
      setVendors(response.data);
    } catch (err) {
      setError("Failed to load vendors");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredVendors = vendors.filter(
    (v) =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Vendor List</h1>
        <p className="text-slate-500 mt-1">All registered vendors on the platform</p>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3 mb-6">
          {error}
        </p>
      )}

      <div className="relative mb-6">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search vendors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-slate-200 bg-white p-2.5 pl-10 w-full rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition shadow-sm"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">#</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Name</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Email</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Joined</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                [...Array(4)].map((_, i) => (
                  <tr key={i}>
                    {[...Array(5)].map((_, j) => (
                      <td key={j} className="px-5 py-4">
                        <div className="h-4 bg-slate-100 rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filteredVendors.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-slate-400">
                    No vendors found
                  </td>
                </tr>
              ) : (
                filteredVendors.map((vendor, index) => (
                  <tr key={vendor._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4 text-slate-400 text-sm">{index + 1}</td>
                    <td className="px-5 py-4 text-slate-800 font-medium">{vendor.name}</td>
                    <td className="px-5 py-4 text-slate-600">{vendor.email}</td>
                    <td className="px-5 py-4 text-slate-500 text-sm">
                      {new Date(vendor.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600">
                        Vendor
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default VendorList;