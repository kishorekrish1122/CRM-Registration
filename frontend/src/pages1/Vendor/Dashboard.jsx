// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { getClients } from "../../services/clientApi";
// import {
//   Users, UserCheck, UserPlus, Plus, List, Search,
//   TrendingUp, Clock, CheckCircle, Trash2, Edit2, ChevronRight
// } from "lucide-react";
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
//   PieChart, Pie, Cell, Legend
// } from "recharts";

// function Dashboard() {
//   const navigate = useNavigate();
//   const [clients, setClients] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [searchFocused, setSearchFocused] = useState(false);

//   // Vendor info from localStorage
//   const vendorName = localStorage.getItem("name") || "Vendor";
//   const vendorEmail = localStorage.getItem("email") || "vendor@gmail.com";

//   const today = new Date().toLocaleDateString("en-IN", {
//     weekday: "long", day: "numeric", month: "long", year: "numeric",
//   });

//   const getGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return "Good morning";
//     if (hour < 17) return "Good afternoon";
//     return "Good evening";
//   };

//   useEffect(() => {
//     fetchClients();
//   }, []);

//   const fetchClients = async () => {
//     try {
//       const data = await getClients();
//       setClients(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Stats
//   const totalClients = clients.length;
//   const activeClients = clients.filter((c) => c.status === "Active").length;
//   const today_date = new Date().toDateString();
//   const newClientsToday = clients.filter(
//     (c) => new Date(c.createdAt).toDateString() === today_date
//   ).length;
//   const thisMonth = new Date().getMonth();
//   const thisYear = new Date().getFullYear();
//   const newClientsMonth = clients.filter((c) => {
//     const d = new Date(c.createdAt);
//     return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
//   }).length;

//   // Recent clients (latest 5)
//   const recentClients = [...clients]
//     .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//     .slice(0, 5);

//   // Recent activity (latest 8 with action label)
//   const recentActivity = [...clients]
//     .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
//     .slice(0, 8);

//   // Chart: clients added per month
//   const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
//   const barData = monthNames.map((month, i) => ({
//     month,
//     clients: clients.filter((c) => {
//       const d = new Date(c.createdAt);
//       return d.getMonth() === i && d.getFullYear() === thisYear;
//     }).length,
//   }));

//   // Pie chart
//   const inactiveClients = totalClients - activeClients;
//   const pieData = [
//     { name: "Active", value: activeClients },
//     { name: "Inactive", value: inactiveClients },
//   ];
//   const PIE_COLORS = ["#10b981", "#94a3b8"];

//   // Search
//   useEffect(() => {
//     if (!searchQuery.trim()) { setSearchResults([]); return; }
//     const q = searchQuery.toLowerCase();
//     setSearchResults(
//       clients.filter(
//         (c) =>
//           c.clientName?.toLowerCase().includes(q) ||
//           c.email?.toLowerCase().includes(q) ||
//           c.phone?.includes(q)
//       ).slice(0, 6)
//     );
//   }, [searchQuery, clients]);

//   const statusStyles = {
//     Active: "bg-emerald-100 text-emerald-700",
//     Inactive: "bg-slate-100 text-slate-500",
//     Lead: "bg-amber-100 text-amber-700",
//     Prospect: "bg-blue-100 text-blue-700",
//   };

//   const formatDate = (date) =>
//     date ? new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";

//   const stats = [
//     { label: "Total Clients", value: totalClients, icon: Users, color: "bg-violet-50 text-violet-600", border: "border-violet-200", empty: "No clients yet. Add your first client." },
//     { label: "Active Clients", value: activeClients, icon: UserCheck, color: "bg-emerald-50 text-emerald-600", border: "border-emerald-200", empty: "No active clients." },
//     { label: "New This Month", value: newClientsMonth, icon: UserPlus, color: "bg-blue-50 text-blue-600", border: "border-blue-200", empty: "No new clients this month." },
//   ];

//   return (
//     <div className="min-h-screen bg-slate-50 p-6 md:p-8 space-y-8">

//       {/* Header: Greeting + Vendor Info */}
//       <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <p className="text-sm text-slate-400 font-medium mb-1">{today}</p>
//           <h1 className="text-3xl font-bold text-slate-800">
//             {getGreeting()}, {vendorName} 👋
//           </h1>
//           <p className="text-slate-500 mt-1 text-sm">Here's what's happening with your clients today.</p>
//         </div>
//         <div className="bg-slate-50 rounded-xl p-4 text-sm space-y-1 min-w-[220px]">
//           <div className="flex justify-between">
//             <span className="text-slate-400">Name</span>
//             <span className="font-semibold text-slate-700">{vendorName}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-slate-400">Email</span>
//             <span className="font-semibold text-slate-700 truncate ml-2">{vendorEmail}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-slate-400">Role</span>
//             <span className="font-semibold text-slate-700 capitalize">Vendor</span>
//           </div>
//         </div>
//       </div>

