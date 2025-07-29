import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import logoDona from "../assets/Logotipo.png";
import { FiLogOut, FiX, FiAlertTriangle } from "react-icons/fi";
import "./RefugioHeader.css";

const RefugioHeader = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

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
      <header className="refugio-header">
        <div className="header-top">
          <p>Bienvenido, Refugio - ¡Gracias por tu labor!</p>
        </div>

        <div className="header-main">
          <div className="header-container">
            <div className="header-logo">
              <img src={logoDona} alt="Logo Dona" />
              <NavLink to="/refugio" className="logo-text">
                DonaApp Refugios
              </NavLink>
            </div>

            <nav className="header-nav">
              <div className="nav-links">
                <NavLink
                  to="/refugio/dashboard"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/refugio/donaciones-disponibles"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Donaciones
                </NavLink>
                <NavLink
                  to="/refugio/zonas-refugios"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Zonas
                </NavLink>
                <NavLink
                  to="/refugio/historial-donaciones"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Historial
                </NavLink>
                <NavLink
                  to="/refugio/notificaciones"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Notificaciones
                </NavLink>
                <NavLink
                  to="/refugio/perfil"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Perfil
                </NavLink>
              </div>

              <button onClick={handleLogout} className="logout-btn">
                <FiLogOut className="logout-icon" />
                Cerrar Sesión
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Modal de confirmación */}
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

      {/* Espacio para separar el header del contenido */}
      <div className="header-spacer"></div>
    </>
  );
};

export default RefugioHeader;
