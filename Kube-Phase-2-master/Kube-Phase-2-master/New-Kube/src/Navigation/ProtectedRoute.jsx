import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  
  const DeviceVerify = localStorage.getItem("isUserVerify");
  
  return DeviceVerify == 'true' ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
// test pagination