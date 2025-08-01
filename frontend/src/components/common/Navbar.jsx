import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  AcademicCapIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";

import {
  accessTokenAtom,
  isUserAuthenticatedAtom,
  userAtom,
} from "../../store/store";
import { useAtomValue, useSetAtom } from "jotai";

function Navbar() {
  const navigate = useNavigate();
  const isUserAuthenticated = useAtomValue(isUserAuthenticatedAtom);
  const setAccessToken = useSetAtom(accessTokenAtom);
  const setUserAtom = useSetAtom(userAtom);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenu = () => {
    setIsMenuOpen((preValue) => !preValue);
  };

  const handleLogout = () => {
    setAccessToken(null);
    setUserAtom(null);
    navigate("/");
    setIsMenuOpen(false); // Close menu on logout
  };

  return (
    <div className="sticky top-2 z-50">
      <nav className="backdrop-blur-sm bg-background/30 text-txt flex justify-between items-center border-gray-800 border-2 px-3 py-2 sm:px-2 sm:py-2 rounded-xl mx-2 mt-2 sm:mt-5 sm:mx-5">
        <Link
          to="/"
          className="text-2xl sm:text-3xl font-bold flex items-center space-x-1"
        >
          <AcademicCapIcon className="w-8 sm:w-10" />
          <span>学ぶ</span>
        </Link>

        <div className="hidden sm:flex items-center space-x-5 text-lg">
          <Link
            to="/"
            className="hover:text-primary hover:underline transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/courses"
            className="hover:text-primary hover:underline transition-colors duration-300"
          >
            Courses
          </Link>
        </div>

        <div className="hidden sm:flex items-center space-x-3 text-lg">
          {isUserAuthenticated ? (
            <>
              <Link to="/my-courses">My Courses</Link>
              <button
                onClick={handleLogout}
                className="border-accent border-2 px-3 py-1 rounded-3xl hover:bg-gray-900 transition-colors duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="border-accent border-1 px-3 py-1 rounded-3xl hover:bg-gray-900 transition-colors duration-300"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="bg-accent hover:bg-secondary text-white px-3 py-1 rounded-3xl transition-colors duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Dropdown */}
        <button
          onClick={handleMenu}
          className="sm:hidden text-txt text-lg w-8 cursor-pointer"
        >
          {isMenuOpen ? <XMarkIcon /> : <Bars3Icon />}
        </button>
      </nav>

      {/* The Animated Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 text-lg flex flex-col space-y-2 items-center justify-center p-2 backdrop-blur-sm bg-background/30 border-2 border-gray-800 mx-20 mt-2 rounded-xl z-20 overflow-hidden"
          >
            <Link
              to="/"
              className="hover:underline hover:text-primary transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              to="/courses"
              className="hover:underline hover:text-primary transition-colors duration-300"
            >
              Courses
            </Link>
            {isUserAuthenticated ? (
              <>
                <button onClick={handleLogout}>Logout</button>
                <Link
                  to="/my-courses"
                  className="hover:underline hover:text-primary transition-colors duration-300"
                >
                  My Courses
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:underline hover:text-primary transition-colors duration-300"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="hover:underline hover:text-primary transition-colors duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navbar;
