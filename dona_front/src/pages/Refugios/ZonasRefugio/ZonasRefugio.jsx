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
      <main className="zonas-refugios-container">
        <div className="zonas-header">
          <h1>Zonas de Refugios para Personas</h1>
          <div className="stats-container">
            <div className="stat-card">
              <Home size={24} className="stat-icon" />
              <span>{zonas.length} Zonas</span>
            </div>
            <div className="stat-card">
              <Utensils size={24} className="stat-icon" />
              <span>{restaurantes.length} Restaurantes</span>
            </div>
            <div className="stat-card">
              <Users size={24} className="stat-icon" />
              <span>{voluntarios.length} Voluntarios</span>
            </div>
          </div>
        </div>

        <div className="motivational-message">
          <Users size={36} className="icon" />
          <p>Juntos podemos ayudar a más personas que lo necesitan.</p>
        </div>

        <div className="zonas-wrapper">
          {zonas.length === 0 ? (
            <div className="loading-message">
              Cargando información de zonas...
            </div>
          ) : (
            zonas.map((zona) => {
              const { restaurantesZona, voluntariosZona } =
                obtenerRecursosPorZona(zona.id);

              return (
                <div key={zona.id} className="zona-card">
                  <div className="zona-header">
                    <h2>{zona.nombre}</h2>
                    <div className="counts-container">
                      <span className="resource-count">
                        <Utensils size={16} /> {restaurantesZona.length}
                      </span>
                      <span className="resource-count">
                        <Users size={16} /> {voluntariosZona.length}
                      </span>
                    </div>
                  </div>

                  <div className="resources-section">
                    <h3>Restaurantes donadores</h3>
                    {restaurantesZona.length === 0 ? (
                      <div className="no-resources">
                        No hay restaurantes registrados en esta zona
                      </div>
                    ) : (
                      <ul className="resources-list">
                        {restaurantesZona.map((restaurante) => (
                          <li key={restaurante.id} className="resource-item">
                            <div className="resource-info">
                              <h4>{restaurante.nombre}</h4>
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

                    <h3>Voluntarios disponibles</h3>
                    {voluntariosZona.length === 0 ? (
                      <div className="no-resources">
                        No hay voluntarios registrados en esta zona
                      </div>
                    ) : (
                      <ul className="resources-list">
                        {voluntariosZona.map((voluntario) => (
                          <li key={voluntario.id} className="resource-item">
                            <div className="resource-info">
                              <h4>{voluntario.nombre}</h4>
                              <p>Disponibilidad: {voluntario.disponibilidad}</p>
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
              );
            })
          )}
        </div>
      </main>
    </>
  );
};

export default ZonasRefugios;
