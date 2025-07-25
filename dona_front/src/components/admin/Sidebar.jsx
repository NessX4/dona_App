// src/components/admin/Sidebar.jsx
import React from 'react';
import donaLogo from '/src/assets/Donalogo.png'; // Asegúrate que esta ruta es correcta

import { NavLink } from 'react-router-dom';


const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Cuadro naranja con logo clickeable */}
     <NavLink to="/dashboard" className="logo-container" style={{ textDecoration: 'none' }}>
  <img src={donaLogo} alt="Logo DonaApp" className="logo-img" />
  <span className="logo-text">DonaApp</span>
</NavLink>

      {/* Menú de navegación con íconos Bootstrap */}
      <ul className="sidebar-menu">
        
        <NavLink to="/dashboard" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
  <li>
    <i className="bi bi-bar-chart-fill"></i> Dashboard
  </li>
</NavLink>


        <NavLink to="/usuarios" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <li>
            <i className="fa fa-users"></i> Usuarios
          </li>
        </NavLink>




        <li><i className="bi bi-file-earmark-post-fill"></i> Publicaciones</li>
        <li><i className="bi bi-geo-alt-fill"></i> Zonas</li>
        <li><i className="bi bi-inbox-fill"></i> Solicitudes</li>
        <li><i className="bi bi-bell-fill"></i> Notificaciones</li>
        <li><i className="bi bi-clock-history"></i> Logs</li>
      </ul>
    </div>
  );
};

export default Sidebar;
