import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import clsx from "clsx";

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/admin/courses", label: "All Courses" },
    { to: "/admin/courses/create", label: "Create Course" },
    { to: "/admin/users", label: "All Users" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    window.location.href = "/admin/login";
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar (mobile overlay) */}
      <aside
        className={clsx(
          "fixed top-0 left-0 lg:relative h-full w-64 bg-altBg text-txt p-5 flex flex-col z-50 transform transition-transform duration-300 lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold">Admin Panel</h2>

          <button
            className="lg:hidden"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
          >
            <FiX size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={clsx(
                "hover:text-accent transition",
                location.pathname === link.to
                  ? "text-accent font-semibold bg-altBg"
                  : "",
              )}
              onClick={() => setIsSidebarOpen(false)} // close menu on mobile
            >
              {link.label}
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="cursor-pointer mt-auto text-red-400 hover:text-red-600 text-left"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="flex items-center justify-between p-4 bg-altBg text-txt border-b border-gray-700 lg:hidden">
          <button onClick={() => setIsSidebarOpen((prev) => !prev)}>
            {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <h1 className="text-lg font-bold">Admin Dashboard</h1>
        </header>

        <main className="flex-1 p-6 overflow-y-auto bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
