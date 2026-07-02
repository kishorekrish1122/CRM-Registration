// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { getClientById } from "../../services/clientApi";

// function ClientDetails() {
// const { id } = useParams();
// const navigate = useNavigate();

// const [client, setClient] = useState(null);
// const [error, setError] = useState("");

// const apiUrl =
// import.meta.env.VITE_API_URL ||
// "http://localhost:5000";

// useEffect(() => {
// const fetchClient = async () => {
// try {
// const data = await getClientById(id);
// setClient(data);
// } catch (err) {
// setError("Failed to load client");
// }
// };

// ```
// fetchClient();
// ```

// }, [id]);

// if (error) {
// return ( <p className="p-5 text-red-500">
// {error} </p>
// );
// }

// if (!client) {
// return ( <p className="p-5">
// Loading... </p>
// );
// }

// return ( <div className="max-w-2xl mx-auto bg-white p-6 shadow rounded">

// ```
//   <div className="flex justify-between items-center mb-6">
//     <h1 className="text-2xl font-bold">
//       Client Details
//     </h1>

//     <div className="flex gap-2">
//       <button
//         onClick={() =>
//           navigate(
//             `/vendor/edit-client/${client._id}`
//           )
//         }
//         className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
//       >
//         Edit
//       </button>

//       <button
//         onClick={() =>
//           navigate("/vendor/clients")
//         }
//         className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//       >
//         Back
//       </button>
//     </div>
//   </div>

//   <div className="grid grid-cols-2 gap-4">

//     <div>
//       <p className="text-gray-500 text-sm">
//         Client Name
//       </p>
//       <p className="font-semibold">
//         {client.clientName}
//       </p>
//     </div>

//     <div>
//       <p className="text-gray-500 text-sm">
//         Email
//       </p>
//       <p className="font-semibold">
//         {client.email || "—"}
//       </p>
//     </div>

//     <div>
//       <p className="text-gray-500 text-sm">
//         Phone
//       </p>
//       <p className="font-semibold">
//         {client.phone || "—"}
//       </p>
//     </div>

//     <div>
//       <p className="text-gray-500 text-sm">
//         Status
//       </p>
//       <p className="font-semibold">
//         {client.status}
//       </p>
//     </div>

//     <div>
//       <p className="text-gray-500 text-sm">
//         Priority
//       </p>
//       <p className="font-semibold">
//         {client.priority}
//       </p>
//     </div>

//     <div>
//       <p className="text-gray-500 text-sm">
//         Created At
//       </p>
//       <p className="font-semibold">
//         {new Date(
//           client.createdAt
//         ).toLocaleDateString()}
//       </p>
//     </div>

//     <div className="col-span-2">
//       <p className="text-gray-500 text-sm">
//         Address
//       </p>
//       <p className="font-semibold">
//         {client.address || "—"}
//       </p>
//     </div>

//     <div className="col-span-2">
//       <p className="text-gray-500 text-sm">
//         Notes
//       </p>
//       <p className="font-semibold">
//         {client.notes || "—"}
//       </p>
//     </div>

//     <div className="col-span-2">
//       <p className="text-gray-500 text-sm mb-1">
//         Document
//       </p>

//       {client.document ? (
//         <a
//           href={`${apiUrl}/uploads/${client.document}`}
//           target="_blank"
//           rel="noreferrer"
//           className="text-blue-500 underline font-medium"
//         >
//           Download Document
//         </a>
//       ) : (
//         <p className="font-semibold text-gray-700">
//           No document uploaded
//         </p>
//       )}
//     </div>

//   </div>
// </div>


// );
// }

// export default ClientDetails;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getClientById } from "../../services/clientApi";

function ClientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [client, setClient] = useState(null);
  const [error, setError] = useState("");

  const apiUrl =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000";

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const data = await getClientById(id);
        setClient(data);
      } catch (err) {
        setError("Failed to load client");
      }
    };

    fetchClient();
  }, [id]);

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

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
          {error}
        </p>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <p className="text-slate-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white p-8 shadow-xl rounded-2xl border border-slate-100">

        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              Client Details
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Full profile information
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() =>
                navigate(
                  `/vendor/edit-client/${client._id}`
                )
              }
              className="inline-flex items-center gap-1.5 bg-amber-50 hover:bg-amber-500 text-amber-600 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.5-9.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 8.5-8.5z" />
              </svg>
              Edit
            </button>

            <button
              onClick={() =>
                navigate("/vendor/clients")
              }
              className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Back
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">

          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">
              Client Name
            </p>
            <p className="font-semibold text-slate-800">
              {client.clientName}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">
              Email
            </p>
            <p className="font-semibold text-slate-800">
              {client.email || "—"}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">
              Phone
            </p>
            <p className="font-semibold text-slate-800">
              {client.phone || "—"}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">
              Status
            </p>
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[client.status] || "bg-slate-100 text-slate-500"}`}>
              {client.status}
            </span>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">
              Priority
            </p>
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${priorityStyles[client.priority] || "bg-slate-100 text-slate-500"}`}>
              {client.priority}
            </span>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">
              Created At
            </p>
            <p className="font-semibold text-slate-800">
              {new Date(
                client.createdAt
              ).toLocaleDateString()}
            </p>
          </div>

          <div className="col-span-2">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">
              Address
            </p>
            <p className="font-semibold text-slate-800">
              {client.address || "—"}
            </p>
          </div>

          <div className="col-span-2">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">
              Notes
            </p>
            <p className="font-semibold text-slate-800">
              {client.notes || "—"}
            </p>
          </div>

          <div className="col-span-2 pt-2 border-t border-slate-100">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">
              Document
            </p>

            {client.document ? (
              <a
                href={`${apiUrl}/uploads/${client.document}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
                </svg>
                Download Document
              </a>
            ) : (
              <p className="font-semibold text-slate-400">
                No document uploaded
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default ClientDetails;