//       {/* Stat Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
//         {stats.map(({ label, value, icon: Icon, color, border, empty }) => (
//           <div
//             key={label}
//             className={`bg-white rounded-2xl shadow-sm border ${border} p-6 flex items-start gap-4`}
//           >
//             <div className={`p-3 rounded-xl ${color}`}>
//               <Icon className="w-6 h-6" />
//             </div>
//             <div className="flex-1">
//               <p className="text-sm text-slate-500 font-medium">{label}</p>
//               {loading ? (
//                 <p className="text-3xl font-bold text-slate-800 mt-1">—</p>
//               ) : value === 0 ? (
//                 <>
//                   <p className="text-3xl font-bold text-slate-800 mt-1">0</p>
//                   <p className="text-xs text-slate-400 mt-1">{empty}</p>
//                 </>
//               ) : (
//                 <p className="text-3xl font-bold text-slate-800 mt-1">{value}</p>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Quick Actions */}
//       <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
//         <h2 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h2>
//         <div className="flex flex-wrap gap-3">
//           <Link
//             to="/vendor/add-client"
//             className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition"
//           >
//             <Plus className="w-4 h-4" /> Add Client
//           </Link>
//           <Link
//             to="/vendor/clients"
//             className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-semibold transition"
//           >
//             <List className="w-4 h-4" /> View Clients
//           </Link>
//           <Link
//             to="/vendor/search"
//             className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-semibold transition"
//           >
//             <Search className="w-4 h-4" /> Search Client
//           </Link>
//         </div>
//       </div>

//       {/* Search Bar */}
//       <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
//         <h2 className="text-lg font-bold text-slate-800 mb-4">Search Client</h2>
//         <div className="relative max-w-lg">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//           <input
//             type="text"
//             placeholder="Search by name, email, or phone..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             onFocus={() => setSearchFocused(true)}
//             onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
//             className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
//           />
//           {searchFocused && searchResults.length > 0 && (
//             <div className="absolute z-20 top-12 left-0 w-full bg-white border border-slate-100 rounded-xl shadow-xl overflow-hidden">
//               {searchResults.map((c) => (
//                 <button
//                   key={c._id}
//                   onClick={() => navigate(`/vendor/clients/${c._id}`)}
//                   className="w-full text-left px-4 py-3 hover:bg-slate-50 flex items-center justify-between border-b last:border-0 border-slate-50"
//                 >
//                   <div>
//                     <p className="text-sm font-semibold text-slate-800">{c.clientName}</p>
//                     <p className="text-xs text-slate-400">{c.email || c.phone || "—"}</p>
//                   </div>
//                   <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyles[c.status] || "bg-slate-100 text-slate-500"}`}>
//                     {c.status || "—"}
//                   </span>
//                 </button>
//               ))}
//             </div>
//           )}
//           {searchFocused && searchQuery && searchResults.length === 0 && (
//             <div className="absolute z-20 top-12 left-0 w-full bg-white border border-slate-100 rounded-xl shadow-xl p-4 text-sm text-slate-400 text-center">
//               No clients found for "{searchQuery}"
//             </div>
//           )}
//         </div>
//         <p className="text-xs text-slate-400 mt-2">Search by: Client Name · Email · Phone</p>
//       </div>

//       {/* Recent Clients Table */}
//       <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
//         <div className="flex items-center justify-between mb-5">
//           <h2 className="text-lg font-bold text-slate-800">Recent Clients</h2>
//           <Link to="/vendor/clients" className="text-sm text-violet-600 hover:text-violet-800 font-medium flex items-center gap-1">
//             View all <ChevronRight className="w-4 h-4" />
//           </Link>
//         </div>

