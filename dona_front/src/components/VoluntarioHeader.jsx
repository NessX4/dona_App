// Luna FLores Yamileth Guadalupe
import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import logoDona from "../assets/Logotipo.png";

const VoluntarioHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); // Redirige a Home.jsx
  };

  return (
    <>
      <div className="topbar">
        <p>Bienvenido, Voluntario - ¡Gracias por tu apoyo!</p>
      </div>

      <header>
        <div className="container">
          <div className="logo">
            <img src={logoDona} alt="Logo Dona" />
            <NavLink to="/voluntario" className="dona-text">
              DonaApp
            </NavLink>
          </div>
          <nav>
            <NavLink
              to="/donaciones/publicaciones"
              className={({ isActive }) => isActive ? "active-link" : ""}
            >
              Donaciones
            </NavLink>
            <NavLink
              to="/solicitudes"
              className={({ isActive }) => isActive ? "active-link" : ""}
            >
              Solicitudes
            </NavLink>
            <NavLink
              to="/donaciones/sucursales"
              className={({ isActive }) => isActive ? "active-link" : ""}
            >
              Centros de Donación
            </NavLink>
            <NavLink
              to="/zonas/zonas"
              className={({ isActive }) => isActive ? "active-link" : ""}
            >
              Zonas
            </NavLink>
            <NavLink
              to="/historial"
              className={({ isActive }) => isActive ? "active-link" : ""}
            >
              Historial de Donaciones
            </NavLink>
            <NavLink
              to="/notificaciones"
              className={({ isActive }) => isActive ? "active-link" : ""}
            >
              Alertas
            </NavLink>
            <NavLink
              to="/perfil"
              className={({ isActive }) => isActive ? "active-link" : ""}
            >
              Mi Perfil
            </NavLink>

            <button onClick={handleLogout} className="donar-btn">
              Salir
            </button>
          </nav>
        </div>
      </header>
    </>
  );
};

export default VoluntarioHeader;
