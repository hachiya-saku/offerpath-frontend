import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";

export function ProtectedRoute() {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const isInitialized = useAppSelector((state) => state.auth.isInitialized);
  const location = useLocation();

  if (!isInitialized) {
    return null;
  }

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
