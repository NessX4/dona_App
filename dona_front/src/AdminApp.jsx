// src/AdminApp.jsx
import React, { useEffect } from 'react';
import AdminPanel from './components/admin/AdminPanel';
import './styles/admin.css';


function AdminApp() {
  useEffect(() => {
    console.log("✅ Panel de administrador montado");
  }, []);

  return <AdminPanel />;
}

export default AdminApp;
