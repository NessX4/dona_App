// Luna FLores Yamileth Guadalupe
import React, { useEffect, useState } from "react";
import VoluntarioHeader from "../../../components/DonadoresHeader";
import "./SolicitudesDonador.css";

const SolicitudesDonador = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [publicaciones, setPublicaciones] = useState([]);
  const [sucursales, setSucursales] = useState([]);
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
        const publicacion = publicacionesArray.find(
          (p) => p.id === solicitud.publicacion
        ) || null;

        let receptorSucursal = null;

        if (typeof solicitud.receptor === "object" && solicitud.receptor !== null) {
          receptorSucursal = solicitud.receptor;
        } else {
          receptorSucursal = sucursalesArray.find(
            (s) => s.id === solicitud.receptor
          ) || null;
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

  const solicitudesFiltradas = solicitudes.filter(
    (solicitud) => solicitud.estado.toLowerCase() !== "completada"
  );

  return (
    <>
      <VoluntarioHeader />
      <main className="container solicitudesDonador">
        <h1>Solicitudes</h1>

        {loading && <p>Cargando solicitudes...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && solicitudesFiltradas.length === 0 && (
          <p>No hay solicitudes disponibles.</p>
        )}

        {!loading && !error && solicitudesFiltradas.length > 0 && (
          <table className="solicitudes-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Publicación</th>
                <th>Receptor</th>
                <th>Estado</th>
                <th>Comentarios</th>
              </tr>
            </thead>
            <tbody>
              {solicitudesFiltradas.map((solicitud) => (
                <tr key={solicitud.id}>
                  <td>{solicitud.id}</td>
                  <td>{solicitud.publicacionDetalle?.titulo || "N/A"}</td>
                  <td>{solicitud.receptorDetalle?.nombre || "N/A"}</td>
                  <td>
                    <span className={`status ${solicitud.estado.toLowerCase()}`}>
                      {solicitud.estado}
                    </span>
                  </td>
                  <td>{solicitud.comentarios || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </>
  );
};

export default SolicitudesDonador;
