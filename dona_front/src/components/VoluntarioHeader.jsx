// Luna FLores Yamileth Guadalupe
import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { FiAlertTriangle } from "react-icons/fi";
import logoDona from "../assets/Logotipo.png";

const VoluntarioHeader = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("usuario");
      localStorage.removeItem("rol");
      localStorage.removeItem("usuarioId");
      localStorage.removeItem("donadorId");
      localStorage.removeItem("receptorId");
      localStorage.removeItem("voluntarioId");


    navigate("/login"); // Mejor redirigir al login
};


  const cancelLogout = () => {
    setShowLogoutModal(false);
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

      {showLogoutModal && (
              <div className="logout-modal-overlay">
                <div className="logout-modal">
                  <div className="modal-header">
                    <FiAlertTriangle className="modal-icon" />
                    <h3>Confirmar cierre de sesión</h3>
                  </div>
                  <div className="modal-body">
                    <p>¿Estás seguro que deseas cerrar la sesión?</p>
                  </div>
                  <div className="modal-footer">
                    <button onClick={cancelLogout} className="modal-btn cancel-btn">
                      Cancelar
                    </button>
                    <button onClick={confirmLogout} className="modal-btn confirm-btn">
                      Sí, cerrar sesión
                    </button>
                  </div>
                </div>
              </div>
            )}

    </>
  );
};

export default VoluntarioHeader;
