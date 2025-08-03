import React, { useEffect, useState } from "react";
import VoluntarioHeader from "../../../components/VoluntarioHeader";
import { Bell, BellOff, CheckCircle, AlertCircle } from "lucide-react";
import "./Notificaciones.css";

const Notificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState("todas");

  const formatoFecha = (fecha) => {
    return new Date(fecha).toLocaleString("es-MX", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const resNoti = await fetch(
          "http://127.0.0.1:8000/api/notificaciones/notifiaciones/"
        );
        if (!resNoti.ok) throw new Error("Error al cargar notificaciones");
        const dataNoti = await resNoti.json();
        setNotificaciones(dataNoti.results || dataNoti);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  const filtrarNotificaciones = () => {
    if (filtro === "todas") return notificaciones;
    return notificaciones.filter((noti) =>
      filtro === "leidas" ? noti.leido : !noti.leido
    );
  };

  const notificacionesFiltradas = filtrarNotificaciones();

  return (
    <>
      <VoluntarioHeader />
      <main className="donaciones-container">
        <div className="notificaciones-header">
          <h1>Notificaciones</h1>
          <div className="filtros">
            <button
              className={`filtro-btn ${filtro === "todas" ? "active" : ""}`}
              onClick={() => setFiltro("todas")}
            >
              <Bell size={18} /> Todas
            </button>
            <button
              className={`filtro-btn ${filtro === "leidas" ? "active" : ""}`}
              onClick={() => setFiltro("leidas")}
            >
              <CheckCircle size={18} /> Leídas
            </button>
            <button
              className={`filtro-btn ${filtro === "no-leidas" ? "active" : ""}`}
              onClick={() => setFiltro("no-leidas")}
            >
              <AlertCircle size={18} /> No leídas
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading">
            <p>Cargando notificaciones...</p>
          </div>
        ) : error ? (
          <div className="error">
            <p>{error}</p>
          </div>
        ) : notificacionesFiltradas.length === 0 ? (
          <div className="no-notificaciones">
            <BellOff size={48} />
            <p>No hay notificaciones disponibles</p>
          </div>
        ) : (
          <div className="notificaciones-list">
            {notificacionesFiltradas.map((noti) => (
              <div
                key={noti.id}
                className={`notificacion-card ${
                  noti.leido ? "leida" : "no-leida"
                }`}
              >
                <div className="notificacion-content">
                  <div className="notificacion-icon">
                    {noti.leido ? (
                      <CheckCircle size={24} />
                    ) : (
                      <AlertCircle size={24} />
                    )}
                  </div>
                  <div className="notificacion-details">
                    <p className="notificacion-mensaje">{noti.mensaje}</p>
                    <div className="notificacion-meta">
                      <span className="notificacion-fecha">
                        {noti.fecha ? formatoFecha(noti.fecha) : "N/A"}
                      </span>
                      <span className="notificacion-status">
                        {noti.leido ? "Leído" : "No leído"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default Notificaciones;