//         {loading ? (
//           <p className="text-slate-400 text-sm">Loading...</p>
//         ) : recentClients.length === 0 ? (
//           <div className="text-center py-12">
//             <Users className="w-10 h-10 text-slate-300 mx-auto mb-3" />
//             <p className="text-slate-500 font-medium">No clients found.</p>
//             <p className="text-slate-400 text-sm mt-1">Click "Add Client" to create your first client.</p>
//             <Link
//               to="/vendor/add-client"
//               className="inline-flex items-center gap-2 mt-4 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
//             >
//               <Plus className="w-4 h-4" /> Add Client
//             </Link>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="border-b border-slate-100">
//                   <th className="text-left py-3 px-2 text-xs text-slate-400 font-semibold uppercase tracking-wide">Client</th>
//                   <th className="text-left py-3 px-2 text-xs text-slate-400 font-semibold uppercase tracking-wide">Email</th>
//                   <th className="text-left py-3 px-2 text-xs text-slate-400 font-semibold uppercase tracking-wide">Phone</th>
//                   <th className="text-left py-3 px-2 text-xs text-slate-400 font-semibold uppercase tracking-wide">Status</th>
//                   <th className="text-left py-3 px-2 text-xs text-slate-400 font-semibold uppercase tracking-wide">Added</th>
//                   <th className="py-3 px-2"></th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-50">
//                 {recentClients.map((c) => (
//                   <tr key={c._id} className="hover:bg-slate-50 transition-colors">
//                     <td className="py-3 px-2 font-semibold text-slate-800">{c.clientName}</td>
//                     <td className="py-3 px-2 text-slate-500">{c.email || "—"}</td>
//                     <td className="py-3 px-2 text-slate-500">{c.phone || "—"}</td>
//                     <td className="py-3 px-2">
//                       <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusStyles[c.status] || "bg-slate-100 text-slate-500"}`}>
//                         {c.status || "—"}
//                       </span>
//                     </td>
//                     <td className="py-3 px-2 text-slate-400 text-xs">{formatDate(c.createdAt)}</td>
//                     <td className="py-3 px-2">
//                       <div className="flex items-center gap-2">
//                         <Link to={`/vendor/edit-client/${c._id}`} className="text-slate-400 hover:text-violet-600 transition">
//                           <Edit2 className="w-4 h-4" />
//                         </Link>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Recent Activity + Stats Row */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//         {/* Recent Activity */}
//         <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
//           <h2 className="text-lg font-bold text-slate-800 mb-4">Recent Activity</h2>
//           {recentActivity.length === 0 ? (
//             <p className="text-slate-400 text-sm">No activity yet.</p>
//           ) : (
//             <div className="space-y-3">
//               {recentActivity.map((c, i) => (
//                 <div key={c._id} className="flex items-start gap-3">
//                   <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
//                     <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
//                   </div>
//                   <div>
//                     <p className="text-sm text-slate-700 font-medium">{c.clientName} added</p>
//                     <p className="text-xs text-slate-400">{formatDate(c.createdAt)}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Statistics summary */}
//         <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
//           <h2 className="text-lg font-bold text-slate-800 mb-4">Statistics</h2>
//           <div className="space-y-3">
//             {[
//               { label: "Total Clients", value: totalClients },
//               { label: "Active Clients", value: activeClients },
//               { label: "Added Today", value: newClientsToday },
//               { label: "Added This Month", value: newClientsMonth },
//             ].map(({ label, value }) => (
//               <div key={label} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
//                 <span className="text-sm text-slate-500">{label}</span>
//                 <span className="text-sm font-bold text-slate-800">{loading ? "—" : value}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//         {/* Bar Chart */}
//         <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
//           <h2 className="text-lg font-bold text-slate-800 mb-6">Clients Added Per Month</h2>
//           <ResponsiveContainer width="100%" height={220}>
//             <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
//               <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} />
//               <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} allowDecimals={false} />
//               <Tooltip
//                 contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: 12 }}
//                 cursor={{ fill: "#f1f5f9" }}
//               />
//               <Bar dataKey="clients" fill="#7c3aed" radius={[6, 6, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Pie Chart */}
//         <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
//           <h2 className="text-lg font-bold text-slate-800 mb-6">Active vs Inactive Clients</h2>
//           {totalClients === 0 ? (
//             <div className="flex items-center justify-center h-[220px] text-slate-400 text-sm">
//               No data yet
//             </div>
//           ) : (
//             <ResponsiveContainer width="100%" height={220}>
//               <PieChart>
//                 <Pie
//                   data={pieData}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={60}
//                   outerRadius={90}
//                   paddingAngle={4}
//                   dataKey="value"
//                 >
//                   {pieData.map((_, index) => (
//                     <Cell key={index} fill={PIE_COLORS[index]} />
//                   ))}
//                 </Pie>
//                 <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: 12 }} />
//                 <Legend
//                   iconType="circle"
//                   iconSize={10}
//                   formatter={(value) => <span style={{ fontSize: 12, color: "#64748b" }}>{value}</span>}
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//           )}
//         </div>
//       </div>

//     </div>
//   );
// }

