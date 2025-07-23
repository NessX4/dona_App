import React from 'react';
import '../../styles/admin.css'; // Asegúrate que el path sea correcto

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbar-logo"></div>

      <div className="topbar-buttons">
        <span className="welcome-msg">👋 Bienvenid@ Administrador: ______________________</span>

        <button className="topbar-button config-btn">
          <i className="fas fa-cog"></i> Configuración
        </button>

        <button className="topbar-button logout-btn">
          <i className="fas fa-sign-out-alt"></i> Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Topbar;
