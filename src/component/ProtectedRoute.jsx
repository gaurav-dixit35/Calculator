import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../service/firebase";

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div className="text-center p-4">Loading...</div>;
if (!user) return <Navigate to="/login" replace />;
return typeof children === 'function' ? children(user) : children;

};

export default ProtectedRoute;
