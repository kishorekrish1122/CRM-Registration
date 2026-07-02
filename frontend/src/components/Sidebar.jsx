// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   LayoutDashboard, Users, UserPlus, Search,
//   UserCircle, LogOut, ShieldCheck, ListOrdered, PlusCircle
// } from "lucide-react";

// function Sidebar() {
//   const role = localStorage.getItem("role");
//   const location = useLocation();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   const isActive = (path) => location.pathname === path;

//   const linkClass = (path) =>
//     `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
//       isActive(path)
//         ? "bg-yellow-400 text-slate-900"
//         : "text-slate-300 hover:bg-slate-800 hover:text-white"
//     }`;

//   return (
//     <div className="w-64 min-h-screen bg-slate-900 text-white flex flex-col p-5">

//       <h1 className="text-2xl font-bold mb-8 text-white">CRM System</h1>

//       <nav className="flex-1 space-y-1">

//         {/* SUPER ADMIN */}
//         {role === "superadmin" && (
//           <>
//             <Link to="/superadmin/dashboard" className={linkClass("/superadmin/dashboard")}>
//               <LayoutDashboard className="w-4 h-4" /> Dashboard
//             </Link>
//             <Link to="/superadmin/admins" className={linkClass("/superadmin/admins")}>
//               <ListOrdered className="w-4 h-4" /> Admin List
//             </Link>
//             <Link to="/superadmin/add-admin" className={linkClass("/superadmin/add-admin")}>
//               <PlusCircle className="w-4 h-4" /> Add Admin
//             </Link>
//           </>
//         )}

//         {/* ADMIN */}
//         {role === "admin" && (
//           <>
//             <Link to="/admin/dashboard" className={linkClass("/admin/dashboard")}>
//               <LayoutDashboard className="w-4 h-4" /> Dashboard
//             </Link>
//             <Link to="/admin/vendors" className={linkClass("/admin/vendors")}>
//               <ListOrdered className="w-4 h-4" /> Vendor List
//             </Link>
//             <Link to="/admin/add-vendor" className={linkClass("/admin/add-vendor")}>
//               <PlusCircle className="w-4 h-4" /> Add Vendor
//             </Link>
//           </>
//         )}

//         {/* VENDOR */}
//         {role === "vendor" && (
//           <>
//             <Link to="/vendor/dashboard" className={linkClass("/vendor/dashboard")}>
//               <LayoutDashboard className="w-4 h-4" /> Dashboard
//             </Link>
//             <Link to="/vendor/clients" className={linkClass("/vendor/clients")}>
//               <Users className="w-4 h-4" /> Client List
//             </Link>
//             <Link to="/vendor/add-client" className={linkClass("/vendor/add-client")}>
//               <UserPlus className="w-4 h-4" /> Add Client
//             </Link>
//             <Link to="/vendor/search" className={linkClass("/vendor/search")}>
//               <Search className="w-4 h-4" /> Search Client
//             </Link>
//             <Link to="/vendor/profile" className={linkClass("/vendor/profile")}>
//               <UserCircle className="w-4 h-4" /> Profile
//             </Link>
//           </>
//         )}
//       </nav>

//       {/* Logout at bottom */}
//       <div className="pt-4 border-t border-slate-800 mt-4">
//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all w-full"
//         >
//           <LogOut className="w-4 h-4" /> Logout
//         </button>
//       </div>

//     </div>
//   );
// }

// export default Sidebar;
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Search,
  UserCircle,
  LogOut,
  ShieldCheck,
  ListOrdered,
  PlusCircle,
  Settings,
  FileText,
} from "lucide-react";

function Sidebar() {
  const role = localStorage.getItem("role");
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
      isActive(path)
        ? "bg-yellow-400 text-slate-900"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white flex flex-col p-5">

      {/* Logo */}
      <h1 className="text-2xl font-bold mb-8 text-white">
        CRM System
      </h1>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">

        {/* ================= SUPER ADMIN ================= */}
        {role === "superadmin" && (
          <>
            <Link
              to="/superadmin/dashboard"
              className={linkClass("/superadmin/dashboard")}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>

            <Link
              to="/superadmin/admins"
              className={linkClass("/superadmin/admins")}
            >
              <ListOrdered className="w-4 h-4" />
              Admin List
            </Link>

            <Link
              to="/superadmin/add-admin"
              className={linkClass("/superadmin/add-admin")}
            >
              <PlusCircle className="w-4 h-4" />
              Add Admin
            </Link>

            <Link
              to="/superadmin/vendors"
              className={linkClass("/superadmin/vendors")}
            >
              <Users className="w-4 h-4" />
              Vendor List
            </Link>

            <Link
              to="/superadmin/clients"
              className={linkClass("/superadmin/clients")}
            >
              <UserCircle className="w-4 h-4" />
              Client List
            </Link>

            <Link
              to="/superadmin/reports"
              className={linkClass("/superadmin/reports")}
            >
              <FileText className="w-4 h-4" />
              Reports
            </Link>

            <Link
              to="/superadmin/settings"
              className={linkClass("/superadmin/settings")}
            >
              <Settings className="w-4 h-4" />
              Settings
            </Link>
          </>
        )}

        {/* ================= ADMIN ================= */}
        {role === "admin" && (
          <>
            <Link
              to="/admin/dashboard"
              className={linkClass("/admin/dashboard")}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>

            <Link
              to="/admin/vendors"
              className={linkClass("/admin/vendors")}
            >
              <ListOrdered className="w-4 h-4" />
              Vendor List
            </Link>

            <Link
              to="/admin/add-vendor"
              className={linkClass("/admin/add-vendor")}
            >
              <PlusCircle className="w-4 h-4" />
              Add Vendor
            </Link>
          </>
        )}

        {/* ================= VENDOR ================= */}
        {role === "vendor" && (
          <>
            <Link
              to="/vendor/dashboard"
              className={linkClass("/vendor/dashboard")}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>

            <Link
              to="/vendor/clients"
              className={linkClass("/vendor/clients")}
            >
              <Users className="w-4 h-4" />
              Client List
            </Link>

            <Link
              to="/vendor/add-client"
              className={linkClass("/vendor/add-client")}
            >
              <UserPlus className="w-4 h-4" />
              Add Client
            </Link>

            <Link
              to="/vendor/search"
              className={linkClass("/vendor/search")}
            >
              <Search className="w-4 h-4" />
              Search Client
            </Link>

            <Link
              to="/vendor/profile"
              className={linkClass("/vendor/profile")}
            >
              <UserCircle className="w-4 h-4" />
              Profile
            </Link>
          </>
        )}
      </nav>

      {/* Logout */}
      <div className="pt-4 mt-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

    </div>
  );
}

export default Sidebar;