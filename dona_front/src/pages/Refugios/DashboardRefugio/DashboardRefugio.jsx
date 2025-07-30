//Angel Alejandro Chavez Castillon

import React, { useEffect, useState } from "react";
import RefugioHeader from "../../../components/RefugioHeader";
import {
  FiAlertTriangle,
  FiDollarSign,
  FiHome,
  FiUsers,
  FiBox,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";
import "./DashboardRefugio.css";

const DashboardRefugio = () => {
  const [donaciones, setDonaciones] = useState([]);
  const [estadisticas, setEstadisticas] = useState({
    donacionesRecibidas: 0,
    beneficiariosAtendidos: 0,
    voluntariosActivos: 0,
    necesidadesUrgentes: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // APIs existentes que ya me has proporcionado
  const API_URLS = {
    solicitudes: "http://127.0.0.1:8000/api/solicitudes/solicitudes/",
    publicaciones: "http://127.0.0.1:8000/api/donaciones/publicaciones/",
    voluntarios: "http://127.0.0.1:8000/api/usuarios/voluntarios/",
    comidas: "http://127.0.0.1:8000/api/donaciones/comidas/",
    categorias: "http://127.0.0.1:8000/api/donaciones/categorias/",
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Obtener donaciones recientes (usando solicitudes completadas)
        const solicitudesRes = await fetch(API_URLS.solicitudes);
        if (!solicitudesRes.ok) throw new Error("Error al cargar solicitudes");
        const solicitudesData = await solicitudesRes.json();
        const solicitudesCompletadas = (
          solicitudesData.results || solicitudesData
        )
          .filter((s) => s.estado.toLowerCase() === "completada")
          .slice(0, 5); // Últimas 5

        // Obtener detalles de las publicaciones asociadas
        const publicacionesRes = await fetch(API_URLS.publicaciones);
        if (!publicacionesRes.ok)
          throw new Error("Error al cargar publicaciones");
        const publicacionesData = await publicacionesRes.json();
        const publicacionesArray =
          publicacionesData.results || publicacionesData;

        // Mapear a formato de donaciones
        const donacionesFormateadas = solicitudesCompletadas.map(
          (solicitud) => {
            const publicacion =
              publicacionesArray.find((p) => p.id === solicitud.publicacion) ||
              {};
            return {
              id: solicitud.id,
              fecha: solicitud.fecha_creacion,
              donador_nombre: publicacion.donante || "Anónimo",
              tipo: "Donación",
              cantidad: publicacion.cantidad || "N/A",
              estado: "Recibido",
            };
          }
        );
        setDonaciones(donacionesFormateadas);

        // Obtener estadísticas de voluntarios
        const voluntariosRes = await fetch(API_URLS.voluntarios);
        if (!voluntariosRes.ok) throw new Error("Error al cargar voluntarios");
        const voluntariosData = await voluntariosRes.json();
        const voluntariosArray = voluntariosData.results || voluntariosData;
        const voluntariosActivos = voluntariosArray.filter(
          (v) => v.disponibilidad && v.disponibilidad.toLowerCase() === "activo"
        ).length;

        // Obtener necesidades urgentes (usando categorías de comidas)
        const categoriasRes = await fetch(API_URLS.categorias);
        if (!categoriasRes.ok) throw new Error("Error al cargar categorías");
        const categoriasData = await categoriasRes.json();
        const categoriasArray = categoriasData.results || categoriasData;

        setEstadisticas({
          donacionesRecibidas: solicitudesCompletadas.length,
          beneficiariosAtendidos: 0, // No hay API de beneficiarios proporcionada
          voluntariosActivos: voluntariosActivos,
          necesidadesUrgentes: categoriasArray.map((c) => c.nombre).slice(0, 3), // Top 3 categorías
        });

        setLoading(false);
      } catch (error) {
        console.error("Error cargando dashboard:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Formatear fecha
  const formatFecha = (date) => {
    if (!date) return "N/A";
    const fecha = new Date(date);
    return fecha.toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Obtener icono según estado
  const getEstadoIcon = (estado) => {
    switch (estado.toLowerCase()) {
      case "recibido":
        return <FiCheckCircle size={14} />;
      case "pendiente":
        return <FiClock size={14} />;
      default:
        return null;
    }
  };

  return (
    <>
      <RefugioHeader />
      <main className="dashboard-container">
        <h1>Panel de Control del Refugio</h1>

        {error && (
          <div className="dashboard-error">
            <FiAlertTriangle size={20} />
            <p>{error}</p>
          </div>
        )}

        {/* Sección de estadísticas */}
        <section className="estadisticas-section">
          <h2>Estadísticas Generales</h2>
          {loading ? (
            <div className="loading-stats">Cargando estadísticas...</div>
          ) : (
            <div className="estadisticas-grid">
              <div className="estadistica-card">
                <FiDollarSign size={24} className="stat-icon" />
                <div>
                  <h3>Donaciones Recibidas</h3>
                  <p className="valor">{estadisticas.donacionesRecibidas}</p>
                  <p className="periodo">este mes</p>
                </div>
              </div>

              <div className="estadistica-card">
                <FiHome size={24} className="stat-icon" />
                <div>
                  <h3>Beneficiarios Atendidos</h3>
                  <p className="valor">{estadisticas.beneficiariosAtendidos}</p>
                  <p className="periodo">actualmente</p>
                </div>
              </div>

              <div className="estadistica-card">
                <FiUsers size={24} className="stat-icon" />
                <div>
                  <h3>Voluntarios Activos</h3>
                  <p className="valor">{estadisticas.voluntariosActivos}</p>
                  <p className="periodo">esta semana</p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Sección de necesidades urgentes */}
        <section className="necesidades-section">
          <h2>Necesidades Prioritarias</h2>
          {loading ? (
            <div className="loading-needs">Cargando necesidades...</div>
          ) : (
            <ul className="necesidades-list">
              {estadisticas.necesidadesUrgentes.map((item, index) => (
                <li key={index} className="necesidad-item">
                  <span className="necesidad-icon">
                    <FiAlertTriangle size={18} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Sección de donaciones recientes */}
        <section className="donaciones-section">
          <h2>Donaciones Recientes</h2>
          {loading ? (
            <div className="loading-donations">Cargando donaciones...</div>
          ) : donaciones.length === 0 ? (
            <div className="no-donaciones">
              <FiBox size={24} />
              <p>No hay donaciones recientes</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="donaciones-table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Donador</th>
                    <th>Tipo</th>
                    <th>Cantidad</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {donaciones.map((donacion) => (
                    <tr key={donacion.id}>
                      <td>{formatFecha(donacion.fecha)}</td>
                      <td>{donacion.donador_nombre}</td>
                      <td>{donacion.tipo}</td>
                      <td>{donacion.cantidad}</td>
                      <td>
                        <span
                          className={`estado-badge ${donacion.estado.toLowerCase()}`}
                        >
                          {getEstadoIcon(donacion.estado)}
                          {donacion.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default DashboardRefugio;
