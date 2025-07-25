import React, { useEffect, useState } from "react";
import VoluntarioHeader from "../../../components/VoluntarioHeader";
import { HeartHandshake } from "lucide-react";
import "./Sucursales.css"; // Aquí debes agregar el CSS que te pasé

const Donaciones = () => {
  const [sucursales, setSucursales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const [sucRes, zonasRes] = await Promise.all([
          fetch("http://localhost:8000/api/donaciones/sucursales/"),
          fetch("http://localhost:8000/api/zonas/zonas/")
        ]);

        const sucData = await sucRes.json();
        const zonasData = await zonasRes.json();

        const sucursalesArray = sucData.results || sucData;
        const zonasArray = zonasData.results || zonasData;

        const sucursalesConZonas = sucursalesArray.map((sucursal) => {
          const zonaEncontrada = zonasArray.find((zona) => zona.id === sucursal.zona);
          return {
            ...sucursal,
            zonaNombre: zonaEncontrada ? zonaEncontrada.nombre : "N/A"
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
      <main className="container">
                <h1>Centros de Donación</h1>\
                
        <div className="motivational-message">
          <HeartHandshake size={32} stroke="#ff7a00" />
          <p> Cada donación es una semilla de esperanza. ¡Juntos construimos un futuro mejor!</p>
        </div>


        {loading ? (
          <p>Cargando sucursales...</p>
        ) : sucursales.length === 0 ? (
          <p>No hay sucursales disponibles.</p>
        ) : (
          <div className="zonas-wrapper">
            {sucursales.map((sucursal) => (
              <div className="zona-card" key={sucursal.id}>
                <h2>{sucursal.nombre}</h2>
                <ul>
                  <li><strong>Representante:</strong> {sucursal.representante || "N/A"}</li>
                  <li><strong>Teléfono:</strong> {sucursal.telefono || "N/A"}</li>
                  <li><strong>Descripción:</strong> {sucursal.descripcion || "Sin descripción"}</li>
                  <li><strong>Dirección:</strong> {sucursal.direccion || "N/A"}</li>
                  <li><strong>Horario:</strong> {sucursal.horario_apertura} - {sucursal.horario_cierre}</li>
                  <li><strong>Zona:</strong> {sucursal.zonaNombre}</li>
                </ul>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default Donaciones;
