import { Navigate, Outlet } from "react-router";

export default function AuthGuard({ user }) {
  if (!user || !user.email) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
