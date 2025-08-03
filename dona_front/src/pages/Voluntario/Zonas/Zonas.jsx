import React, { useEffect, useState } from "react";
import VoluntarioHeader from "../../../components/VoluntarioHeader";
import { Home, MapPin } from "lucide-react";
import "./Zonas.css";

const Zonas = () => {
  const [zonas, setZonas] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [zonasRes, ubicacionesRes] = await Promise.all([
          fetch("http://localhost:8000/api/zonas/zonas/"),
          fetch("http://localhost:8000/api/zonas/ubicaciones/"),
        ]);

        if (!zonasRes.ok) throw new Error("Error al obtener zonas");
        if (!ubicacionesRes.ok) throw new Error("Error al obtener ubicaciones");

        const zonasData = await zonasRes.json();
        const ubicacionesData = await ubicacionesRes.json();

        setZonas(zonasData.results || zonasData);
        setUbicaciones(ubicacionesData.results || ubicacionesData);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const obtenerUbicacionesPorZona = (zonaId) => {
    return ubicaciones.filter((ubi) => Number(ubi.zona) === Number(zonaId));
  };

  return (
    <>
      <VoluntarioHeader />
      <main className="donaciones-container">
        <div className="donaciones-header">
          <h1>Zonas y Ubicaciones de Refugios</h1>
          <div className="filtros">
            <div className="stat-card">
              <Home size={24} className="info-icon" />
              <span>{zonas.length} Zonas</span>
            </div>
            <div className="stat-card">
              <MapPin size={24} className="info-icon" />
              <span>{ubicaciones.length} Ubicaciones</span>
            </div>
          </div>
        </div>

        <div className="no-donaciones">
          <MapPin size={36} className="info-icon" />
          <p>Conoce los refugios disponibles en cada zona para ayudar mejor.</p>
        </div>

        {loading ? (
          <div className="loading">Cargando información de zonas...</div>
        ) : (
          <div className="donaciones-grid">
            {zonas.map((zona) => {
              const ubicacionesZona = obtenerUbicacionesPorZona(zona.id);

              return (
                <div key={zona.id} className="donacion-card">
                  <div className="donacion-header">
                    <h3>{zona.nombre}</h3>
                    <div className="estado-badge disponible">
                      <span className="resource-count">
                        <MapPin size={16} /> {ubicacionesZona.length}
                      </span>
                    </div>
                  </div>

                  <div className="donacion-body">
                    <div className="donacion-info">
                      <h4>Ubicaciones de refugios</h4>
                      {ubicacionesZona.length === 0 ? (
                        <div className="no-resources">
                          No hay ubicaciones registradas en esta zona
                        </div>
                      ) : (
                        <ul className="resources-list">
                          {ubicacionesZona.map((ubicacion) => (
                            <li key={ubicacion.id} className="info-item">
                              <div>
                                <h5>{ubicacion.nombre || "Refugio"}</h5>
                                <p>{ubicacion.direccion}</p>
                                <div className="resource-meta">
                                  {ubicacion.capacidad && (
                                    <span>
                                      Capacidad: {ubicacion.capacidad}
                                    </span>
                                  )}
                                  {ubicacion.contacto && (
                                    <span>Contacto: {ubicacion.contacto}</span>
                                  )}
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
};

export default Zonas;
