import api from "./axiosInstance";

// Login user
export const loginUser = async ({ inputEmail, inputPassword }) => {
  const { data } = await api.post("/api/user/login", {
    email: inputEmail,
    password: inputPassword,
  });
  return data;
};

// Signup user
export const signupUser = async ({
  inputUsername,
  inputEmail,
  inputPassword,
}) => {
  const { data } = await api.post("/api/user/signup", {
    username: inputUsername,
    email: inputEmail,
    password: inputPassword,
  });
  return data;
};
