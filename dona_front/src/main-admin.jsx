// src/main-admin.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import AdminPanel from './components/admin/AdminPanel';
import AdminLogin from './components/admin/AdminLogin';

import 'bootstrap-icons/font/bootstrap-icons.css';

const rol = localStorage.getItem("rol");
const isAdmin = rol === "Administrador";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        {/* Login de admin: SEPARADO del panel */}
        <Route path="/login" element={<AdminLogin />} />

        {/* Panel administrativo completo */}
        <Route
          path="/*"
          element={
            isAdmin ? <AdminPanel /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
