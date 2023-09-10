// PrivateRoute.tsx
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext"; // Update the path

const PrivateRoute: React.FC<any> = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/" /> // Redirect to login page if not authenticated
  );
};

export default PrivateRoute;
