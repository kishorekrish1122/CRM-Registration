import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages1/Auth/Login";
import Register from "../pages1/Auth/Register";
import ForgotPassword from "../pages1/Auth/ForgotPassword";
import ResetPassword from "../pages1/Auth/ResetPassword";

import ProtectedRoute from "../components/ProtectedRoute";
import RoleBasedRoute from "../components/RoleBasedRoute";

import SuperAdminLayout from "../layouts/SuperAdminLayout";
import AdminLayout from "../layouts/AdminLayout";
import VendorLayout from "../layouts/VendorLayout";

import SuperAdminDashboard from "../pages1/SuperAdmin/Dashboard";
import AdminList from "../pages1/SuperAdmin/AdminList";        // ✅ fixed alias
import AddAdmin from "../pages1/SuperAdmin/AddAdmin";          // ✅ fixed alias
import SuperClientList from "../pages1/SuperAdmin/ClientList"; // ✅ fixed alias
import EditAdmin from "../pages1/SuperAdmin/EditAdmin";        // ✅ fixed alias
import Reports from "../pages1/SuperAdmin/Reports";            // ✅ fixed alias
import Settings from "../pages1/SuperAdmin/Settings";          // ✅ fixed alias
import SuperVendorList from "../pages1/SuperAdmin/VendorList";

import AdminDashboard from "../pages1/Admin/Dashboard";        // ✅ fixed path
import VendorList from "../pages1/Admin/VendorList";           // ✅ fixed path
import AddVendor from "../pages1/Admin/AddVendor";

import VendorDashboard from "../pages1/Vendor/Dashboard";
import ClientList from "../pages1/Vendor/ClientList";
import AddClient from "../pages1/Vendor/AddClient";
import EditClient from "../pages1/Vendor/EditClient";
import ClientDetails from "../pages1/Vendor/ClientDetails";
import Profile from "../pages1/Vendor/Profile";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* ================= SUPER ADMIN ================= */}
      <Route path="/superadmin/dashboard" element={<ProtectedRoute><RoleBasedRoute allowedRoles={["superadmin"]}><SuperAdminLayout><SuperAdminDashboard /></SuperAdminLayout></RoleBasedRoute></ProtectedRoute>} />
      <Route path="/superadmin/admins" element={<ProtectedRoute><RoleBasedRoute allowedRoles={["superadmin"]}><SuperAdminLayout><AdminList /></SuperAdminLayout></RoleBasedRoute></ProtectedRoute>} />
      <Route path="/superadmin/add-admin" element={<ProtectedRoute><RoleBasedRoute allowedRoles={["superadmin"]}><SuperAdminLayout><AddAdmin /></SuperAdminLayout></RoleBasedRoute></ProtectedRoute>} />
      <Route path="/superadmin/edit-admin/:id" element={<ProtectedRoute><RoleBasedRoute allowedRoles={["superadmin"]}><SuperAdminLayout><EditAdmin /></SuperAdminLayout></RoleBasedRoute></ProtectedRoute>} />
      <Route path="/superadmin/vendors" element={<ProtectedRoute><RoleBasedRoute allowedRoles={["superadmin"]}><SuperAdminLayout><SuperVendorList /></SuperAdminLayout></RoleBasedRoute></ProtectedRoute>} />
      <Route path="/superadmin/clients" element={<ProtectedRoute><RoleBasedRoute allowedRoles={["superadmin"]}><SuperAdminLayout><SuperClientList /></SuperAdminLayout></RoleBasedRoute></ProtectedRoute>} />
      <Route path="/superadmin/reports" element={<ProtectedRoute><RoleBasedRoute allowedRoles={["superadmin"]}><SuperAdminLayout><Reports /></SuperAdminLayout></RoleBasedRoute></ProtectedRoute>} />
      <Route path="/superadmin/settings" element={<ProtectedRoute><RoleBasedRoute allowedRoles={["superadmin"]}><SuperAdminLayout><Settings /></SuperAdminLayout></RoleBasedRoute></ProtectedRoute>} />

      {/* ================= ADMIN ================= */}
      <Route path="/admin/dashboard" element={<ProtectedRoute><RoleBasedRoute allowedRoles={["admin"]}><AdminLayout><AdminDashboard /></AdminLayout></RoleBasedRoute></ProtectedRoute>} />
      <Route path="/admin/vendors" element={<ProtectedRoute><RoleBasedRoute allowedRoles={["admin"]}><AdminLayout><VendorList /></AdminLayout></RoleBasedRoute></ProtectedRoute>} />
      <Route path="/admin/add-vendor" element={<ProtectedRoute><RoleBasedRoute allowedRoles={["admin"]}><AdminLayout><AddVendor /></AdminLayout></RoleBasedRoute></ProtectedRoute>} />

      {/* ================= VENDOR ================= */}
      <Route path="/vendor/dashboard" element={<ProtectedRoute><RoleBasedRoute allowedRoles={["vendor"]}><VendorLayout><VendorDashboard /></VendorLayout></RoleBasedRoute></ProtectedRoute>} />
      <Route path="/vendor/clients" element={<ProtectedRoute><RoleBasedRoute allowedRoles={["vendor"]}><VendorLayout><ClientList /></VendorLayout></RoleBasedRoute></ProtectedRoute>} />
      <Route path="/vendor/add-client" element={<ProtectedRoute><RoleBasedRoute allowedRoles={["vendor"]}><VendorLayout><AddClient /></VendorLayout></RoleBasedRoute></ProtectedRoute>} />
      <Route path="/vendor/edit-client/:id" element={<ProtectedRoute><RoleBasedRoute allowedRoles={["vendor"]}><VendorLayout><EditClient /></VendorLayout></RoleBasedRoute></ProtectedRoute>} />
      <Route path="/vendor/clients/:id" element={<ProtectedRoute><RoleBasedRoute allowedRoles={["vendor"]}><VendorLayout><ClientDetails /></VendorLayout></RoleBasedRoute></ProtectedRoute>} />
      <Route path="/vendor/profile" element={<ProtectedRoute><RoleBasedRoute allowedRoles={["vendor"]}><VendorLayout><Profile /></VendorLayout></RoleBasedRoute></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default AppRoutes;