import React, { useEffect, useState } from "react";
import RefugioHeader from "../../../components/RefugioHeader";
import {
  FiPackage,
  FiTruck,
  FiCalendar,
  FiUser,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";
import "./DonacionesDisponibles.css";

const DonacionesDisponibles = () => {
  const [donaciones, setDonaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("todas");

  useEffect(() => {
    const fetchDonaciones = async () => {
      try {
        // Simulación de datos
        const response = await fetch(
          "http://127.0.0.1:8000/api/refugio/donaciones-disponibles/"
        );
        const data = await response.json();
        setDonaciones(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching donations:", error);
        setLoading(false);
      }
    };

    fetchDonaciones();
  }, []);

  const filtrarDonaciones = () => {
    if (filtro === "todas") return donaciones;
    return donaciones.filter(
      (donacion) => donacion.estado.toLowerCase() === filtro
    );
  };

  const donacionesFiltradas = filtrarDonaciones();

  return (
    <>
      <RefugioHeader />
      <main className="donaciones-container">
        <div className="donaciones-header">
          <h1>Donaciones Disponibles</h1>
          <div className="filtros">
            <button
              className={`filtro-btn ${filtro === "todas" ? "active" : ""}`}
              onClick={() => setFiltro("todas")}
            >
              Todas
            </button>
            <button
              className={`filtro-btn ${
                filtro === "disponible" ? "active" : ""
              }`}
              onClick={() => setFiltro("disponible")}
            >
              Disponibles
            </button>
            <button
              className={`filtro-btn ${filtro === "pendiente" ? "active" : ""}`}
              onClick={() => setFiltro("pendiente")}
            >
              Pendientes
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading">
            <p>Cargando donaciones...</p>
          </div>
        ) : donacionesFiltradas.length === 0 ? (
          <div className="no-donaciones">
            <FiPackage size={48} />
            <p>No hay donaciones disponibles</p>
          </div>
        ) : (
          <div className="donaciones-grid">
            {donacionesFiltradas.map((donacion) => (
              <div key={donacion.id} className="donacion-card">
                <div className="donacion-header">
                  <h3>{donacion.tipo}</h3>
                  <span
                    className={`estado-badge ${donacion.estado.toLowerCase()}`}
                  >
                    {donacion.estado === "disponible" ? (
                      <FiCheckCircle size={16} />
                    ) : (
                      <FiClock size={16} />
                    )}
                    {donacion.estado}
                  </span>
                </div>

                <div className="donacion-body">
                  <div className="donacion-info">
                    <div className="info-item">
                      <FiPackage className="info-icon" />
                      <span>
                        {donacion.cantidad} {donacion.unidad || "unidades"}
                      </span>
                    </div>
                    <div className="info-item">
                      <FiCalendar className="info-icon" />
                      <span>
                        Disponible hasta:{" "}
                        {new Date(
                          donacion.fecha_disponibilidad
                        ).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="info-item">
                      <FiUser className="info-icon" />
                      <span>
                        Donante: {donacion.donante_nombre || "Anónimo"}
                      </span>
                    </div>
                    <div className="info-item">
                      <FiTruck className="info-icon" />
                      <span>Ubicación: {donacion.ubicacion}</span>
                    </div>
                  </div>

                  <div className="donacion-descripcion">
                    <p>{donacion.descripcion || "Sin descripción adicional"}</p>
                  </div>
                </div>

                <div className="donacion-actions">
                  <button className="btn-primary">
                    {donacion.estado === "disponible"
                      ? "Solicitar Donación"
                      : "Ver Detalles"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default DonacionesDisponibles;
