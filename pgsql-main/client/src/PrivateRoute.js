import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" />;
  }

  // Allow access if no specific role is required or if the user's role matches the required role
  if (!requiredRole || userRole === requiredRole || (requiredRole === 'user' && userRole === 'admin')) {
    return children;
  }

  return <Navigate to="/notauthorized" />;
};

export default PrivateRoute;
