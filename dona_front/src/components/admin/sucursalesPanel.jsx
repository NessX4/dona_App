import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/admin.css";

const SucursalesPanel = () => {
  const [sucursales, setSucursales] = useState([]);
  const [zonas, setZonas] = useState([]);
  const [filtroTexto, setFiltroTexto] = useState("");
  const [zonaSeleccionada, setZonaSeleccionada] = useState("");
  const [ordenNombre, setOrdenNombre] = useState("az");
  const [activosPrimero, setActivosPrimero] = useState(false);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const obtenerZona = (zonaId) => {
    const zona = zonas.find((z) => z.id === zonaId);
    return zona ? `${zona.nombre.replace(/ *\(?inactiva\)?/i, "").trim()} (${zona.codigo_postal})` : "Zona no encontrada";
  };

  const esSucursalActiva = (sucursal) => {
    return !sucursal.nombre.toLowerCase().includes("inactiva");
  };

  const sucursalesFiltradas = sucursales
    .filter((sucursal) => {
      const texto = filtroTexto.toLowerCase();
      const coincideTexto =
        sucursal.nombre.toLowerCase().includes(texto) ||
        sucursal.direccion.toLowerCase().includes(texto);

      const coincideZona =
        zonaSeleccionada === "" || sucursal.zona === parseInt(zonaSeleccionada);

      return coincideTexto && coincideZona;
    })
    .sort((a, b) => {
      if (activosPrimero) {
        const aActivo = esSucursalActiva(a);
        const bActivo = esSucursalActiva(b);
        if (aActivo !== bActivo) return aActivo ? -1 : 1;
      }

      const nombreA = a.nombre.toLowerCase();
      const nombreB = b.nombre.toLowerCase();
      return ordenNombre === "az"
        ? nombreA.localeCompare(nombreB)
        : nombreB.localeCompare(nombreA);
    });

  return (
    <div className="main-content">
      <h2>🏪 Gestión de Sucursales</h2>

      <button className="create-user-btn" onClick={() => navigate("/sucursales/crear")}>
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

        <label className="checkbox-label" style={{ marginLeft: "10px" }}>
          Activos primero
          <input
            type="checkbox"
            checked={activosPrimero}
            onChange={(e) => setActivosPrimero(e.target.checked)}
            style={{ marginLeft: "8px" }}
          />
        </label>

        <select
          value={zonaSeleccionada}
          onChange={(e) => setZonaSeleccionada(e.target.value)}
          className="filtro-select"
        >
          <option value="">Todas las zonas</option>
          {zonas.map((z) => (
            <option key={z.id} value={z.id}>
              {z.nombre.replace(/ *\(?inactiva\)?/i, "").trim()} ({z.codigo_postal})
            </option>
          ))}
        </select>

        Ordenar por:
        <select
          value={ordenNombre}
          onChange={(e) => setOrdenNombre(e.target.value)}
          className="filtro-select"
        >
          <option value="az">A → Z</option>
          <option value="za">Z → A</option>
        </select>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Zona</th>
            <th>Representante</th>
            <th>Estatus</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center text-gray-500 py-4">
                ⏳ Cargando sucursales...
              </td>
            </tr>
          ) : sucursalesFiltradas.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center text-gray-500 py-4">
                No hay sucursales que coincidan con los filtros aplicados.
              </td>
            </tr>
          ) : (
            sucursalesFiltradas.map((sucursal) => (
              <tr key={sucursal.id}>
                <td>{sucursal.nombre.replace(/ *\(?inactiva\)?/i, "").trim()}</td>
                <td>{sucursal.direccion}</td>
                <td>{obtenerZona(sucursal.zona)}</td>
                <td>{sucursal.representante}</td>
                <td>
                  <span
                    className={`estado-btn ${esSucursalActiva(sucursal) ? "activo" : "inactivo"}`}
                  >
                    {esSucursalActiva(sucursal) ? "✅ Activo" : "⛔ Inactivo"}
                  </span>
                </td>
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
