import React, { useState, useEffect } from "react";
import RefugioHeader from "../../../components/RefugioHeader";
import {
  FiBell,
  FiCheck,
  FiAlertCircle,
  FiPackage,
  FiUsers,
  FiSettings,
  FiInbox,
  FiFilter,
  FiChevronDown,
  FiChevronRight,
} from "react-icons/fi";
import "./NotificacionesRefugio.css";

const NotificacionesRefugio = () => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState("todas");
  const [expandidas, setExpandidas] = useState({});

  useEffect(() => {
    const cargarNotificaciones = async () => {
      try {
        const res = await fetch(
          "http://127.0.0.1:8000/api/notificaciones/notifiaciones/"
        );
        if (!res.ok) throw new Error("Error al cargar notificaciones");
        const data = await res.json();
        const notifs = (data.results || data).map((notif) => ({
          id: notif.id,
          tipo: notif.tipo || "sistema",
          titulo: notif.titulo || "Notificación",
          mensaje: notif.mensaje,
          fecha: notif.fecha ? new Date(notif.fecha) : new Date(),
          leida: notif.leido || false,
          urgente: notif.urgente || false,
          detalles: notif.detalles || "No hay detalles adicionales",
        }));
        setNotificaciones(notifs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    cargarNotificaciones();
  }, []);

  const toggleExpandida = (id) => {
    setExpandidas((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const marcarComoLeida = async (id) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/notificaciones/notificaciones/${id}/`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ leido: true }),
        }
      );
      if (!res.ok) throw new Error("No se pudo marcar como leída");

      setNotificaciones((prev) =>
        prev.map((n) => (n.id === id ? { ...n, leida: true } : n))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const marcarTodasComoLeidas = async () => {
    const sinLeer = notificaciones.filter((n) => !n.leida);
    try {
      await Promise.all(
        sinLeer.map((n) =>
          fetch(
            `http://127.0.0.1:8000/api/notificaciones/notificaciones/${n.id}/`,
            {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ leido: true }),
            }
          )
        )
      );
      setNotificaciones((prev) => prev.map((n) => ({ ...n, leida: true })));
    } catch (err) {
      setError(err.message);
    }
  };

  const filtrarNotificaciones = () => {
    switch (filtro) {
      case "sin_leer":
        return notificaciones.filter((n) => !n.leida);
      case "urgentes":
        return notificaciones.filter((n) => n.urgente);
      case "donaciones":
        return notificaciones.filter((n) => n.tipo === "donacion");
      default:
        return notificaciones;
    }
  };

  const sinLeer = notificaciones.filter((n) => !n.leida).length;
  const filtradas = filtrarNotificaciones();

  if (error) {
    return (
      <div className="error-container">
        <RefugioHeader />
        <div className="error-content">
          <FiAlertCircle size={48} />
          <h2>Error al cargar notificaciones</h2>
          <p>{error}</p>
          <button
            className="btn-primary"
            onClick={() => window.location.reload()}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <RefugioHeader />
      <div className="donaciones-container">
        <header className="donaciones-header">
          <div className="header-title">
            <h1>Notificaciones</h1>
            {sinLeer > 0 && (
              <span className="contador-notificaciones">{sinLeer}</span>
            )}
          </div>
          <button
            className="boton-primary"
            onClick={marcarTodasComoLeidas}
            disabled={sinLeer === 0}
          >
            <FiCheck /> Marcar todas como leídas
          </button>
        </header>

        <div className="filtros">
          <span>Filtrar por:</span>
          <div className="filtros-opciones">
            {["todas", "sin_leer", "urgentes", "donaciones"].map((op) => (
              <button
                key={op}
                className={`filtro-btn ${filtro === op ? "active" : ""}`}
                onClick={() => setFiltro(op)}
              >
                {op === "todas" && "Todas"}
                {op === "sin_leer" && "Sin leer"}
                {op === "urgentes" && "Urgentes"}
                {op === "donaciones" && "Donaciones"}
              </button>
            ))}
          </div>
        </div>

        <section className="notificaciones-content">
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Cargando notificaciones...</p>
            </div>
          ) : filtradas.length === 0 ? (
            <div className="no-notificaciones">
              <FiInbox size={48} />
              <h3>No hay notificaciones</h3>
              <p>No tienes notificaciones en este momento</p>
            </div>
          ) : (
            <ul className="notificaciones-list">
              {filtradas.map((n) => (
                <NotificacionItem
                  key={n.id}
                  data={n}
                  expandida={expandidas[n.id]}
                  onToggleExpand={toggleExpandida}
                  onMarkAsRead={marcarComoLeida}
                />
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
};

const NotificacionItem = ({
  data,
  expandida,
  onToggleExpand,
  onMarkAsRead,
}) => {
  const getIcono = () => {
    switch (data.tipo) {
      case "donacion":
        return <FiPackage className="icono-donacion" />;
      case "voluntario":
        return <FiUsers className="icono-voluntario" />;
      case "sistema":
        return <FiSettings className="icono-sistema" />;
      default:
        return <FiBell className="icono-default" />;
    }
  };

  const formatFecha = (fecha) => {
    const hoy = new Date();
    const notif = new Date(fecha);
    if (notif.toDateString() === hoy.toDateString()) {
      return `Hoy a las ${notif.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    }
    const ayer = new Date(hoy);
    ayer.setDate(hoy.getDate() - 1);
    if (notif.toDateString() === ayer.toDateString()) {
      return `Ayer a las ${notif.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    }
    return notif.toLocaleDateString("es-MX", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <li
      className={`notificacion-card ${data.leida ? "" : "no-leida"} ${
        data.urgente ? "urgente" : ""
      }`}
    >
      <div
        className="notificacion-header"
        onClick={() => onToggleExpand(data.id)}
      >
        <div className="notificacion-icono">
          {getIcono()}
          {data.urgente && <FiAlertCircle className="urgente-badge" />}
        </div>
        <div className="notificacion-info">
          <h3>{data.titulo}</h3>
          <p className="notificacion-mensaje">{data.mensaje}</p>
          <div className="notificacion-meta">
            <span className="notificacion-fecha">
              {formatFecha(data.fecha)}
            </span>
            {!data.leida && (
              <button
                className="marcar-leida-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onMarkAsRead(data.id);
                }}
              >
                Marcar como leída
              </button>
            )}
          </div>
        </div>
        <div className="expandir-icono">
          {expandida ? <FiChevronDown /> : <FiChevronRight />}
        </div>
      </div>
      {expandida && (
        <div className="notificacion-detalles">
          <p>{data.detalles}</p>
          <div className="detalles-acciones">
            <button className="btn-primary">
              {data.tipo === "donacion"
                ? "Ver donación"
                : data.tipo === "voluntario"
                ? "Ver perfil"
                : "Más información"}
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default NotificacionesRefugio;
