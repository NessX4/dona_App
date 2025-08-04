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

      {/* Menú de navegación con íconos Bootstrap y orden lógico */}
      <ul className="sidebar-menu">

        {/* 1. Dashboard */}
        <NavLink to="/dashboard" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <li>
            <i className="bi bi-bar-chart-fill"></i> Dashboard
          </li>
        </NavLink>

        {/* 2. Usuarios */}
        <NavLink to="/usuarios" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <li>
            <i className="fa fa-users"></i> Usuarios
          </li>
        </NavLink>

        {/* 3. Zonas */}
        <NavLink to="/zonas" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <li>
            <i className="bi bi-geo-alt-fill"></i> Zonas
          </li>
        </NavLink>

        {/* 4. Sucursales */}
        <NavLink to="/sucursales" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <li>
            <i className="bi bi-shop"></i> Sucursales
          </li>
        </NavLink>

        {/* 5. Publicaciones */}
        <NavLink to="/publicaciones" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <li>
            <i className="bi bi-file-earmark-post-fill"></i> Publicaciones
          </li>
        </NavLink>

        {/* 6. Solicitudes */}
        <NavLink to="/solicitudes" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <li>
            <i className="bi bi-inbox-fill"></i> Solicitudes
          </li>
        </NavLink>

        {/* 7. Notificaciones */}
        <NavLink to="/notificaciones" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <li>
            <i className="bi bi-bell-fill"></i> Notificaciones
          </li>
        </NavLink>

        {/* 8. Logs */}
        <NavLink to="/logs" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <li>
            <i className="bi bi-clock-history"></i> Logs
          </li>
        </NavLink>

      </ul>
    </div>
  );
};

export default Sidebar;
