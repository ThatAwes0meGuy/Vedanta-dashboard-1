import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const email = localStorage.getItem('auth');

  if (!email) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
