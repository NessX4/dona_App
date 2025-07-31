import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import logoDona from "../assets/Logotipo.png";
import { FiLogOut, FiAlertTriangle } from "react-icons/fi";
import "./RefugioHeader.css";

const RefugioHeader = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => setShowLogoutModal(true);
  const confirmLogout = () => {
    setShowLogoutModal(false);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("usuarioId");
    localStorage.removeItem("rol");
    navigate("/login"); // Mejor redirigir al login
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <div className="topbar">
        <p>Bienvenido, Refugio - ¡Gracias por tu labor!</p>
      </div>

      <header>
        <div className="container">
          <div className="logo">
            <img src={logoDona} alt="Logo Dona" />
            <NavLink to="/refugio" className="dona-text">
              DonaApp
            </NavLink>
          </div>
          <nav>
            <NavLink
              to="/refugio/donaciones-disponibles"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Donaciones
            </NavLink>
            <NavLink
              to="/refugio/zonas-refugios"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Zonas
            </NavLink>
            <NavLink
              to="/refugio/historial-donaciones"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Historial
            </NavLink>
            <NavLink
              to="/refugio/notificaciones"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Notificaciones
            </NavLink>
            <NavLink
              to="/refugio/perfil"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Perfil
            </NavLink>
            <button onClick={handleLogout} className="donar-btn">
              <FiLogOut style={{ marginRight: "5px" }} />
              Cerrar Sesión
            </button>
          </nav>
        </div>
      </header>

      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>¿Deseas cerrar sesión?</h3>
            <div className="modal-buttons">
              <button onClick={cancelLogout} className="btn-cancel">
                Cancelar
              </button>
              <button onClick={confirmLogout} className="btn-confirm">
                Sí, cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RefugioHeader;