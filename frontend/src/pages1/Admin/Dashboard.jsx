import { useEffect, useState, useRef } from "react";
import { getDashboardStats } from "../../services/adminApi";

function Dashboard() {
  const [stats, setStats] = useState({
    totalVendors: 0,
    totalClients: 0,
    vendors: [],
    clients: [],
  });

  const [loading, setLoading] = useState(true);
  const [vendorDropdownOpen, setVendorDropdownOpen] = useState(false);
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);
  const [expandedVendor, setExpandedVendor] = useState(null);
  const [expandedClient, setExpandedClient] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null); // { item, type }

  const vendorRef = useRef(null);
  const clientRef = useRef(null);
  const detailRef = useRef(null);

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (vendorRef.current && !vendorRef.current.contains(e.target)) {
        setVendorDropdownOpen(false);
        setExpandedVendor(null);
      }
      if (clientRef.current && !clientRef.current.contains(e.target)) {
        setClientDropdownOpen(false);
        setExpandedClient(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleVendorClick = (vendor) => {
    if (expandedVendor?._id === vendor._id) {
      setExpandedVendor(null);
      setSelectedDetail(null);
    } else {
      setExpandedVendor(vendor);
      setSelectedDetail({ item: vendor, type: "vendor" });
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  const handleClientClick = (client) => {
    if (expandedClient?._id === client._id) {
      setExpandedClient(null);
      setSelectedDetail(null);
    } else {
      setExpandedClient(client);
      setSelectedDetail({ item: client, type: "client" });
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  const statusStyles = {
    Lead: "bg-amber-50 text-amber-600",
    Prospect: "bg-blue-50 text-blue-600",
    Active: "bg-emerald-50 text-emerald-600",
    Inactive: "bg-slate-100 text-slate-500",
  };

  const priorityStyles = {
    High: "bg-red-50 text-red-600",
    Medium: "bg-amber-50 text-amber-600",
    Low: "bg-slate-100 text-slate-500",
  };

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "—";

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-slate-500 mt-1">Overview of your platform activity</p>
      </div>

      {/* Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

        {/* Total Vendors Card */}
        <div className="relative overflow-visible bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                Total Vendors
              </h2>
              <p className="text-4xl mt-3 font-bold text-slate-800">
                {loading ? "—" : stats.totalVendors}
              </p>
            </div>
            <div className="bg-emerald-50 p-3 rounded-xl">
              <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" />
              </svg>
            </div>
          </div>

          {/* Vendor Dropdown */}
          <div ref={vendorRef} className="relative">
            <button
              onClick={() => {
                setVendorDropdownOpen((prev) => !prev);
                setExpandedVendor(null);
              }}
              disabled={stats.totalVendors === 0}
              className="inline-flex items-center gap-2 text-sm text-emerald-600 font-medium hover:text-emerald-800 disabled:text-slate-300 disabled:cursor-not-allowed transition"
            >
              {stats.totalVendors === 0 ? "No vendors yet" : "View Vendors"}
              {stats.totalVendors > 0 && (
                <svg
                  className={`w-4 h-4 transition-transform ${vendorDropdownOpen ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>

            {vendorDropdownOpen && (
              <div className="absolute z-30 top-8 left-0 w-72 bg-white border border-slate-100 rounded-xl shadow-xl overflow-hidden">
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                  {stats.vendors.map((vendor) => (
                    <div key={vendor._id}>
                      {/* Vendor Name Row */}
                      <button
                        onClick={() => handleVendorClick(vendor)}
                        className="w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors flex items-center justify-between"
                      >
                        <div>
                          <p className="text-sm font-medium text-slate-800">{vendor.name}</p>
                          <p className="text-xs text-slate-400 truncate">{vendor.email}</p>
                        </div>
                        <svg
                          className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 ml-2 ${expandedVendor?._id === vendor._id ? "rotate-180" : ""}`}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Inline Expanded Details */}
                      {expandedVendor?._id === vendor._id && (
                        <div className="bg-emerald-50 px-4 py-3 border-t border-emerald-100">
                          <div className="space-y-1.5">
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-500">Email</span>
                              <span className="text-slate-700 font-medium">{vendor.email || "—"}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-500">Role</span>
                              <span className="text-slate-700 font-medium capitalize">{vendor.role || "vendor"}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-500">Joined</span>
                              <span className="text-slate-700 font-medium">{formatDate(vendor.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500 rounded-b-2xl" />
        </div>

        {/* Total Clients Card */}
        <div className="relative overflow-visible bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                Total Clients
              </h2>
              <p className="text-4xl mt-3 font-bold text-slate-800">
                {loading ? "—" : stats.totalClients}
              </p>
            </div>
            <div className="bg-violet-50 p-3 rounded-xl">
              <svg className="w-6 h-6 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 100-8 4 4 0 000 8zm6 0a4 4 0 100-8" />
              </svg>
            </div>
          </div>

          {/* Client Dropdown */}
          <div ref={clientRef} className="relative">
            <button
              onClick={() => {
                setClientDropdownOpen((prev) => !prev);
                setExpandedClient(null);
              }}
              disabled={stats.totalClients === 0}
              className="inline-flex items-center gap-2 text-sm text-violet-600 font-medium hover:text-violet-800 disabled:text-slate-300 disabled:cursor-not-allowed transition"
            >
              {stats.totalClients === 0 ? "No clients yet" : "View Clients"}
              {stats.totalClients > 0 && (
                <svg
                  className={`w-4 h-4 transition-transform ${clientDropdownOpen ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>

            {clientDropdownOpen && (
              <div className="absolute z-30 top-8 left-0 w-72 bg-white border border-slate-100 rounded-xl shadow-xl overflow-hidden">
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                  {stats.clients.map((client) => (
                    <div key={client._id}>
                      {/* Client Name Row */}
                      <button
                        onClick={() => handleClientClick(client)}
                        className="w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors flex items-center justify-between"
                      >
                        <div>
                          <p className="text-sm font-medium text-slate-800">{client.clientName}</p>
                          <p className="text-xs text-slate-400 truncate">{client.email || "No email"}</p>
                        </div>
                        <svg
                          className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 ml-2 ${expandedClient?._id === client._id ? "rotate-180" : ""}`}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Inline Expanded Details */}
                      {expandedClient?._id === client._id && (
                        <div className="bg-violet-50 px-4 py-3 border-t border-violet-100">
                          <div className="space-y-1.5">
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-500">Email</span>
                              <span className="text-slate-700 font-medium">{client.email || "—"}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-500">Phone</span>
                              <span className="text-slate-700 font-medium">{client.phone || "—"}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-500">Status</span>
                              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusStyles[client.status] || "bg-slate-100 text-slate-500"}`}>
                                {client.status || "—"}
                              </span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-500">Priority</span>
                              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${priorityStyles[client.priority] || "bg-slate-100 text-slate-500"}`}>
                                {client.priority || "—"}
                              </span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-500">Added</span>
                              <span className="text-slate-700 font-medium">{formatDate(client.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="absolute bottom-0 left-0 w-full h-1 bg-violet-500 rounded-b-2xl" />
        </div>

      </div>

      {/* Detail Panel Below Cards */}
      {selectedDetail && (
        <div ref={detailRef} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 transition-all">

          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${selectedDetail.type === "vendor" ? "bg-emerald-50" : "bg-violet-50"}`}>
                {selectedDetail.type === "vendor" ? (
                  <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 100-8 4 4 0 000 8zm6 0a4 4 0 100-8" />
                  </svg>
                )}
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  {selectedDetail.type === "vendor"
                    ? selectedDetail.item.name
                    : selectedDetail.item.clientName}
                </h2>
                <p className="text-xs text-slate-400 capitalize">{selectedDetail.type} Details</p>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedDetail(null);
                setExpandedVendor(null);
                setExpandedClient(null);
              }}
              className="text-slate-400 hover:text-slate-600 transition"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {selectedDetail.type === "vendor" ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-1">Email</p>
                <p className="text-sm font-medium text-slate-700">{selectedDetail.item.email || "—"}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-1">Role</p>
                <p className="text-sm font-medium text-slate-700 capitalize">{selectedDetail.item.role || "vendor"}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-1">Joined</p>
                <p className="text-sm font-medium text-slate-700">{formatDate(selectedDetail.item.createdAt)}</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-1">Email</p>
                <p className="text-sm font-medium text-slate-700">{selectedDetail.item.email || "—"}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-1">Phone</p>
                <p className="text-sm font-medium text-slate-700">{selectedDetail.item.phone || "—"}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-1">Status</p>
                <span className={`inline-flex text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[selectedDetail.item.status] || "bg-slate-100 text-slate-500"}`}>
                  {selectedDetail.item.status || "—"}
                </span>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-1">Priority</p>
                <span className={`inline-flex text-xs font-medium px-2.5 py-1 rounded-full ${priorityStyles[selectedDetail.item.priority] || "bg-slate-100 text-slate-500"}`}>
                  {selectedDetail.item.priority || "—"}
                </span>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-1">Added</p>
                <p className="text-sm font-medium text-slate-700">{formatDate(selectedDetail.item.createdAt)}</p>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}

export default Dashboard;