import React, { useEffect, useState } from "react";
import VoluntarioHeader from "../../../components/VoluntarioHeader";
import { CheckCircle, Package, Truck, Calendar } from "lucide-react";
import "./HistorialDona.css";

const HistorialDona = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarDatos = async () => {
    try {
      const [solicRes, pubRes, sucRes] = await Promise.all([
        fetch("http://127.0.0.1:8000/api/solicitudes/solicitudes/"),
        fetch("http://127.0.0.1:8000/api/donaciones/publicaciones/"),
        fetch("http://127.0.0.1:8000/api/donaciones/sucursales/"),
      ]);

      if (!solicRes.ok) throw new Error("Error al obtener solicitudes");
      if (!pubRes.ok) throw new Error("Error al obtener publicaciones");
      if (!sucRes.ok) throw new Error("Error al obtener sucursales");

      const [solicData, pubData, sucData] = await Promise.all([
        solicRes.json(),
        pubRes.json(),
        sucRes.json(),
      ]);

      const solicitudesArray = solicData.results || solicData;
      const publicacionesArray = pubData.results || pubData;
      const sucursalesArray = sucData.results || sucData;

      const solicitudesConDetalles = solicitudesArray.map((solicitud) => {
        const publicacion =
          publicacionesArray.find((p) => p.id === solicitud.publicacion) ||
          null;

        let receptorSucursal = null;

        if (
          typeof solicitud.receptor === "object" &&
          solicitud.receptor !== null
        ) {
          receptorSucursal = solicitud.receptor;
        } else {
          receptorSucursal =
            sucursalesArray.find((s) => s.id === solicitud.receptor) || null;
        }

        return {
          ...solicitud,
          publicacionDetalle: publicacion,
          receptorDetalle: receptorSucursal,
        };
      });

      const solicitudesCompletadas = solicitudesConDetalles.filter(
        (solicitud) => solicitud.estado.toLowerCase() === "completada"
      );

      setSolicitudes(solicitudesCompletadas);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <>
      <VoluntarioHeader />
      <main className="donaciones-container">
        <div className="donaciones-header">
          <h1>Historial de Donaciones Completadas</h1>
          <div className="stats-container">
            <div className="stat-card">
              <CheckCircle size={24} className="stat-icon" />
              <span>{solicitudes.length} Donaciones completadas</span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading">
            <p>Cargando historial de donaciones...</p>
          </div>
        ) : error ? (
          <div className="error">
            <p>{error}</p>
          </div>
        ) : solicitudes.length === 0 ? (
          <div className="no-donaciones">
            <Package size={48} />
            <p>No hay donaciones completadas registradas</p>
          </div>
        ) : (
          <div className="donaciones-grid">
            {solicitudes.map((solicitud) => (
              <div key={solicitud.id} className="donacion-card">
                <div className="donacion-header">
                  <h3>{solicitud.publicacionDetalle?.titulo || "N/A"}</h3>
                  <span className="estado-badge completada">
                    <CheckCircle size={16} /> Completada
                  </span>
                </div>

                <div className="donacion-body">
                  <div className="donacion-info">
                    <div className="info-item">
                      <Truck size={18} className="info-icon" />
                      <span>
                        <strong>Receptor:</strong>{" "}
                        {solicitud.receptorDetalle?.nombre || "N/A"}
                      </span>
                    </div>
                    {solicitud.publicacionDetalle?.fecha_caducidad && (
                      <div className="info-item">
                        <Calendar size={18} className="info-icon" />
                        <span>
                          <strong>Fecha:</strong>{" "}
                          {new Date(
                            solicitud.publicacionDetalle.fecha_caducidad
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    {solicitud.comentarios && (
                      <div className="info-item">
                        <strong>Comentarios:</strong> {solicitud.comentarios}
                      </div>
                    )}
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

export default HistorialDona;
