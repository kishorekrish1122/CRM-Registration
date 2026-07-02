import axiosInstance from "./axiosInstance";

// Get Clients
export const getClients = async () => {
  const response = await axiosInstance.get("/client");
  return response.data;
};

// Add Client
export const addClient = async (clientData) => {
  const response = await axiosInstance.post("/client", clientData);
  return response.data;
};

// Get Client By ID
export const getClientById = async (id) => {
  const response = await axiosInstance.get(`/client/${id}`);
  return response.data;
};

// Update Client
export const updateClient = async (id, clientData) => {
  const response = await axiosInstance.put(`/client/${id}`, clientData);
  return response.data;
};

// Delete Client
export const deleteClient = async (id) => {
  const response = await axiosInstance.delete(`/client/${id}`);
  return response.data;
};