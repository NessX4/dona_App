import { useEffect, useState } from "react";

export default function useZonas() {
  const [zonas, setZonas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerZonas = async () => {
      try {
        const respuesta = await fetch("http://localhost:8000/api/zonas/");
        if (!respuesta.ok) {
          const msg = `Error ${respuesta.status}: No se pudieron obtener las zonas`;
          throw new Error(msg);
        }

        const data = await respuesta.json();
        if (!Array.isArray(data)) throw new Error("Formato de zonas inválido");

        setZonas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    obtenerZonas();
  }, []);

  return { zonas, cargando, error };
}
