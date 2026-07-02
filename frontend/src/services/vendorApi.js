import axiosInstance from "./axiosInstance";

// Get Vendors
export const getVendors = async () => {
  const token = localStorage.getItem("token");

  const response = await axiosInstance.get("/vendor", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Create Vendor
export const createVendor = async (vendorData) => {
  const token = localStorage.getItem("token");

  const response = await axiosInstance.post(
    "/vendor",
    vendorData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Delete Vendor
export const deleteVendor = async (id) => {
  const token = localStorage.getItem("token");

  const response = await axiosInstance.delete(
    `/vendor/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};