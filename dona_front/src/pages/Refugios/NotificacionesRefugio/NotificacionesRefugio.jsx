//Angel Alejandro Chavez Castillon

import React, { useState, useEffect } from "react";
import RefugioHeader from "../../../components/RefugioHeader";
import {
  FiBell,
  FiCheck,
  FiAlertCircle,
  FiPackage,
  FiCalendar,
  FiUsers,
  FiSettings,
  FiInbox,
  FiFilter,
  FiChevronDown,
  FiChevronRight,
} from "react-icons/fi";
import "./NotificacionesRefugio.css";

const NotificacionesRefugio = () => {
  const [state, setState] = useState({
    notificaciones: [],
    loading: true,
    error: null,
    filtro: "todas",
    expandidas: {},
  });

  // Cargar notificaciones desde la API
  useEffect(() => {
    const cargarNotificaciones = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/notificaciones/notifiaciones/"
        );

        if (!response.ok) {
          throw new Error("Error al cargar notificaciones");
        }

        const data = await response.json();
        const notificacionesAPI = data.results || data;

        // Mapear datos de la API al formato esperado por el componente
        const notificacionesFormateadas = notificacionesAPI.map((notif) => ({
          id: notif.id,
          tipo: notif.tipo || "sistema",
          titulo: notif.titulo || "Notificación",
          mensaje: notif.mensaje,
          fecha: notif.fecha ? new Date(notif.fecha) : new Date(),
          leida: notif.leido || false,
          urgente: notif.urgente || false,
          detalles: notif.detalles || "No hay detalles adicionales",
        }));

        setState((prev) => ({
          ...prev,
          notificaciones: notificacionesFormateadas,
          loading: false,
        }));
      } catch (err) {
        setState((prev) => ({
          ...prev,
          error: err.message,
          loading: false,
        }));
      }
    };

    cargarNotificaciones();
  }, []);

  // Funciones de ayuda
  const toggleExpandida = (id) => {
    setState((prev) => ({
      ...prev,
      expandidas: {
        ...prev.expandidas,
        [id]: !prev.expandidas[id],
      },
    }));
  };

  const marcarComoLeida = async (id) => {
    try {
      // Actualizar en la API
      const response = await fetch(
        `http://127.0.0.1:8000/api/notificaciones/notifiaciones/${id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ leido: true }),
        }
      );

      if (!response.ok) throw new Error("Error al marcar como leída");

      // Actualizar en el estado local
      setState((prev) => ({
        ...prev,
        notificaciones: prev.notificaciones.map((notif) =>
          notif.id === id ? { ...notif, leida: true } : notif
        ),
      }));
    } catch (err) {
      console.error("Error:", err);
      setState((prev) => ({ ...prev, error: err.message }));
    }
  };

  const marcarTodasComoLeidas = async () => {
    try {
      // Actualizar todas en la API
      const notificacionesSinLeer = state.notificaciones.filter(
        (n) => !n.leida
      );
      await Promise.all(
        notificacionesSinLeer.map((notif) =>
          fetch(
            `http://127.0.0.1:8000/api/notificaciones/notifiaciones/${notif.id}/`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ leido: true }),
            }
          )
        )
      );

      // Actualizar en el estado local
      setState((prev) => ({
        ...prev,
        notificaciones: prev.notificaciones.map((notif) => ({
          ...notif,
          leida: true,
        })),
      }));
    } catch (err) {
      console.error("Error:", err);
      setState((prev) => ({ ...prev, error: err.message }));
    }
  };

  // Filtrado
  const notificacionesFiltradas = state.notificaciones.filter((notif) => {
    if (state.filtro === "sin_leer") return !notif.leida;
    if (state.filtro === "urgentes") return notif.urgente;
    if (state.filtro === "donaciones") return notif.tipo === "donacion";
    return true;
  });

  const sinLeer = state.notificaciones.filter((n) => !n.leida).length;

  // Renderizado condicional
  if (state.error) {
    return (
      <div className="error-container">
        <RefugioHeader />
        <div className="error-content">
          <FiAlertCircle size={48} />
          <h2>Error al cargar notificaciones</h2>
          <p>{state.error}</p>
          <button
            className="reintentar-btn"
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
      <div className="notificaciones-wrapper">
        <main className="notificaciones-container">
          {/* Encabezado */}
          <header className="notificaciones-header">
            <div className="header-title">
              <FiBell className="icono-titulo" />
              <h1>Notificaciones</h1>
              {sinLeer > 0 && (
                <span className="contador-notificaciones">{sinLeer}</span>
              )}
            </div>

            <button
              className="marcar-todas-btn"
              onClick={marcarTodasComoLeidas}
              disabled={sinLeer === 0}
            >
              <FiCheck /> Marcar todas como leídas
            </button>
          </header>

          {/* Filtros */}
          <div className="filtros-container">
            <div className="filtros-titulo">
              <FiFilter /> Filtrar por:
            </div>
            <div className="filtros-opciones">
              {["todas", "sin_leer", "urgentes", "donaciones"].map((opcion) => (
                <button
                  key={opcion}
                  className={`filtro-btn ${
                    state.filtro === opcion ? "active" : ""
                  }`}
                  onClick={() =>
                    setState((prev) => ({ ...prev, filtro: opcion }))
                  }
                >
                  {opcion === "todas" && "Todas"}
                  {opcion === "sin_leer" && "Sin leer"}
                  {opcion === "urgentes" && "Urgentes"}
                  {opcion === "donaciones" && "Donaciones"}
                </button>
              ))}
            </div>
          </div>

          {/* Contenido principal */}
          <section className="notificaciones-content">
            {state.loading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Cargando notificaciones...</p>
              </div>
            ) : notificacionesFiltradas.length === 0 ? (
              <div className="empty-state">
                <FiInbox size={48} />
                <h3>No hay notificaciones</h3>
                <p>
                  {state.filtro === "todas"
                    ? "No tienes notificaciones en este momento"
                    : "No hay notificaciones con este filtro"}
                </p>
                {state.filtro !== "todas" && (
                  <button
                    className="reset-filtro-btn"
                    onClick={() =>
                      setState((prev) => ({ ...prev, filtro: "todas" }))
                    }
                  >
                    Mostrar todas
                  </button>
                )}
              </div>
            ) : (
              <ul className="notificaciones-list">
                {notificacionesFiltradas.map((notif) => (
                  <NotificacionItem
                    key={notif.id}
                    data={notif}
                    expandida={state.expandidas[notif.id]}
                    onToggleExpand={toggleExpandida}
                    onMarkAsRead={marcarComoLeida}
                  />
                ))}
              </ul>
            )}
          </section>
        </main>
      </div>
    </>
  );
};

// Componente de notificación individual
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
    const notifDate = new Date(fecha);

    if (notifDate.toDateString() === hoy.toDateString()) {
      return `Hoy a las ${notifDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    }

    const ayer = new Date(hoy);
    ayer.setDate(ayer.getDate() - 1);
    if (notifDate.toDateString() === ayer.toDateString()) {
      return `Ayer a las ${notifDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    }

    return notifDate.toLocaleDateString("es-MX", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <li
      className={`notificacion-item ${data.leida ? "" : "no-leida"} ${
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
            <button className="accion-principal">
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
