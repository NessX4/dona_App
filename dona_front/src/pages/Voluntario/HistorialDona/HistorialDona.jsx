import React, { useEffect, useState } from "react";
import VoluntarioHeader from "../../../components/VoluntarioHeader";
import "./HistorialDona.css";

const Donaciones = () => {
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

      const solicitudesCompletadas = solicitudesConDetalles.filter(
        (solicitud) => solicitud.estado.toLowerCase() === "completada"
      );

      setSolicitudes(solicitudesCompletadas);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <>
      <VoluntarioHeader />
      <main className="container">
        <h1>Solicitudes Completadas</h1>

        {loading && <p>Cargando solicitudes...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && solicitudes.length === 0 && (
          <p>No hay solicitudes completadas disponibles.</p>
        )}

        {!loading && !error && solicitudes.length > 0 && (
          <table>
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
                    <span className={`status ${solicitud.estado}`}>
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

export default Donaciones;
