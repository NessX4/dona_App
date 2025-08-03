// src/pages/Refugio/Sucursales/SucursalesRefugio.jsx

import React, { useState, useEffect } from "react";
import "./SucursalesRefugio.css";
import RefugioHeader from "../../../components/RefugioHeader";

const SucursalesRefugio = () => {
  const [sucursales, setSucursales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSucursales = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        setSucursales(data);
      } catch (error) {
        console.error("Error al obtener sucursales:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSucursales();
  }, []);

  return (
    <>
      <RefugioHeader />
      <div className="donaciones-container">
        <div className="donaciones-header">
          <h1>Sucursales del Refugio</h1>
        </div>

        {loading ? (
          <div className="loading">
            <p>Cargando sucursales...</p>
          </div>
        ) : sucursales.length > 0 ? (
          <div className="donaciones-grid">
            {sucursales.map((sucursal) => (
              <div className="donacion-card" key={sucursal.id}>
                <div className="donacion-header">
                  <h3>{sucursal.name}</h3>
                  <span className="estado-badge disponible">Activa</span>
                </div>
                <div className="donacion-body">
                  <div className="donacion-info">
                    <div className="info-item">
                      <span className="info-icon">📍</span>
                      {sucursal.address.street}, {sucursal.address.city}
                    </div>
                    <div className="info-item">
                      <span className="info-icon">📞</span>
                      {sucursal.phone}
                    </div>
                    <div className="info-item">
                      <span className="info-icon">✉️</span>
                      {sucursal.email}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-donaciones">
            <svg height="80" viewBox="0 0 24 24" fill="none">
              <path d="M3 6H21V8H3V6Z" fill="#ccc" />
              <path d="M3 10H21V12H3V10Z" fill="#ccc" />
              <path d="M3 14H21V16H3V14Z" fill="#ccc" />
            </svg>
            <p>No hay sucursales disponibles</p>
          </div>
        )}
      </div>
    </>
  );
};

export default SucursalesRefugio;
