import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { user, token, loading } = useAuth();

  if (loading) {
    return <div className="p-6 text-gray-500">Cargando sesión...</div>;
  }

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
