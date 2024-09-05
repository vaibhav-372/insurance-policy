import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminPrivateRoute = ({ children }) => {
  const isAdminAuthenticated = localStorage.getItem('adminToken'); // Check if admin is authenticated

  return isAdminAuthenticated ? children : <Navigate to="/admin/login" />;
};

export default AdminPrivateRoute;
