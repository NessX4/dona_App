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
  // Estado optimizado
  const [state, setState] = useState({
    notificaciones: [],
    loading: true,
    error: null,
    filtro: "todas",
    expandidas: {},
  });

  // Datos de ejemplo mejorados
  const notificacionesEjemplo = [
    {
      id: 1,
      tipo: "donacion",
      titulo: "Nueva donación recibida",
      mensaje:
        "Has recibido 50kg de alimentos no perecederos de Supermercado Solidario",
      fecha: new Date(),
      leida: false,
      urgente: true,
      detalles:
        "Contiene: 20kg de arroz, 15kg de frijol, 10kg de azúcar y 5kg de harina. Puedes recogerla en nuestra bodega central.",
    },
    {
      id: 2,
      tipo: "voluntario",
      titulo: "Nuevo voluntario asignado",
      mensaje: "María González se ha unido como voluntaria a tu refugio",
      fecha: new Date(Date.now() - 86400000),
      leida: true,
      urgente: false,
      detalles:
        "Especialidad: Logística\nDisponibilidad: Tardes\nContacto: maria.g@example.com",
    },
    {
      id: 3,
      tipo: "sistema",
      titulo: "Actualización disponible",
      mensaje: "Nueva versión 2.1.0 del sistema de gestión",
      fecha: new Date(Date.now() - 172800000),
      leida: false,
      urgente: false,
      detalles:
        "Nuevas características:\n- Dashboard mejorado\n- Exportación de reportes\n- Corrección de errores",
    },
  ];

  // Carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setState((prev) => ({
        ...prev,
        notificaciones: notificacionesEjemplo,
        loading: false,
      }));
    }, 800);

    return () => clearTimeout(timer);
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

  const marcarComoLeida = (id) => {
    setState((prev) => ({
      ...prev,
      notificaciones: prev.notificaciones.map((notif) =>
        notif.id === id ? { ...notif, leida: true } : notif
      ),
    }));
  };

  const marcarTodasComoLeidas = () => {
    setState((prev) => ({
      ...prev,
      notificaciones: prev.notificaciones.map((notif) => ({
        ...notif,
        leida: true,
      })),
    }));
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
