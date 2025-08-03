/*Angel Alejandro Chavez Castillon A*/

import React, { useEffect, useState } from "react";
import RefugioHeader from "../../../components/RefugioHeader";
import { Home, Utensils, Users } from "lucide-react";
import "./ZonasRefugio.css";

const ZonasRefugios = () => {
  const [zonas, setZonas] = useState([]);
  const [restaurantes, setRestaurantes] = useState([]);
  const [voluntarios, setVoluntarios] = useState([]);

  useEffect(() => {
    // Obtener zonas
    fetch("http://localhost:8000/api/zonas/zonas/")
      .then((response) => {
        if (!response.ok) throw new Error("Error al obtener zonas");
        return response.json();
      })
      .then((data) => setZonas(data))
      .catch((error) => console.error("Error al cargar zonas:", error));

    // Obtener restaurantes donadores
    fetch("http://localhost:8000/api/restaurantes/")
      .then((response) => {
        if (!response.ok) throw new Error("Error al obtener restaurantes");
        return response.json();
      })
      .then((data) => setRestaurantes(data))
      .catch((error) => console.error("Error al cargar restaurantes:", error));

    // Obtener voluntarios
    fetch("http://localhost:8000/api/voluntarios/")
      .then((response) => {
        if (!response.ok) throw new Error("Error al obtener voluntarios");
        return response.json();
      })
      .then((data) => setVoluntarios(data))
      .catch((error) => console.error("Error al cargar voluntarios:", error));
  }, []);

  const obtenerRecursosPorZona = (zonaId) => {
    const restaurantesZona = restaurantes.filter(
      (rest) => Number(rest.zona) === Number(zonaId)
    );
    const voluntariosZona = voluntarios.filter(
      (vol) => Number(vol.zona) === Number(zonaId)
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
                          No hay restaurantes registrados en esta zona
                        </div>
                      ) : (
                        <ul className="resources-list">
                          {restaurantesZona.map((restaurante) => (
                            <li key={restaurante.id} className="info-item">
                              <div>
                                <h5>{restaurante.nombre}</h5>
                                <p>{restaurante.direccion}</p>
                                <div className="resource-meta">
                                  <span>Horario: {restaurante.horario}</span>
                                  <span>Contacto: {restaurante.telefono}</span>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}

                      <h4>Voluntarios disponibles</h4>
                      {voluntariosZona.length === 0 ? (
                        <div className="no-resources">
                          No hay voluntarios registrados en esta zona
                        </div>
                      ) : (
                        <ul className="resources-list">
                          {voluntariosZona.map((voluntario) => (
                            <li key={voluntario.id} className="info-item">
                              <div>
                                <h5>{voluntario.nombre}</h5>
                                <p>
                                  Disponibilidad: {voluntario.disponibilidad}
                                </p>
                                <div className="resource-meta">
                                  <span>
                                    Habilidades: {voluntario.habilidades}
                                  </span>
                                  <span>Contacto: {voluntario.telefono}</span>
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
