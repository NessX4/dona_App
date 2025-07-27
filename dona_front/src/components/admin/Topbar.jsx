import React from 'react';
import '../../styles/admin.css'; // Asegúrate que el path sea correcto
import { NavLink } from 'react-router-dom';


const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbar-logo"></div>

      <div className="topbar-buttons">
        <span className="welcome-msg">👋 Bienvenid@ Administrador: ______________________</span>




            <NavLink to="/configuracion" className="topbar-button config-btn">
      <i className="fas fa-cog"></i> Configuración
    </NavLink>
    




<NavLink to="/" className="topbar-button logout-btn">
  <i className="fas fa-sign-out-alt"></i> Cerrar sesión
</NavLink>



      </div>
    </div>
  );
};

export default Topbar;
