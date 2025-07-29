import React, { useEffect, useState } from "react";
import RefugioHeader from "../../../components/RefugioHeader";
import {
  FiAlertTriangle,
  FiDollarSign,
  FiHome,
  FiUsers,
  FiBox,
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

  useEffect(() => {
    // Simulación de datos para el dashboard
    const fetchDashboardData = async () => {
      try {
        // Datos de donaciones (ejemplo)
        const donacionesResponse = await fetch(
          "http://127.0.0.1:8000/api/refugio/donaciones/"
        );
        const donacionesData = await donacionesResponse.json();
        setDonaciones(donacionesData.slice(0, 5)); // Mostrar solo las 5 más recientes

        // Estadísticas del refugio (ejemplo)
        setEstadisticas({
          donacionesRecibidas: 42,
          beneficiariosAtendidos: 89,
          voluntariosActivos: 12,
          necesidadesUrgentes: [
            "Alimentos no perecederos",
            "Productos de higiene personal",
            "Ropa de abrigo",
            "Medicamentos básicos",
            "Materiales de limpieza",
          ],
        });
      } catch (error) {
        console.error("Error cargando datos del dashboard:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <>
      <RefugioHeader />
      <main className="dashboard-container">
        <h1>Panel de Control del Refugio</h1>

        {/* Sección de estadísticas */}
        <section className="estadisticas-section">
          <h2>Estadísticas Generales</h2>
          <div className="estadisticas-grid">
            <div className="estadistica-card">
              <FiDollarSign size={24} color="#e74c3c" />
              <h3>Donaciones Recibidas</h3>
              <p className="valor">{estadisticas.donacionesRecibidas}</p>
              <p className="periodo">este mes</p>
            </div>

            <div className="estadistica-card">
              <FiHome size={24} color="#e74c3c" />
              <h3>Beneficiarios Atendidos</h3>
              <p className="valor">{estadisticas.beneficiariosAtendidos}</p>
              <p className="periodo">actualmente</p>
            </div>

            <div className="estadistica-card">
              <FiUsers size={24} color="#e74c3c" />
              <h3>Voluntarios Activos</h3>
              <p className="valor">{estadisticas.voluntariosActivos}</p>
              <p className="periodo">esta semana</p>
            </div>
          </div>
        </section>

        {/* Sección de necesidades urgentes */}
        <section className="necesidades-section">
          <h2>Necesidades Urgentes</h2>
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
        </section>

        {/* Sección de donaciones recientes */}
        <section className="donaciones-section">
          <h2>Donaciones Recientes</h2>
          {donaciones.length === 0 ? (
            <div className="no-donaciones">No hay donaciones recientes.</div>
          ) : (
            <table className="donaciones-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Donador</th>
                  <th>Tipo</th>
                  <th>Artículos</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {donaciones.map((donacion) => (
                  <tr key={donacion.id}>
                    <td>{new Date(donacion.fecha).toLocaleDateString()}</td>
                    <td>{donacion.donador_nombre || "Anónimo"}</td>
                    <td>{donacion.tipo}</td>
                    <td>{donacion.articulos || donacion.cantidad}</td>
                    <td>
                      <span
                        className={`estado-badge ${donacion.estado.toLowerCase()}`}
                      >
                        {donacion.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </>
  );
};

export default DashboardRefugio;
