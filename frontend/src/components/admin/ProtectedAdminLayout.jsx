import { useAtomValue } from "jotai";
import { Navigate, Outlet } from "react-router-dom";
import { isAdminAuthenticatdAtom } from "../../store/store";
import { useHydrated } from "../../hooks/useHydrated";

export default function ProtectedAdminRoute() {
  const isAdminAuthenticated = useAtomValue(isAdminAuthenticatdAtom);
  const hydrated = useHydrated();

  if (!hydrated) {
    return <p className="text-center mt-[100px]">Loading...</p>;
  }

  return isAdminAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/admin/login" replace />
  );
}
