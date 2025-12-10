import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // User is not logged in? Kick them to login page
    return <Navigate to="/login" />;
  }
  
  // User is logged in? Let them see the page
  return children;
};

export default ProtectedRoute;