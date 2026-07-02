import axiosInstance from "./axiosInstance";

export const getAdmins = async () => {
  const res = await axiosInstance.get("/admin");
  return res.data;
};

export const getPendingAdmins = async () => {
  const res = await axiosInstance.get("/admin/pending");
  return res.data;
};

// role must be "admin" or "vendor" (lowercase, matches Login.jsx checks)
export const approveAdmin = async (id, role) => {
  const res = await axiosInstance.patch(`/admin/${id}/approve`, { role });
  return res.data;
};

export const rejectAdmin = async (id) => {
  const res = await axiosInstance.patch(`/admin/${id}/reject`, {});
  return res.data;
};

export const deleteAdmin = async (id) => {
  const res = await axiosInstance.delete(`/admin/${id}`);
  return res.data;
};

export const getAdminById = async (id) => {
  const res = await axiosInstance.get(`/admin/${id}`);
  return res.data;
};

export const updateAdmin = async (id, formData) => {
  const res = await axiosInstance.put(`/admin/${id}`, formData);
  return res.data;
};

export const createAdmin = async (formData) => {
  const res = await axiosInstance.post("/admin", formData);
  return res.data;
};

export const getDashboardStats = async () => {
  const res = await axiosInstance.get("/admin/dashboard");
  return res.data;
};