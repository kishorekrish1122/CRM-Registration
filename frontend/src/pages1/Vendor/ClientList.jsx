
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   getClients,
//   deleteClient,
// } from "../../services/clientApi";

// function ClientList() {
//   const navigate = useNavigate();

//   const [clients, setClients] = useState([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     fetchClients();
//   }, []);

//   const fetchClients = async () => {
//     try {
//       const data = await getClients();
//       setClients(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete Client?")) return;

//     try {
//       await deleteClient(id);
//       fetchClients();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const filteredClients = clients.filter((client) =>
//     client.clientName
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   );

//   const statusStyles = {
//     Lead: "bg-amber-50 text-amber-600",
//     Prospect: "bg-blue-50 text-blue-600",
//     Active: "bg-emerald-50 text-emerald-600",
//     Inactive: "bg-slate-100 text-slate-500",
//   };

//   const priorityStyles = {
//     High: "bg-red-50 text-red-600",
//     Medium: "bg-amber-50 text-amber-600",
//     Low: "bg-slate-100 text-slate-500",
//   };

//   // Base URL where uploads are served from the backend
//   const UPLOADS_BASE_URL = "http://localhost:5000/uploads";

//   return (
//     <div className="min-h-screen bg-slate-50 p-6 md:p-8">

//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">

//         <div>
//           <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
//             Client List
//           </h1>
//           <p className="text-sm text-slate-500 mt-1">
//             {filteredClients.length} client{filteredClients.length !== 1 ? "s" : ""} found
//           </p>
//         </div>

//         <button
//           onClick={() => navigate("/vendor/add-client")}
//           className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium px-4 py-2.5 rounded-lg shadow-sm transition"
//         >
//           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//           </svg>
//           Add Client
//         </button>

//       </div>

//       <div className="relative mb-6">
//         <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//           <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
//         </svg>
//         <input
//           type="text"
//           placeholder="Search Client"
//           className="border border-slate-200 bg-white p-2.5 pl-10 w-full rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition shadow-sm"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">

//         <div className="overflow-x-auto">
//           <table className="w-full text-left">

//             <thead className="bg-slate-50 border-b border-slate-100">
//               <tr>
//                 <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Client Name</th>
//                 <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Email</th>
//                 <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Phone</th>
//                 <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Address</th>
//                 <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
//                 <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Priority</th>
//                 <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Document</th>
//                 <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide text-right">Actions</th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-slate-100">

//               {filteredClients.length > 0 ? (
//                 filteredClients.map((client) => (
//                   <tr key={client._id} className="hover:bg-slate-50 transition-colors">

//                     <td className="px-5 py-4 text-slate-800 font-medium">
//                       {client.clientName}
//                     </td>

//                     <td className="px-5 py-4 text-slate-600">
//                       {client.email || "—"}
//                     </td>

//                     <td className="px-5 py-4 text-slate-600">
//                       {client.phone || "—"}
//                     </td>

//                     <td className="px-5 py-4 text-slate-600 max-w-[180px] truncate">
//                       {client.address || "—"}
//                     </td>

//                     <td className="px-5 py-4">
//                       <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[client.status] || "bg-slate-100 text-slate-500"}`}>
//                         {client.status}
//                       </span>
//                     </td>

//                     <td className="px-5 py-4">
//                       <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${priorityStyles[client.priority] || "bg-slate-100 text-slate-500"}`}>
//                         {client.priority}
//                       </span>
//                     </td>

//                     {/* Document Column */}
//                     <td className="px-5 py-4">
//                       {client.document ? (
//                         <a
//                           href={`${UPLOADS_BASE_URL}/${client.document}`}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
//                         >
//                           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
//                           </svg>
//                           View
//                         </a>
//                       ) : (
//                         <span className="text-slate-400 text-sm">—</span>
//                       )}
//                     </td>

//                     <td className="px-5 py-4 text-right">
//                       <div className="inline-flex items-center gap-2">

//                         {/* Edit Button */}
//                         <button
//                           onClick={() => navigate(`/vendor/edit-client/${client._id}`)}
//                           className="bg-blue-50 hover:bg-blue-500 text-blue-600 hover:text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
//                         >
//                           Edit
//                         </button>

//                         {/* Delete Button */}
//                         <button
//                           onClick={() => handleDelete(client._id)}
//                           className="bg-red-50 hover:bg-red-500 text-red-600 hover:text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
//                         >
//                           Delete
//                         </button>

//                       </div>
//                     </td>

//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="8"
//                     className="px-5 py-10 text-center text-slate-400"
//                   >
//                     No Clients Found
//                   </td>
//                 </tr>
//               )}

//             </tbody>

//           </table>
//         </div>

//       </div>

//     </div>
//   );
// }

// export default ClientList;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getClients,
  deleteClient,
} from "../../services/clientApi";

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
  const navigate = useNavigate();

  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const data = await getClients();
      setClients(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete Client?")) return;
    try {
      await deleteClient(id);
      fetchClients();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredClients = clients.filter((client) =>
    client.clientName.toLowerCase().includes(search.toLowerCase())
  );

  const getDocCount = (client) => {
    let count = 0;
    if (client.document) count++;
    if (client.registrationDocs) count += Object.keys(client.registrationDocs).length;
    return count;
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

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">

      {/* Documents Modal */}
      {selectedClient && (
        <DocumentsModal
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
        />
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Client List</h1>
          <p className="text-sm text-slate-500 mt-1">
            {filteredClients.length} client{filteredClients.length !== 1 ? "s" : ""} found
          </p>
        </div>
        <button
          onClick={() => navigate("/vendor/add-client")}
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium px-4 py-2.5 rounded-lg shadow-sm transition"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Client
        </button>
      </div>

      <div className="relative mb-6">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search Client"
          className="border border-slate-200 bg-white p-2.5 pl-10 w-full rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Client Name</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Email</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Phone</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Address</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Priority</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Documents</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <tr key={client._id} className="hover:bg-slate-50 transition-colors">

                    <td className="px-5 py-4 text-slate-800 font-medium">{client.clientName}</td>
                    <td className="px-5 py-4 text-slate-600">{client.email || "—"}</td>
                    <td className="px-5 py-4 text-slate-600">{client.phone || "—"}</td>
                    <td className="px-5 py-4 text-slate-600 max-w-[180px] truncate">{client.address || "—"}</td>

                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[client.status] || "bg-slate-100 text-slate-500"}`}>
                        {client.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${priorityStyles[client.priority] || "bg-slate-100 text-slate-500"}`}>
                        {client.priority}
                      </span>
                    </td>

                    {/* Documents Column */}
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

                    <td className="px-5 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/vendor/edit-client/${client._id}`)}
                          className="bg-blue-50 hover:bg-blue-500 text-blue-600 hover:text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(client._id)}
                          className="bg-red-50 hover:bg-red-500 text-red-600 hover:text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-5 py-10 text-center text-slate-400">
                    No Clients Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default ClientList;