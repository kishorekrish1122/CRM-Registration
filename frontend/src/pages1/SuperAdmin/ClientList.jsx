import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";

const UPLOADS_BASE_URL = "http://localhost:5000/uploads";

const DOC_LABELS = {
  ec: "EC (Encumbrance Certificate)",
  mother_deed: "Mother Deed",
  stamp: "Stamp Verification",
  sale_record: "Sale Record",
  reg_deed: "Registration Deed",
  sale_deed: "Sale Deed",
  gift_deed: "Gift Deed",
  partition_deed: "Partition Deed",
  settlement_deed: "Settlement Deed",
  will_deed: "Will / Testament",
  power_attorney: "Power of Attorney",
  lease_deed: "Lease Deed",
  mortgage_deed: "Mortgage Deed",
  release_deed: "Release Deed",
  adoption_deed: "Adoption Deed",
  patta: "Patta / Chitta",
  adangal: "Adangal",
  fmb: "FMB Sketch",
  tslr: "TSLR Extract",
  tax_receipt: "Property Tax Receipt",
  building_plan: "Building Plan Approval",
  occupancy: "Occupancy Certificate",
  land_value: "Land Value Certificate",
  survey: "Survey Document",
};

// ADDED: Documents modal — same as Vendor ClientList
function DocumentsModal({ client, onClose }) {
  const allDocs = [];

  if (client.document) {
    allDocs.push({ label: "Main Document", filename: client.document });
  }

  if (client.registrationDocs) {
    Object.entries(client.registrationDocs).forEach(([key, filename]) => {
      allDocs.push({ label: DOC_LABELS[key] || key, filename });
    });
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col">

        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-800">{client.clientName}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{allDocs.length} document{allDocs.length !== 1 ? "s" : ""} uploaded</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition text-xl font-medium"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-3">
          {allDocs.length === 0 ? (
            <p className="text-slate-400 text-sm text-center py-6">No documents uploaded</p>
          ) : (
            allDocs.map((doc, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-3 bg-slate-50 border border-slate-100 rounded-lg px-4 py-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-lg">📄</span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-700 truncate">{doc.label}</p>
                    <p className="text-xs text-slate-400 truncate">{doc.filename}</p>
                  </div>
                </div>
                <a
                  href={`${UPLOADS_BASE_URL}/${doc.filename}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View
                </a>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

function ClientList() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // ADDED: state for selected client modal
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axiosInstance.get("/admin/all-clients");
      setClients(response.data);
    } catch (err) {
      setError("Failed to load clients");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredClients = clients.filter(
    (c) =>
      c.clientName?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase())
  );

  // ADDED: count documents per client
  const getDocCount = (client) => {
    let count = 0;
    if (client.document) count++;
    if (client.registrationDocs) count += Object.keys(client.registrationDocs).length;
    return count;
  };

  const statusColor = (status) => {
    switch (status) {
      case "active": return "bg-emerald-50 text-emerald-600";
      case "inactive": return "bg-slate-100 text-slate-500";
      case "pending": return "bg-amber-50 text-amber-600";
      default: return "bg-slate-100 text-slate-500";
    }
  };

  const priorityColor = (priority) => {
    switch (priority) {
      case "high": return "bg-red-50 text-red-600";
      case "medium": return "bg-amber-50 text-amber-600";
      case "low": return "bg-emerald-50 text-emerald-600";
      default: return "bg-slate-100 text-slate-500";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">

      {/* ADDED: Documents Modal */}
      {selectedClient && (
        <DocumentsModal
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
        />
      )}

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Client List</h1>
        <p className="text-slate-500 mt-1">All clients across the platform</p>
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
          placeholder="Search clients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-slate-200 bg-white p-2.5 pl-10 w-full rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition shadow-sm"
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
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Phone</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Priority</th>
                {/* ADDED: Documents column header */}
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Documents</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                [...Array(4)].map((_, i) => (
                  <tr key={i}>
                    {[...Array(7)].map((_, j) => (
                      <td key={j} className="px-5 py-4">
                        <div className="h-4 bg-slate-100 rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-slate-400">
                    No clients found
                  </td>
                </tr>
              ) : (
                filteredClients.map((client, index) => (
                  <tr key={client._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4 text-slate-400 text-sm">{index + 1}</td>
                    <td className="px-5 py-4 text-slate-800 font-medium">{client.clientName}</td>
                    <td className="px-5 py-4 text-slate-600">{client.email}</td>
                    <td className="px-5 py-4 text-slate-600">{client.phone || "—"}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusColor(client.status)}`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${priorityColor(client.priority)}`}>
                        {client.priority}
                      </span>
                    </td>
                    {/* ADDED: Documents column */}
                    <td className="px-5 py-4">
                      {getDocCount(client) > 0 ? (
                        <button
                          onClick={() => setSelectedClient(client)}
                          className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {getDocCount(client)} doc{getDocCount(client) !== 1 ? "s" : ""}
                        </button>
                      ) : (
                        <span className="text-slate-400 text-sm">—</span>
                      )}
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

export default ClientList;