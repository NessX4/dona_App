// src/components/admin/Sidebar.jsx
import React from 'react';
import donaLogo from '/src/assets/Donalogo.png'; // Asegúrate que esta ruta es correcta

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Cuadro naranja con logo clickeable */}
      <a href="/admin.html" className="logo-container" style={{ textDecoration: 'none' }}>
        <img src={donaLogo} alt="Logo DonaApp" className="logo-img" />
        <span className="logo-text">DonaApp</span>
      </a>

      {/* Menú de navegación con íconos Bootstrap */}
      <ul className="sidebar-menu">
        <li><i className="bi bi-bar-chart-fill"></i> Dashboard</li>
        <li><i className="bi bi-people-fill"></i> Usuarios</li>
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
