import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export const RequireAuth = ({ children }) => {
  const jwt = useSelector((state) => state.auth.token);

  if (!jwt) {
    return <Navigate to="/login" replace />
  }

  return children;
};