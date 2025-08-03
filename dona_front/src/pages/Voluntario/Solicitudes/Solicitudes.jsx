// Luna FLores Yamileth Guadalupe
import React, { useEffect, useState } from "react";
import VoluntarioHeader from "../../../components/VoluntarioHeader";
import "./Solicitudes.css";

const Solicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [publicaciones, setPublicaciones] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState("todas");

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

      setSolicitudes(solicitudesConDetalles);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const filtrarSolicitudes = () => {
    if (filtro === "todas") {
      return solicitudes.filter((s) => s.estado.toLowerCase() !== "completada");
    }
    return solicitudes.filter((s) => s.estado.toLowerCase() === filtro);
  };

  const solicitudesFiltradas = filtrarSolicitudes();

  return (
    <>
      <VoluntarioHeader />
      <main className="donaciones-container">
        <div className="solicitudes-header">
          <h1>Solicitudes</h1>
          <div className="filtros">
            <button
              className={`filtro-btn ${filtro === "todas" ? "active" : ""}`}
              onClick={() => setFiltro("todas")}
            >
              Todas
            </button>
            <button
              className={`filtro-btn ${filtro === "pendiente" ? "active" : ""}`}
              onClick={() => setFiltro("pendiente")}
            >
              Pendientes
            </button>
            <button
              className={`filtro-btn ${filtro === "aprobada" ? "active" : ""}`}
              onClick={() => setFiltro("aprobada")}
            >
              Aprobadas
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading">
            <p>Cargando solicitudes...</p>
          </div>
        ) : error ? (
          <div className="error">
            <p>{error}</p>
          </div>
        ) : solicitudesFiltradas.length === 0 ? (
          <div className="no-solicitudes">
            <p>No hay solicitudes disponibles</p>
          </div>
        ) : (
          <div className="solicitudes-table-container">
            <table className="solicitudes-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Publicación</th>
                  <th>Receptor</th>
                  <th>Estado</th>
                  <th>Comentarios</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {solicitudesFiltradas.map((solicitud) => (
                  <tr key={solicitud.id}>
                    <td>{solicitud.id}</td>
                    <td>{solicitud.publicacionDetalle?.titulo || "N/A"}</td>
                    <td>{solicitud.receptorDetalle?.nombre || "N/A"}</td>
                    <td>
                      <span
                        className={`status-badge ${solicitud.estado.toLowerCase()}`}
                      >
                        {solicitud.estado}
                      </span>
                    </td>
                    <td>{solicitud.comentarios || "-"}</td>
                    <td>
                      <button className="btn-action">Ver detalles</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
};

export default Solicitudes;
