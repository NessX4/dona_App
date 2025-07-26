import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/admin.css";

const SucursalesPanel = () => {
  const [sucursales, setSucursales] = useState([]);
  const [zonas, setZonas] = useState([]);
  const [filtroTexto, setFiltroTexto] = useState("");
  const [zonaSeleccionada, setZonaSeleccionada] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sucursalesRes, zonasRes] = await Promise.all([
          fetch("http://localhost:8000/api/donaciones/sucursales/"),
          fetch("http://localhost:8000/api/zonas/zonas/"),
        ]);

        const sucursalesData = await sucursalesRes.json();
        const zonasData = await zonasRes.json();

        setSucursales(sucursalesData);
        setZonas(zonasData);
      } catch (error) {
        console.error("❌ Error al cargar sucursales:", error);
      }
    };

    fetchData();
  }, []);

  const obtenerZona = (zonaId) => {
    const zona = zonas.find((z) => z.id === zonaId);
    return zona ? `${zona.nombre} (${zona.codigo_postal})` : "Zona no encontrada";
  };

  const formatHoraConAMPM = (hora) => {
    if (!hora) return "";
    const [h, m] = hora.split(":");
    const hour = parseInt(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:${m} ${ampm}`;
  };

  const sucursalesFiltradas = sucursales.filter((sucursal) => {
    const texto = filtroTexto.toLowerCase();
    const coincideTexto =
      sucursal.nombre.toLowerCase().includes(texto) ||
      sucursal.direccion.toLowerCase().includes(texto);

    const coincideZona =
      zonaSeleccionada === "" || sucursal.zona === parseInt(zonaSeleccionada);

    return coincideTexto && coincideZona;
  });

  return (
    <div className="main-content">
      <h2>🏪 Gestión de Sucursales</h2>
<button className="create-user-btn" onClick={() => navigate('/sucursales/crear')}>
        ➕ Crear Sucursales
      </button>


      <div className="filtro-barra">
        <input
          type="text"
          placeholder="🔍 Buscar"
          value={filtroTexto}
          onChange={(e) => setFiltroTexto(e.target.value)}
          className="input-busqueda"
        />

        <select
          value={zonaSeleccionada}
          onChange={(e) => setZonaSeleccionada(e.target.value)}
          className="filtro-select"
        >
          <option value="">Todas las zonas</option>
          {zonas.map((z) => (
            <option key={z.id} value={z.id}>
              {z.nombre} ({z.codigo_postal})
            </option>
          ))}
        </select>

       
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Zona</th>
            <th>Teléfono</th>
            <th>Horario</th>
            <th>Representante</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sucursalesFiltradas.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center text-gray-500 py-4">
                No hay sucursales que coincidan con los filtros aplicados.
              </td>
            </tr>
          ) : (
            sucursalesFiltradas.map((sucursal) => (
              <tr key={sucursal.id}>
                <td>{sucursal.nombre}</td>
                <td>{sucursal.direccion}</td>
                <td>{obtenerZona(sucursal.zona)}</td>
                <td>{sucursal.telefono}</td>
                <td>
                  {formatHoraConAMPM(sucursal.horario_apertura)} -{" "}
                  {formatHoraConAMPM(sucursal.horario_cierre)}
                </td>
                <td>{sucursal.representante}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/sucursales/editar/${sucursal.id}`)}
                  >
                    ✏️ Editar
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => navigate(`/sucursales/eliminar/${sucursal.id}`)}
                  >
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SucursalesPanel;
