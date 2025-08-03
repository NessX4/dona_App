// src/main-admin.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import AdminPanel from './components/admin/AdminPanel';
import AdminLogin from './components/admin/AdminLogin';

import 'bootstrap-icons/font/bootstrap-icons.css';

const ProtectedRoute = ({ children }) => {
  const rol = localStorage.getItem("rol");
  const isAdmin = rol === "Administrador";
  return isAdmin ? children : <Navigate to="/login" replace />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        {/* Ruta al login */}
        <Route path="/login" element={<AdminLogin />} />

        {/* Resto del panel protegido */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
