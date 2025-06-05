import { Navigate } from "react-router";

export const RequireAuth = ({ children }) => {
  const jwt = JSON.parse(localStorage.getItem('user')).token;

  if (!jwt) {
    return <Navigate to="/login" replace />
  }

  return children;
};