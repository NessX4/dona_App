// src/components/admin/AdminPanel.jsx
import React from 'react';
import '../../styles/admin.css';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import UsersPanel from './UsersPanel';

const AdminPanel = () => {
  return (
    <div className="admin-panel">
      <Sidebar />
      <div className="main-section">
        <Topbar />
        <div className="main-content">
          <Routes>
            <Route path="usuarios" element={<UsersPanel />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
