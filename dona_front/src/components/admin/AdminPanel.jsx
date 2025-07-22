// src/components/admin/AdminPanel.jsx
import React from 'react';
import '../../styles/admin.css';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import UsersPanel from './UsersPanel';
import Dashboard from './Dashboard';
import CreateUser from './createUser';

const AdminPanel = () => {
  return (
    <div className="admin-panel">
      <Sidebar />
      <div className="main-section">
        <Topbar />
        <div className="main-content">
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="usuarios" element={<UsersPanel />} />
            <Route path="usuarios/crear" element={<CreateUser />} />
            <Route path="*" element={<Dashboard />} /> {/* fallback para rutas desconocidas */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
