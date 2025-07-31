// Luna FLores Yamileth Guadalupe
import React, { useState, useEffect } from "react";
import VoluntarioHeader from "../../../components/DonadoresHeader";
import "./NotificacionesDonador.css";

const NotificacionesDonador = () => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [editarVisible, setEditarVisible] = useState(false);
  const [notificacionActiva, setNotificacionActiva] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const datosMock = [
        {
          id: 1,
          titulo: "Nueva solicitud de donación",
          mensaje: "Un refugio cercano necesita alimentos frescos.",
          fecha: "2025-07-28T09:30:00Z",
          leida: false,
        },
        {
          id: 2,
          titulo: "Recordatorio de donación",
          mensaje: "Tu próxima donación está programada para el 30 de julio.",
          fecha: "2025-07-27T16:00:00Z",
          leida: true,
        },
      ];
      setNotificaciones(datosMock);
    }, 1000);
  }, []);

  const abrirNotificacion = (notificacion) => {
    setNotificacionActiva(notificacion);
    setEditarVisible(true);
    setNotificaciones((prev) =>
      prev.map((n) => (n.id === notificacion.id ? { ...n, leida: true } : n))
    );
  };

  const cerrarModal = () => {
    setEditarVisible(false);
    setNotificacionActiva(null);
  };

  // Función para formatear fecha en español
  const formatoFecha = (fecha) => {
    return new Date(fecha).toLocaleString("es-MX", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <VoluntarioHeader />
      <main className="donaciones-container">
        <h1 className="donaciones-title">Notificaciones</h1>

        {notificaciones.length === 0 ? (
          <p className="loading">No hay notificaciones.</p>
        ) : (
          <table className="tabla-notificaciones">
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Mensaje</th>
                <th>Fecha</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {notificaciones.map(({ id, titulo, mensaje, fecha, leida }) => (
                <tr
                  key={id}
                  className={leida ? "leida" : "no-leida"}
                  onClick={() =>
                    abrirNotificacion({ id, titulo, mensaje, fecha, leida })
                  }
                  style={{ cursor: "pointer" }}
                >
                  <td>{id}</td>
                  <td>{titulo}</td>
                  <td>{mensaje}</td>
                  <td>{formatoFecha(fecha)}</td>
                  <td>
                    <span className={`status ${leida ? "leido" : "no-leido"}`}>
                      {leida ? "Leído" : "No leído"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Modal detalle */}
        {editarVisible && notificacionActiva && (
          <div className="modal-overlay" onClick={cerrarModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>{notificacionActiva.titulo}</h2>
              <p>{notificacionActiva.mensaje}</p>
              <small>{formatoFecha(notificacionActiva.fecha)}</small>
              <div className="modal-buttons">
                <button className="btn-guardar" onClick={cerrarModal}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default NotificacionesDonador;
