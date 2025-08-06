import { useAtomValue } from "jotai";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isUserAuthenticatedAtom } from "../../store/store";

export default function ProtectedUserRoute() {
  const isUserAuthenticated = useAtomValue(isUserAuthenticatedAtom);
  const location = useLocation();

  return isUserAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} />
  );
}
