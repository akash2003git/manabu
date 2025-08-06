import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../api/authApi";
import {
  adminTokenAtom,
  adminAtom,
  isAdminAuthenticatdAtom,
} from "../store/store";
import { useAtom, useAtomValue } from "jotai";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [, setAdminToken] = useAtom(adminTokenAtom);
  const [, setAdmin] = useAtom(adminAtom);
  const isAdminAuthenticated = useAtomValue(isAdminAuthenticatdAtom);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    try {
      const data = await loginAdmin({
        inputEmail: email,
        inputPassword: password,
      });
      const { _id, username, email: adminEmail, accessToken } = data;
      setAdmin({ _id, username, email: adminEmail });
      setAdminToken(accessToken);

      // Redirect to admin dashboard after login
      navigate("/admin/courses");
    } catch (error) {
      if (error.response?.data?.errors?.length > 0) {
        setAuthError(error.response.data.errors[0].message);
      } else if (error.response?.data?.message) {
        setAuthError(error.response.data.message);
      } else if (error.message) {
        setAuthError(error.message);
      } else {
        setAuthError("Error during login");
      }
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    if (isAdminAuthenticated) {
      navigate("/admin/courses", { replace: true });
    }
  }, [isAdminAuthenticated, navigate]);

  useEffect(() => {
    setAuthError("");
  }, [email, password]);

  return (
    <div className="flex flex-col items-center mt-[200px]">
      <h1 className="text-[2rem] font-bold mb-5">Admin Login</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 items-center bg-altBg rounded-xl p-5 w-[340px]"
      >
        <input
          type="email"
          className="text-txt rounded-full p-3 border-1 border-accent outline-none w-full"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            className="text-txt rounded-full p-3 border-1 border-accent outline-none w-full"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-accent cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          type="submit"
          disabled={authLoading}
          className={`cursor-pointer rounded-full w-full p-3 font-semibold ${
            authLoading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-accent hover:bg-secondary"
          } text-txt`}
        >
          {authLoading ? "Logging in..." : "Log In"}
        </button>

        {authError && (
          <div className="bg-red-100 text-red-700 p-2 rounded w-full text-center">
            {authError}
          </div>
        )}
      </form>
    </div>
  );
}

export default AdminLoginPage;