// export default Dashboard;
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getClients } from "../../services/clientApi";
import {
  Users, UserCheck, UserPlus, Plus, List, Search,
  TrendingUp, Clock, CheckCircle, Trash2, Edit2, ChevronRight
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

function Dashboard() {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchFocused, setSearchFocused] = useState(false);

  // Vendor info from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const vendorName = user.name || localStorage.getItem("name") || "Vendor";
  const vendorEmail = user.email || localStorage.getItem("email") || "vendor@gmail.com";

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const data = await getClients();
      setClients(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Stats
  const totalClients = clients.length;
  const activeClients = clients.filter((c) => c.status === "Active").length;
  const today_date = new Date().toDateString();
  const newClientsToday = clients.filter(
    (c) => new Date(c.createdAt).toDateString() === today_date
  ).length;
  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();
  const newClientsMonth = clients.filter((c) => {
    const d = new Date(c.createdAt);
    return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
  }).length;

  // Recent clients (latest 5)
  const recentClients = [...clients]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  // Recent activity (latest 8 with action label)
  const recentActivity = [...clients]
    .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
    .slice(0, 8);

  // Chart: clients added per month
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const barData = monthNames.map((month, i) => ({
    month,
    clients: clients.filter((c) => {
      const d = new Date(c.createdAt);
      return d.getMonth() === i && d.getFullYear() === thisYear;
    }).length,
  }));

  // Pie chart
  const inactiveClients = totalClients - activeClients;
  const pieData = [
    { name: "Active", value: activeClients },
    { name: "Inactive", value: inactiveClients },
  ];
  const PIE_COLORS = ["#10b981", "#94a3b8"];

  // Search
  useEffect(() => {
    if (!searchQuery.trim()) { setSearchResults([]); return; }
    const q = searchQuery.toLowerCase();
    setSearchResults(
      clients.filter(
        (c) =>
          c.clientName?.toLowerCase().includes(q) ||
          c.email?.toLowerCase().includes(q) ||
          c.phone?.includes(q)
      ).slice(0, 6)
    );
  }, [searchQuery, clients]);

  const statusStyles = {
    Active: "bg-emerald-100 text-emerald-700",
    Inactive: "bg-slate-100 text-slate-500",
    Lead: "bg-amber-100 text-amber-700",
    Prospect: "bg-blue-100 text-blue-700",
  };

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";

  const stats = [
    { label: "Total Clients", value: totalClients, icon: Users, color: "bg-violet-50 text-violet-600", border: "border-violet-200", empty: "No clients yet. Add your first client." },
    { label: "Active Clients", value: activeClients, icon: UserCheck, color: "bg-emerald-50 text-emerald-600", border: "border-emerald-200", empty: "No active clients." },
    { label: "New This Month", value: newClientsMonth, icon: UserPlus, color: "bg-blue-50 text-blue-600", border: "border-blue-200", empty: "No new clients this month." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 space-y-8">

      {/* Header: Greeting + Vendor Info */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400 font-medium mb-1">{today}</p>
          <h1 className="text-3xl font-bold text-slate-800">
            {getGreeting()}, {vendorName} 👋
          </h1>
          <p className="text-slate-500 mt-1 text-sm">Here's what's happening with your clients today.</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 text-sm space-y-1 min-w-[220px]">
          <div className="flex justify-between">
            <span className="text-slate-400">Name</span>
            <span className="font-semibold text-slate-700">{vendorName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Email</span>
            <span className="font-semibold text-slate-700 truncate ml-2">{vendorEmail}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Role</span>
            <span className="font-semibold text-slate-700 capitalize">Vendor</span>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {stats.map(({ label, value, icon: Icon, color, border, empty }) => (
          <div
            key={label}
            className={`bg-white rounded-2xl shadow-sm border ${border} p-6 flex items-start gap-4`}
          >
            <div className={`p-3 rounded-xl ${color}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-500 font-medium">{label}</p>
              {loading ? (
                <p className="text-3xl font-bold text-slate-800 mt-1">—</p>
              ) : value === 0 ? (
                <>
                  <p className="text-3xl font-bold text-slate-800 mt-1">0</p>
                  <p className="text-xs text-slate-400 mt-1">{empty}</p>
                </>
              ) : (
                <p className="text-3xl font-bold text-slate-800 mt-1">{value}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/vendor/add-client"
            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition"
          >
            <Plus className="w-4 h-4" /> Add Client
          </Link>
          <Link
            to="/vendor/clients"
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-semibold transition"
          >
            <List className="w-4 h-4" /> View Clients
          </Link>
          <Link
            to="/vendor/search"
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-semibold transition"
          >
            <Search className="w-4 h-4" /> Search Client
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Search Client</h2>
        <div className="relative max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
          />
          {searchFocused && searchResults.length > 0 && (
            <div className="absolute z-20 top-12 left-0 w-full bg-white border border-slate-100 rounded-xl shadow-xl overflow-hidden">
              {searchResults.map((c) => (
                <button
                  key={c._id}
                  onClick={() => navigate(`/vendor/clients/${c._id}`)}
                  className="w-full text-left px-4 py-3 hover:bg-slate-50 flex items-center justify-between border-b last:border-0 border-slate-50"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{c.clientName}</p>
                    <p className="text-xs text-slate-400">{c.email || c.phone || "—"}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyles[c.status] || "bg-slate-100 text-slate-500"}`}>
                    {c.status || "—"}
                  </span>
                </button>
              ))}
            </div>
          )}
          {searchFocused && searchQuery && searchResults.length === 0 && (
            <div className="absolute z-20 top-12 left-0 w-full bg-white border border-slate-100 rounded-xl shadow-xl p-4 text-sm text-slate-400 text-center">
              No clients found for "{searchQuery}"
            </div>
          )}
        </div>
        <p className="text-xs text-slate-400 mt-2">Search by: Client Name · Email · Phone</p>
      </div>

      {/* Recent Clients Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-800">Recent Clients</h2>
          <Link to="/vendor/clients" className="text-sm text-violet-600 hover:text-violet-800 font-medium flex items-center gap-1">
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <p className="text-slate-400 text-sm">Loading...</p>
        ) : recentClients.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No clients found.</p>
            <p className="text-slate-400 text-sm mt-1">Click "Add Client" to create your first client.</p>
            <Link
              to="/vendor/add-client"
              className="inline-flex items-center gap-2 mt-4 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
            >
              <Plus className="w-4 h-4" /> Add Client
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left py-3 px-2 text-xs text-slate-400 font-semibold uppercase tracking-wide">Client</th>
                  <th className="text-left py-3 px-2 text-xs text-slate-400 font-semibold uppercase tracking-wide">Email</th>
                  <th className="text-left py-3 px-2 text-xs text-slate-400 font-semibold uppercase tracking-wide">Phone</th>
                  <th className="text-left py-3 px-2 text-xs text-slate-400 font-semibold uppercase tracking-wide">Status</th>
                  <th className="text-left py-3 px-2 text-xs text-slate-400 font-semibold uppercase tracking-wide">Added</th>
                  <th className="py-3 px-2"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentClients.map((c) => (
                  <tr key={c._id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-2 font-semibold text-slate-800">{c.clientName}</td>
                    <td className="py-3 px-2 text-slate-500">{c.email || "—"}</td>
                    <td className="py-3 px-2 text-slate-500">{c.phone || "—"}</td>
                    <td className="py-3 px-2">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusStyles[c.status] || "bg-slate-100 text-slate-500"}`}>
                        {c.status || "—"}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-slate-400 text-xs">{formatDate(c.createdAt)}</td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <Link to={`/vendor/edit-client/${c._id}`} className="text-slate-400 hover:text-violet-600 transition">
                          <Edit2 className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recent Activity + Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Recent Activity</h2>
          {recentActivity.length === 0 ? (
            <p className="text-slate-400 text-sm">No activity yet.</p>
          ) : (
            <div className="space-y-3">
              {recentActivity.map((c, i) => (
                <div key={c._id} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-700 font-medium">{c.clientName} added</p>
                    <p className="text-xs text-slate-400">{formatDate(c.createdAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Statistics summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Statistics</h2>
          <div className="space-y-3">
            {[
              { label: "Total Clients", value: totalClients },
              { label: "Active Clients", value: activeClients },
              { label: "Added Today", value: newClientsToday },
              { label: "Added This Month", value: newClientsMonth },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <span className="text-sm text-slate-500">{label}</span>
                <span className="text-sm font-bold text-slate-800">{loading ? "—" : value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Bar Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Clients Added Per Month</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} allowDecimals={false} />
              <Tooltip
                contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: 12 }}
                cursor={{ fill: "#f1f5f9" }}
              />
              <Bar dataKey="clients" fill="#7c3aed" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Active vs Inactive Clients</h2>
          {totalClients === 0 ? (
            <div className="flex items-center justify-center h-[220px] text-slate-400 text-sm">
              No data yet
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={PIE_COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: 12 }} />
                <Legend
                  iconType="circle"
                  iconSize={10}
                  formatter={(value) => <span style={{ fontSize: 12, color: "#64748b" }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

    </div>
  );
}

export default Dashboard;