import React, { useEffect, useState } from "react";
import VoluntarioHeader from "../../../components/VoluntarioHeader";
import "./Notificaciones.css";

const Notificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Formatea la fecha de forma legible en español
  const formatoFecha = (fecha) => {
    return new Date(fecha).toLocaleString("es-MX", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const resNoti = await fetch("http://127.0.0.1:8000/api/notificaciones/notifiaciones/");

        if (!resNoti.ok) throw new Error("Error al cargar notificaciones");

        const dataNoti = await resNoti.json();

        const listaNoti = dataNoti.results || dataNoti;

        setNotificaciones(listaNoti);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  return (
    <>
      <VoluntarioHeader />
      <main className="container">
        <h1>Notificaciones</h1>

        {loading && <p>Cargando notificaciones...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && notificaciones.length === 0 && (
          <p>No hay notificaciones disponibles.</p>
        )}

        {!loading && !error && notificaciones.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Mensaje</th>
                <th>Fecha</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {notificaciones.map((noti) => (
                <tr key={noti.id}>
                  <td>{noti.id}</td>
                  <td>{noti.mensaje}</td>
                  <td>{noti.fecha ? formatoFecha(noti.fecha) : "N/A"}</td>
                  <td>
                    <span className={`status ${noti.leido ? "leido" : "no-leido"}`}>
                      {noti.leido ? "Leído" : "No leído"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </>
  );
};

export default Notificaciones;
