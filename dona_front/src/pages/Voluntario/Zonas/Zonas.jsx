import React, { useEffect, useState } from "react";
import "./Zonas.css";
import VoluntarioHeader from "../../../components/VoluntarioHeader";
import { HeartHandshake } from "lucide-react";

const Zonas = () => {
  const [zonas, setZonas] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/zonas/zonas/")
      .then((response) => {
        if (!response.ok) throw new Error("Error al obtener zonas");
        return response.json();
      })
      .then((data) => setZonas(data))
      .catch((error) => console.error("Error al cargar zonas:", error));

    fetch("http://localhost:8000/api/zonas/ubicaciones/")
      .then((response) => {
        if (!response.ok) throw new Error("Error al obtener ubicaciones");
        return response.json();
      })
      .then((data) => setUbicaciones(data))
      .catch((error) => console.error("Error al cargar ubicaciones:", error));
  }, []);

  const obtenerUbicacionesPorZona = (zonaId) => {
    return ubicaciones.filter((ubi) => Number(ubi.zona) === Number(zonaId));
  };

  return (
    <>
      <VoluntarioHeader />
      <main className="container">
        <h1>Conoce las zonas y ubicaciones de refugios</h1>

        <div className="motivational-message">
          <HeartHandshake size={36} className="icon" />
          <p>Tu ayuda transforma vidas. Cada acción cuenta.</p>
        </div>

        <div className="zonas-wrapper">
          {zonas.length === 0 ? (
            <p>Cargando zonas...</p>
          ) : (
            zonas.map((zona) => (
              <div key={zona.id} className="zona-card">
                <h2>{zona.nombre}</h2>
                <ul>
                  {obtenerUbicacionesPorZona(zona.id).length === 0 ? (
                    <li>No hay ubicaciones registradas en esta zona.</li>
                  ) : (
                    obtenerUbicacionesPorZona(zona.id).map((ubicacion) => (
                      <li key={ubicacion.id}>{ubicacion.direccion}</li>
                    ))
                  )}
                </ul>
              </div>
            ))
          )}
        </div>
      </main>
    </>
  );
};

export default Zonas;
