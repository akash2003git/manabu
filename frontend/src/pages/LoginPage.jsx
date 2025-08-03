import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { loginUser } from "../api/authApi";
import {
  accessTokenAtom,
  userAtom,
  isUserAuthenticatedAtom,
} from "../store/atoms/authAtom";
import { useAtom, useAtomValue } from "jotai";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function LoginPage() {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const [, setAccessToken] = useAtom(accessTokenAtom);
  const [, setUser] = useAtom(userAtom);
  const isUserAuthenticated = useAtomValue(isUserAuthenticatedAtom);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login attempt for:", inputEmail, inputPassword);
    setAuthError("");
    setAuthLoading(true);

    try {
      const data = await loginUser({ inputEmail, inputPassword });
      const { _id, username, email, accessToken } = data;
      setUser({ _id, username, email });
      setAccessToken(accessToken);
    } catch (error) {
      if (error.response?.data?.errors?.length > 0) {
        // Zod validation error
        setAuthError(error.response.data.errors[0].message);
      } else if (error.response?.data?.message) {
        // Other backend errors
        setAuthError(error.response.data.message);
      } else if (error.message) {
        // Network or Axios error
        setAuthError(error.message);
      } else {
        setAuthError("Error during sign-up");
      }
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    if (isUserAuthenticated) {
      navigate("/");
    }
  }, [isUserAuthenticated, navigate]);

  useEffect(() => {
    setAuthError("");
  }, [inputEmail, inputPassword]);

  return (
    <div className="flex flex-col items-center mt-[200px]">
      <h1 className="text-[2rem] font-bold mb-5">Welcome Back</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 items-center bg-altBg rounded-xl p-5 w-[340px]"
      >
        <input
          type="email"
          className="text-txt rounded-full p-3 border-1 border-accent outline-none w-full"
          placeholder="Email address"
          value={inputEmail}
          onChange={(e) => setInputEmail(e.target.value)}
          required
        />

        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            className="text-txt rounded-full p-3 border-1 border-accent outline-none w-full"
            placeholder="Password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
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

        <div className="mt-5">
          <p className="text-txt text-md">
            Don't have an account?{" "}
            <Link to="/signup" className="text-accent hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
