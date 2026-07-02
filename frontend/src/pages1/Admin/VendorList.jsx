// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   getVendors,
//   deleteVendor,
// } from "../../services/vendorApi";

// function VendorList() {
//   const navigate = useNavigate();

//   const [vendors, setVendors] = useState([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     fetchVendors();
//   }, []);

//   const fetchVendors = async () => {
//     try {
//       const data = await getVendors();
//       setVendors(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete Vendor?")) return;

//     try {
//       await deleteVendor(id);
//       fetchVendors();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const filteredVendors = vendors.filter(
//     (vendor) =>
//       vendor.name.toLowerCase().includes(search.toLowerCase()) ||
//       vendor.email.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="p-5">

//       <div className="flex justify-between mb-5">

//         <h1 className="text-3xl font-bold">
//           Vendor List
//         </h1>

//         <button
//           onClick={() => navigate("/admin/add-vendor")}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Add Vendor
//         </button>

//       </div>

//       <input
//         type="text"
//         placeholder="Search Vendor..."
//         className="border p-2 w-full mb-5"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       <table className="w-full border">

//         <thead className="bg-gray-200">

//           <tr>
//             <th className="border p-3">Name</th>
//             <th className="border p-3">Email</th>
//             <th className="border p-3">Role</th>
//             <th className="border p-3">Actions</th>
//           </tr>

//         </thead>

//         <tbody>

//           {filteredVendors.map((vendor) => (
//             <tr key={vendor._id}>

//               <td className="border p-3">
//                 {vendor.name}
//               </td>

//               <td className="border p-3">
//                 {vendor.email}
//               </td>

//               <td className="border p-3">
//                 {vendor.role}
//               </td>

//               <td className="border p-3">

//                 <button
//                   onClick={() => handleDelete(vendor._id)}
//                   className="bg-red-500 text-white px-4 py-1 rounded"
//                 >
//                   Delete
//                 </button>

//               </td>

//             </tr>
//           ))}

//         </tbody>

//       </table>

//     </div>
//   );
// }

// export default VendorList;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getVendors,
  deleteVendor,
} from "../../services/vendorApi";

function VendorList() {
  const navigate = useNavigate();

  const [vendors, setVendors] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const data = await getVendors();
      setVendors(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete Vendor?")) return;

    try {
      await deleteVendor(id);
      fetchVendors();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(search.toLowerCase()) ||
      vendor.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">

        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
            Vendor List
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {filteredVendors.length} vendor{filteredVendors.length !== 1 ? "s" : ""} found
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/add-vendor")}
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium px-4 py-2.5 rounded-lg shadow-sm transition"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Vendor
        </button>

      </div>

      <div className="relative mb-6">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search Vendor..."
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
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Name</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Email</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Role</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide text-right">Actions</th>
              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {filteredVendors.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center text-slate-400">
                    No vendors found
                  </td>
                </tr>
              ) : (
                filteredVendors.map((vendor) => (
                  <tr key={vendor._id} className="hover:bg-slate-50 transition-colors">

                    <td className="px-5 py-4 text-slate-800 font-medium">
                      {vendor.name}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {vendor.email}
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                        {vendor.role}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">

                      <button
                        onClick={() => handleDelete(vendor._id)}
                        className="bg-red-50 hover:bg-red-500 text-red-600 hover:text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                      >
                        Delete
                      </button>

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