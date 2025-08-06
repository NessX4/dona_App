/* Angel Alejandro Chavez Castillon A */

import React, { useEffect, useState } from "react";
import RefugioHeader from "../../../components/RefugioHeader";
import { Home, Utensils, Users } from "lucide-react";
import "./ZonasRefugio.css";

const ZonasRefugios = () => {
  const [zonas, setZonas] = useState([]);
  const [restaurantes, setRestaurantes] = useState([]);
  const [voluntarios, setVoluntarios] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/zonas/zonas/")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener zonas");
        return res.json();
      })
      .then(setZonas)
      .catch((error) => console.error("Error al cargar zonas:", error));

    fetch("http://localhost:8000/api/usuarios/receptores/")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener restaurantes");
        return res.json();
      })
      .then((data) => {
        const activos = data.filter((r) => r.usuario?.activo);
        setRestaurantes(activos);
      })
      .catch((error) => console.error("Error al cargar restaurantes:", error));

    fetch("http://localhost:8000/api/usuarios/voluntarios/")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener voluntarios");
        return res.json();
      })
      .then((data) => {
        const activos = data.filter((v) => v.usuario?.activo);
        setVoluntarios(activos);
      })
      .catch((error) => console.error("Error al cargar voluntarios:", error));
  }, []);

  const obtenerRecursosPorZona = (zonaId) => {
    const restaurantesZona = restaurantes.filter(
      (r) => Number(r.zona) === Number(zonaId)
    );
    const voluntariosZona = voluntarios.filter(
      (v) => Number(v.zona) === Number(zonaId)
    );
    return { restaurantesZona, voluntariosZona };
  };

  return (
    <>
      <RefugioHeader />
      <main className="donaciones-container">
        <div className="donaciones-header">
          <h1>Zonas de Refugios para Personas</h1>
          <div className="filtros">
            <div className="stat-card">
              <Home size={24} className="info-icon" />
              <span>{zonas.length} Zonas</span>
            </div>
            <div className="stat-card">
              <Utensils size={24} className="info-icon" />
              <span>{restaurantes.length} Restaurantes</span>
            </div>
            <div className="stat-card">
              <Users size={24} className="info-icon" />
              <span>{voluntarios.length} Voluntarios</span>
            </div>
          </div>
        </div>

        <div className="no-donaciones">
          <Users size={36} className="info-icon" />
          <p>Juntos podemos ayudar a más personas que lo necesitan.</p>
        </div>

        <div className="donaciones-grid">
          {zonas.length === 0 ? (
            <div className="loading">Cargando información de zonas...</div>
          ) : (
            zonas.map((zona) => {
              const { restaurantesZona, voluntariosZona } =
                obtenerRecursosPorZona(zona.id);

              return (
                <div key={zona.id} className="donacion-card">
                  <div className="donacion-header">
                    <h3>{zona.nombre}</h3>
                    <div className="estado-badge disponible">
                      <span className="resource-count">
                        <Utensils size={16} /> {restaurantesZona.length}
                      </span>
                      <span className="resource-count">
                        <Users size={16} /> {voluntariosZona.length}
                      </span>
                    </div>
                  </div>

                  <div className="donacion-body">
                    <div className="donacion-info">
                      <h4>Restaurantes donadores</h4>
                      {restaurantesZona.length === 0 ? (
                        <div className="no-resources">
                          No hay restaurantes registrados en esta zona.
                        </div>
                      ) : (
                        <ul className="resources-list">
                          {restaurantesZona.map((r) => (
                            <li key={r.id} className="info-item">
                              <div>
                                <h5>{r.nombre_lugar}</h5>
                                <p>{r.direccion}</p>
                                <div className="resource-meta">
                                  <span>
                                    Horario: {r.horario_apertura} - {r.horario_cierre}
                                  </span>
                                  <span>Contacto: {r.telefono}</span>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}

                      <h4>Voluntarios disponibles</h4>
                      {voluntariosZona.length === 0 ? (
                        <div className="no-resources">
                          No hay voluntarios registrados en esta zona.
                        </div>
                      ) : (
                        <ul className="resources-list">
                          {voluntariosZona.map((v) => (
                            <li key={v.id} className="info-item">
                              <div>
                                <h5>{v.usuario?.nombre}</h5>
                                <div className="resource-meta">
                                  <span>Contacto: {v.telefono}</span>
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
            })
          )}
        </div>
      </main>
    </>
  );
};

export default ZonasRefugios;
