import api from "./axiosInstance";

// Get complete user data
export const getMe = async () => {
  const { data } = await api.get("/api/user/me");
  return data;
};
