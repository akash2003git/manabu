import { useAtomValue } from "jotai";
import { Navigate, Outlet } from "react-router-dom";
import { isAdminAuthenticatdAtom } from "../../store/store";

export default function ProtectedAdminRoute() {
  const isAdminAuthenticated = useAtomValue(isAdminAuthenticatdAtom);

  return isAdminAuthenticated ? <Outlet /> : <Navigate to="/admin/login" />;
}
