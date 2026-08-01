import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ReactElement } from "react";

interface Props {
  children: ReactElement;
}

export default function ProtectedRoute({ children }: Props) {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}