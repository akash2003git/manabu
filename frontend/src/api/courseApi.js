import api from "./axiosInstance";

// Get all courses
export const getCourses = async (query = "") => {
  const adminToken = localStorage.getItem("adminToken");
  const headers = {};

  if (adminToken) {
    headers.Authorization = `Bearer ${adminToken.replace(/"/g, "")}`;
  }

  const { data } = await api.get(`/api/courses${query}`, { headers });
  return data;
};

// Get a single course by ID
export const getCourseById = async (id) => {
  const adminToken = localStorage.getItem("adminToken");
  const headers = {};

  if (adminToken) {
    headers.Authorization = `Bearer ${adminToken.replace(/"/g, "")}`;
  }

  const { data } = await api.get(`/api/courses/${id}`, { headers });
  return data;
};

// Create a course
export const createCourse = async (courseData) => {
  const adminToken = localStorage.getItem("adminToken");
  if (!adminToken) {
    throw new Error("Admin not authenticated");
  }
  const { data } = await api.post("/api/courses", courseData, {
    headers: {
      Authorization: `Bearer ${adminToken.replace(/"/g, "")}`,
    },
  });
  return data;
};

// Update a course
export const updateCourse = async (id, updatedCourse) => {
  const adminToken = localStorage.getItem("adminToken");
  if (!adminToken) throw new Error("Admin not authenticated");

  const { data } = await api.put(`/api/courses/${id}`, updatedCourse, {
    headers: {
      Authorization: `Bearer ${adminToken?.replace(/"/g, "")}`,
    },
  });
  return data;
};

// Delete a course
export const deleteCourse = async (id) => {
  const adminToken = localStorage.getItem("adminToken");
  if (!adminToken) {
    throw new Error("Admin not authenticated");
  }
  const { data } = await api.delete(`/api/courses/${id}`, {
    headers: {
      Authorization: `Bearer ${adminToken?.replace(/"/g, "")}`,
    },
  });
  return data;
};

// Get featured courses
export const getFeaturedCourses = async () => {
  const { data } = await api.get("/api/courses?featured=true");
  return data;
};

// Get course content
export const getCourseContent = async (id, admin) => {
  if (admin) {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      throw new Error("Admin not authenticated");
    }
    const { data } = await api.get(`/api/courses/${id}/content`, {
      headers: {
        Authorization: `Bearer ${adminToken?.replace(/"/g, "")}`,
      },
    });
    return data;
  }
  const { data } = await api.get(`/api/courses/${id}/content`);
  return data;
};

// Add course content
export const createCourseContent = async (id, newContent) => {
  const adminToken = localStorage.getItem("adminToken");
  if (!adminToken) {
    throw new Error("Admin not authenticated");
  }
  const { data } = await api.post(`/api/courses/${id}/content`, newContent, {
    headers: {
      Authorization: `Bearer ${adminToken?.replace(/"/g, "")}`,
    },
  });
  return data;
};

// Delete course content
export const deleteCourseContent = async (courseId, contentId) => {
  const adminToken = localStorage.getItem("adminToken");
  if (!adminToken) {
    throw new Error("Admin not authenticated");
  }
  const { data } = await api.delete(
    `/api/courses/${courseId}/content/${contentId}`,
    {
      headers: {
        Authorization: `Bearer ${adminToken.replace(/"/g, "")}`,
      },
    },
  );

  return data;
};

// Update course content
export const updateCourseContent = async (courseId, contentId, updates) => {
  const adminToken = localStorage.getItem("adminToken");
  if (!adminToken) {
    throw new Error("Admin not authenticated");
  }

  const { data } = await api.put(
    `/api/courses/${courseId}/content/${contentId}`,
    updates,
    {
      headers: {
        Authorization: `Bearer ${adminToken.replace(/"/g, "")}`,
      },
    },
  );

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
