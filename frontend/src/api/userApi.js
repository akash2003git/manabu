import api from "./axiosInstance";

// Get complete user data
export const getMe = async () => {
  const { data } = await api.get("/api/user/me");
  return data;
};

// Get all users
export const getAllUsers = async () => {
  const adminToken = localStorage.getItem("adminToken");
  if (!adminToken) throw new Error("Admin not authenticated");
  const { data } = await api.get("/api/admin/users", {
    headers: {
      Authorization: `Bearer ${adminToken?.replace(/"/g, "")}`,
    },
  });
  return data;
};
