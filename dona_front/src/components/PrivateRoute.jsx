// components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
  // Obtener el rol guardado en localStorage (o donde manejes la sesión)
  const rol = localStorage.getItem("rol");

  if (!rol) {
    // No hay usuario logueado, redirige al login
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(rol)) {
    // El rol no está permitido para esta ruta, redirige a una página no autorizada o al login
    return <Navigate to="/login" replace />;
  }

  // Si todo bien, renderiza el contenido protegido
  return children;
};

export default PrivateRoute;
