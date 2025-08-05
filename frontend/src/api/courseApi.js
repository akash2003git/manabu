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

// Get course content
export const getCourseContent = async (id) => {
  const { data } = await api.get(`/api/courses/${id}/content`);
  return data;
};

// Purchase course
// export const purchaseCourse = async (courseId) => {
//   const { data } = await api.post("/api/user/purchaseCourse", { courseId });
//   return data;
// };

// Purchase course with Stripe
export const purchaseCourse = async (courseId) => {
  const { data } = await api.post("/api/payment/create-checkout-session", {
    courseId,
  });
  // Stripe checkout URL is returned by backend
  window.location.href = data.url;
};
