import api from "./axiosInstance";

// Get all courses
export const getCourses = async () => {
  const { data } = await api.get("/api/courses");
  return data;
};

// Get a single course by ID
export const getCourseById = async (id) => {
  const { data } = await api.get(`/api/courses/${id}`);
  return data;
};

// Get featured courses
export const getFeaturedCourses = async () => {
  const { data } = await api.get("/api/courses?featured=true");
  return data;
};
