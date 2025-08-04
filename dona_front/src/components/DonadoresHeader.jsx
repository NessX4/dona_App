// Luna Flores Yamileth Guadalupe
import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
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

    navigate("/login");
  };

  const cancelLogout = () => {
    setShowModal(false);
  };

  const handleForceNavigate = (path) => (e) => {
    e.preventDefault();
    window.location.href = path;
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
              onClick={handleForceNavigate("/donadores/donaciones")}
            >
              Mis Donaciones
            </NavLink>
            <NavLink
              to="/donadores/solicitudes"
              className={({ isActive }) => (isActive ? "active-link" : "")}
              onClick={handleForceNavigate("/donadores/solicitudes")}
            >
              Solicitudes
            </NavLink>
            <NavLink
              to="/donadores/notificaciones"
              className={({ isActive }) => (isActive ? "active-link" : "")}
              onClick={handleForceNavigate("/donadores/notificaciones")}
            >
              Notificaciones
            </NavLink>
            <NavLink
              to="/donadores/perfil"
              className={({ isActive }) => (isActive ? "active-link" : "")}
              onClick={handleForceNavigate("/donadores/perfil")}
            >
              Mi Perfil
            </NavLink>

            <button onClick={handleLogout} className="donar-btn">
              <FiLogOut style={{ marginRight: "6px" }} />
              Cerrar sesión
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
