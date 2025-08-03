import React, { useState, useEffect } from "react";
import "../../styles/admin.css";
import { NavLink } from "react-router-dom";

const Topbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [nombreCompleto, setNombreCompleto] = useState("Cargando...");

  useEffect(() => {
    const usuarioId = localStorage.getItem("usuarioId");

    if (usuarioId) {
      fetch(`http://localhost:8000/api/usuarios/usuarios/${usuarioId}/`)
        .then((res) => {
          if (!res.ok) throw new Error("Error al obtener los datos del administrador");
          return res.json();
        })
        .then((data) => {
          if (data.nombre) setNombreCompleto(data.nombre);
        })
        .catch((error) => console.error("Error al cargar el nombre:", error));
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/admin/#/login";
  };

  return (
    <>
      <div className="topbar">
        <div className="topbar-logo"></div>

        <div className="topbar-buttons">
          <span className="welcome-msg">
            👋 Bienvenid@ Administrador: {nombreCompleto}
          </span>

          <NavLink to="/configuracion" className="topbar-button config-btn">
            <i className="fas fa-cog"></i> Configuración
          </NavLink>

          <NavLink
            to="#"
            className="topbar-button logout-btn"
            onClick={(e) => {
              e.preventDefault();
              setShowModal(true);
            }}
          >
            <i className="fas fa-sign-out-alt"></i> Cerrar sesión
          </NavLink>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3 className="modal-title">¿Estás segur@ que deseas cerrar sesión?</h3>
            <div className="modal-actions">
              <button className="confirm-btn" onClick={handleLogout}>
                Sí, cerrar sesión
              </button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Topbar;
