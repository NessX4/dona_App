// Luna FLores Yamileth Guadalupe
import React, { useEffect, useState } from "react";
import VoluntarioHeader from "../../../components/VoluntarioHeader";
import { HeartHandshake } from "lucide-react";
import "./Sucursales.css";

const Sucursales = () => {
  const [sucursales, setSucursales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const [sucRes, zonasRes] = await Promise.all([
          fetch("http://localhost:8000/api/donaciones/sucursales/"),
          fetch("http://localhost:8000/api/zonas/zonas/"),
        ]);

        const sucData = await sucRes.json();
        const zonasData = await zonasRes.json();

        const sucursalesArray = sucData.results || sucData;
        const zonasArray = zonasData.results || zonasData;

        const sucursalesConZonas = sucursalesArray.map((sucursal) => {
          const zonaEncontrada = zonasArray.find(
            (zona) => zona.id === sucursal.zona
          );
          return {
            ...sucursal,
            zonaNombre: zonaEncontrada ? zonaEncontrada.nombre : "N/A",
          };
        });

        setSucursales(sucursalesConZonas);
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDatos();
  }, []);

  return (
    <>
      <VoluntarioHeader />
      <main className="donaciones-container">
        <div className="donaciones-header">
          <h1>Centros de Donación</h1>

          <div className="motivational-message">
            <HeartHandshake size={32} stroke="#ff7a00" />
            <p>
              Cada donación es una semilla de esperanza. ¡Juntos construimos un
              futuro mejor!
            </p>
          </div>
        </div>

        {loading ? (
          <div className="loading">
            <p>Cargando sucursales...</p>
          </div>
        ) : sucursales.length === 0 ? (
          <div className="no-sucursales">
            <p>No hay sucursales disponibles.</p>
          </div>
        ) : (
          <div className="sucursales-grid">
            {sucursales.map((sucursal) => (
              <div className="sucursal-card" key={sucursal.id}>
                <h2>{sucursal.nombre}</h2>
                <div className="sucursal-info">
                  <div className="info-item">
                    <strong>Representante:</strong>{" "}
                    {sucursal.representante || "N/A"}
                  </div>
                  <div className="info-item">
                    <strong>Teléfono:</strong> {sucursal.telefono || "N/A"}
                  </div>
                  <div className="info-item">
                    <strong>Descripción:</strong>{" "}
                    {sucursal.descripcion || "Sin descripción"}
                  </div>
                  <div className="info-item">
                    <strong>Dirección:</strong> {sucursal.direccion || "N/A"}
                  </div>
                  <div className="info-item">
                    <strong>Horario:</strong> {sucursal.horario_apertura} -{" "}
                    {sucursal.horario_cierre}
                  </div>
                  <div className="info-item">
                    <strong>Zona:</strong> {sucursal.zonaNombre}
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

export default Sucursales;
