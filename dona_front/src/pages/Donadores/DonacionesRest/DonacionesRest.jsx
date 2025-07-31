// Luna Flores Yamileth Guadalupe
import React, { useEffect, useState } from "react";
import DonadoresHeader from "../../../components/DonadoresHeader";
import "./DonacionesRest.css";

const DonacionesRest = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [donadorId, setDonadorId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const usuarioId = localStorage.getItem("usuarioId");

  // Paso 1: Buscar el donador correspondiente al usuarioId
  const obtenerDonadorId = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/donaciones/donadores/");

      if (!res.ok) {
        const text = await res.text();
        console.error("Respuesta no válida:", text);
        throw new Error(`Error HTTP: ${res.status}`);
      }

      const data = await res.json();
      const donador = data.find((d) => d.usuario === parseInt(usuarioId));

      if (donador) {
        setDonadorId(donador.id);
      } else {
        setError("No se encontró el donador correspondiente.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Error al obtener donador:", err.message);
      setError("Error al obtener información del donador.");
      setLoading(false);
    }
  };

  // Paso 2: Cargar publicaciones del donador
  const cargarPublicaciones = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/donaciones/publicaciones/");

      if (!res.ok) {
        const text = await res.text();
        console.error("Respuesta no válida:", text);
        throw new Error(`Error HTTP: ${res.status}`);
      }

      const data = await res.json();
      const publicacionesArray = data.results || data;

      const publicacionesFiltradas = publicacionesArray.filter(
        (p) => p.donador === donadorId
      );

      setPublicaciones(publicacionesFiltradas);
      setLoading(false);
    } catch (err) {
      console.error("Error al cargar publicaciones:", err.message);
      setError("Error al obtener publicaciones.");
      setLoading(false);
    }
  };

  // useEffect para obtener el donadorId
  useEffect(() => {
    if (usuarioId) {
      obtenerDonadorId();
    } else {
      setError("No se encontró el ID de usuario.");
      setLoading(false);
    }
  }, [usuarioId]);

  // useEffect para cargar publicaciones cuando ya se tenga el donadorId
  useEffect(() => {
    if (donadorId !== null) {
      cargarPublicaciones();
    }
  }, [donadorId]);

  return (
    <>
      <DonadoresHeader />
      <main className="container historialDonador">
        <h1>Mis Publicaciones</h1>

        {loading && <p>Cargando publicaciones...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && publicaciones.length === 0 && (
          <p>No tienes publicaciones registradas.</p>
        )}

        {!loading && !error && publicaciones.length > 0 && (
          <table className="historial-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Fecha de Publicación</th>
                <th>Fecha de Caducidad</th>
              </tr>
            </thead>
            <tbody>
              {publicaciones.map((pub) => (
                <tr key={pub.id}>
                  <td>{pub.id}</td>
                  <td>{pub.titulo}</td>
                  <td>{pub.descripcion}</td>
                  <td>{pub.cantidad}</td>
                  <td>{new Date(pub.fecha_publicacion).toLocaleDateString()}</td>
                  <td>{pub.fecha_caducidad}</td>
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
