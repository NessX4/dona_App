// Luna FLores Yamileth Guadalupe
import React, { useEffect, useState } from "react";
import DonadoresHeader from "../../../components/DonadoresHeader";
import "./DonacionesRest.css";

const DonacionesRest = ({ donadorId }) => {
  const [solicitudes, setSolicitudes] = useState([]);
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

      // Filtrar solicitudes SOLO del donador actual
      const solicitudesDonador = solicitudesArray.filter(
        (solicitud) => solicitud.donador === donadorId
      );

      // Mapear detalles
      const solicitudesConDetalles = solicitudesDonador.map((solicitud) => {
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
    if (donadorId) {
      cargarDatos();
    }
  }, [donadorId]);

  return (
    <>
      <DonadoresHeader />
      <main className="container historialDonador">
        <h1>Mis Donaciones</h1>

        {loading && <p>Cargando donaciones...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && solicitudes.length === 0 && (
          <p>No tienes donaciones registradas.</p>
        )}

        {!loading && !error && solicitudes.length > 0 && (
          <table className="historial-table">
            <thead>
              <tr>
                <th>Publicación</th>
                <th>Receptor</th>
                <th>Estado</th>
                <th>Comentarios</th>
              </tr>
            </thead>
            <tbody>
              {solicitudes.map((solicitud) => (
                <tr key={solicitud.id}>
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

export default DonacionesRest;
