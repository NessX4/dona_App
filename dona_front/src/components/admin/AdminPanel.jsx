// src/components/admin/AdminPanel.jsx
import React from 'react';
import '../../styles/admin.css';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import UsersPanel from './UsersPanel';
import Dashboard from './Dashboard';
import CreateUser from './createUser';
import EditUser from './editUser';
import DeleteUser from './deleteUser';

import PublicacionesPanel from './PublicacionesPanel';
import CreatePublicacion from './CreatePublicacion'; // ajusta el path si está en otra carpeta
import EditPublicacion from './editPublicacion';
import DeletePublicacion from './deletePublicacion';

import ZonasPanel from './zonasPanel';
import CreateZona from './createZona';
import EditZona from './editZona';
import DeleteZona from './deleteZona';


import SucursalesPanel from './sucursalesPanel';
import CreateSucursal from './CreateSucursal';

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
            <Route path="usuarios/editar/:id" element={<EditUser />} />
            <Route path="usuarios/eliminar/:id" element={<DeleteUser />} />


            <Route path="publicaciones" element={<PublicacionesPanel />} />
            <Route path="publicaciones/crear" element={<CreatePublicacion />} />
            <Route path="publicaciones/editar/:id" element={<EditPublicacion />} />
            <Route path="publicaciones/eliminar/:id" element={<DeletePublicacion />} />

                  
            <Route path="zonas" element={<ZonasPanel />} />
            <Route path="zonas/crear" element={<CreateZona />} />
            <Route path="zonas/editar/:id" element={<EditZona />} />
            <Route path="zonas/eliminar/:id" element={<DeleteZona />} />


            <Route path="sucursales" element={<SucursalesPanel />} />
            <Route path="sucursales/crear" element={<CreateSucursal />} />



            <Route path="*" element={<Dashboard />} /> {/* fallback para rutas desconocidas */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
