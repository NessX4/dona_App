    // Luna FLores Yamileth Guadalupe
import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import logoDona from "../assets/Logotipo.png";

const DonadoresHeader = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    setShowModal(true);
  };

  const confirmLogout = () => {
    setShowModal(false);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("usuarioId");
    localStorage.removeItem("rol");

    navigate("/login"); // Mejor redirigir al login
};

  const cancelLogout = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="topbar">
        <p>Bienvenido, Donador - ¡Gracias por tu generosidad!</p>
      </div>

      <header>
        <div className="container">
          <div className="logo">
            <img src={logoDona} alt="Logo Dona" />
            <NavLink to="/donadores" className="dona-text">
              DonaApp
            </NavLink>
          </div>
          <nav>
            <NavLink
              to="/donadores/donaciones"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Mis Donaciones
            </NavLink>
            <NavLink
              to="/donadores/nueva-donacion"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Nueva Donación
            </NavLink>
            <NavLink
              to="/donadores/solicitudes"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Solicitudes
            </NavLink>
            <NavLink
              to="/donadores/notificaciones"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Notificaciones
            </NavLink>
            <NavLink
              to="/donadores/perfil"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Mi Perfil
            </NavLink>

            <button onClick={handleLogout} className="donar-btn">
              Salir
            </button>
          </nav>
        </div>
      </header>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>¿Estás seguro que quieres salir?</h3>
            <div className="modal-buttons">
              <button onClick={confirmLogout} className="confirm">
                Sí, salir
              </button>
              <button onClick={cancelLogout} className="modal-Dona3">
                Cancelar
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DonadoresHeader;
