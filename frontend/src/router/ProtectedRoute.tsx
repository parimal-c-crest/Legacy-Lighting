import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../api/auth";

export default function ProtectedRoute() {
  // The auth cookie is httpOnly, so the only way to know if a session is valid is to ask the
  // backend — there's nothing readable in localStorage/document.cookie to check client-side.
  const { data: user, isLoading, isError } = useCurrentUser();

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center text-sm text-gray-500">Loading…</div>;
  }

  if (isError || !user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
