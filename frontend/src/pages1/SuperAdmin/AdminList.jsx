import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAdmins,
  getPendingAdmins,
  approveAdmin,
  rejectAdmin,
  deleteAdmin,
} from "../../services/adminApi";

function AdminList() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("all"); // "all" | "pending"
  const [admins, setAdmins] = useState([]);
  const [pendingAdmins, setPendingAdmins] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // FIX: surfaces approve/reject/delete failures to the superadmin instead
  // of only logging them to the console.
  const [actionError, setActionError] = useState("");

  // Approve modal state
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [approveTarget, setApproveTarget] = useState(null);
  const [selectedRole, setSelectedRole] = useState("admin");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [allData, pendingData] = await Promise.all([
        getAdmins(),
        getPendingAdmins(),
      ]);
      setAdmins(Array.isArray(allData) ? allData : []);
      setPendingAdmins(Array.isArray(pendingData) ? pendingData : []);
    } catch (error) {
      console.log(error);
      setAdmins([]);
      setPendingAdmins([]);
    } finally {
      setLoading(false);
    }
  };

  const openApproveModal = (admin) => {
    setApproveTarget(admin);
    setSelectedRole(admin.role || "admin");
    setApproveModalOpen(true);
  };

  const closeApproveModal = () => {
    setApproveModalOpen(false);
    setApproveTarget(null);
    setSelectedRole("admin");
  };

  const confirmApprove = async () => {
    if (!approveTarget) return;
    setActionError(""); // FIX
    try {
      await approveAdmin(approveTarget._id, selectedRole);
      closeApproveModal();
      fetchData();
    } catch (error) {
      console.log(error);
      // FIX: assumes an axios-style error shape (error.response.data.message).
      // Adjust this line if adminApi.js uses fetch or a different error format.
      setActionError(
        error?.response?.data?.message || "Failed to approve user. Please try again."
      );
    }
  };

  const handleReject = async (id) => {
    const confirmReject = window.confirm("Are you sure you want to reject this admin?");
    if (!confirmReject) return;
    setActionError(""); // FIX
    try {
      await rejectAdmin(id);
      fetchData();
    } catch (error) {
      console.log(error);
      setActionError(
        error?.response?.data?.message || "Failed to reject user. Please try again."
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this admin?");
    if (!confirmDelete) return;
    setActionError(""); // FIX
    try {
      await deleteAdmin(id);
      fetchData();
    } catch (error) {
      console.log(error);
      setActionError(
        error?.response?.data?.message || "Failed to delete admin. Please try again."
      );
    }
  };

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(search.toLowerCase()) ||
      admin.email.toLowerCase().includes(search.toLowerCase())
  );

  const filteredPending = pendingAdmins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(search.toLowerCase()) ||
      admin.email.toLowerCase().includes(search.toLowerCase())
  );

  const initial = (name) => name?.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Admin List</h1>
          <p className="text-sm text-slate-500 mt-1">
            {filteredAdmins.length} admin{filteredAdmins.length !== 1 ? "s" : ""} found
          </p>
        </div>
        <button
          onClick={() => navigate("/superadmin/add-admin")}
          className="inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white font-medium px-4 py-2.5 rounded-lg shadow-sm transition"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Admin
        </button>
      </div>

      {/* FIX: error banner for failed approve/reject/delete actions */}
      {actionError && (
        <div className="flex items-center justify-between gap-3 bg-red-50 border border-red-200 text-left rounded-xl px-5 py-3.5 mb-6">
          <p className="text-sm font-medium text-red-700">{actionError}</p>
          <button
            onClick={() => setActionError("")}
            className="text-red-500 hover:text-red-700 shrink-0"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Pending notification banner */}
      {pendingAdmins.length > 0 && activeTab !== "pending" && (
        <button
          onClick={() => setActiveTab("pending")}
          className="w-full flex items-center justify-between gap-3 bg-amber-50 border border-amber-200 text-left rounded-xl px-5 py-3.5 mb-6 hover:bg-amber-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-amber-700">
                {pendingAdmins.length} admin{pendingAdmins.length !== 1 ? "s" : ""} waiting for approval
              </p>
              <p className="text-xs text-amber-600">Click to review pending registrations</p>
            </div>
          </div>
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white text-xs font-semibold shrink-0">
            {pendingAdmins.length}
          </span>
        </button>
      )}

      {/* Tabs + search row */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        <div className="inline-flex bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "all"
                ? "bg-violet-600 text-white"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            All Admins ({admins.length})
          </button>
          <button
            onClick={() => setActiveTab("pending")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "pending"
                ? "bg-violet-600 text-white"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Pending
            {pendingAdmins.length > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white text-xs font-semibold">
                {pendingAdmins.length}
              </span>
            )}
          </button>
        </div>

        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search Admin..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-slate-200 bg-white p-2.5 pl-10 w-full rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition shadow-sm"
          />
        </div>
      </div>

      {/* All Admins table */}
      {activeTab === "all" && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">#</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Name</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Email</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Role</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  [...Array(3)].map((_, i) => (
                    <tr key={i}>
                      {[...Array(5)].map((_, j) => (
                        <td key={j} className="px-5 py-4">
                          <div className="h-4 bg-slate-100 rounded animate-pulse" />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : filteredAdmins.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-10 text-center text-slate-400">
                      No admins found
                    </td>
                  </tr>
                ) : (
                  filteredAdmins.map((admin, index) => (
                    <tr key={admin._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4 text-slate-400 text-sm">{index + 1}</td>
                      <td className="px-5 py-4 text-slate-800 font-medium">{admin.name}</td>
                      <td className="px-5 py-4 text-slate-600">{admin.email}</td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-violet-50 text-violet-600">
                          {admin.role}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => navigate(`/superadmin/edit-admin/${admin._id}`)}
                            className="bg-blue-50 hover:bg-blue-500 text-blue-600 hover:text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(admin._id)}
                            className="bg-red-50 hover:bg-red-500 text-red-600 hover:text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pending Approvals table */}
      {activeTab === "pending" && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m5-7a4 4 0 110 8 4 4 0 010-8zm6 4a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h2 className="font-semibold text-slate-800">Pending Approvals</h2>
            </div>
            <span className="text-sm text-slate-400">{filteredPending.length} admins</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Name</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Email</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Registered</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  [...Array(2)].map((_, i) => (
                    <tr key={i}>
                      {[...Array(5)].map((_, j) => (
                        <td key={j} className="px-5 py-4">
                          <div className="h-4 bg-slate-100 rounded animate-pulse" />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : filteredPending.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-10 text-center text-slate-400">
                      No pending admins
                    </td>
                  </tr>
                ) : (
                  filteredPending.map((admin) => (
                    <tr key={admin._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold">
                            {initial(admin.name)}
                          </div>
                          <span className="text-slate-800 font-medium">{admin.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-slate-600">{admin.email}</td>
                      <td className="px-5 py-4 text-slate-600">
                        {new Date(admin.createdAt).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-600">
                          Pending
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openApproveModal(admin)}
                            className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-500 text-emerald-600 hover:text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(admin._id)}
                            className="inline-flex items-center gap-1.5 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Approve User modal */}
      {approveModalOpen && approveTarget && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold text-slate-800">Approve User</h3>
              <button
                onClick={closeApproveModal}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-base font-semibold">
                {initial(approveTarget.name)}
              </div>
              <div>
                <p className="text-slate-800 font-medium">{approveTarget.name}</p>
                <p className="text-sm text-slate-400">{approveTarget.email}</p>
              </div>
            </div>

            <label className="block text-sm font-medium text-slate-700 mb-2">Assign Role</label>
            <div className="relative mb-6">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 pr-10 text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="admin">Admin</option>
                <option value="vendor">Vendor</option>
              </select>
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={closeApproveModal}
                className="flex-1 border border-slate-200 text-slate-700 font-medium py-2.5 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmApprove}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Approve &amp; Activate
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default AdminList;