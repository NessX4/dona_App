import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/admin.css";

const ZonasPanel = () => {
  const [zonas, setZonas] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [nombreFiltro, setNombreFiltro] = useState('');
  const [ciudadFiltro, setCiudadFiltro] = useState('');
  const [ordenNombre, setOrdenNombre] = useState('az');
  const [ciudadesDisponibles, setCiudadesDisponibles] = useState([]);
  const [activosPrimero, setActivosPrimero] = useState(false);
  const [loading, setLoading] = useState(true); // 🚩 nuevo estado

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [zonasRes, ubicacionesRes] = await Promise.all([
          fetch("http://localhost:8000/api/zonas/zonas/"),
          fetch("http://localhost:8000/api/zonas/ubicaciones/")
        ]);

        const zonasData = await zonasRes.json();
        const ubicacionesData = await ubicacionesRes.json();

        setZonas(zonasData);
        setUbicaciones(ubicacionesData);

        const ciudadesUnicas = [...new Set(zonasData.map(z => z.ciudad))];
        setCiudadesDisponibles(ciudadesUnicas);
      } catch (error) {
        console.error("❌ Error al cargar zonas o ubicaciones:", error);
      } finally {
        setLoading(false); // ✅ termina de cargar
      }
    };

    fetchData();
  }, []);

  const obtenerDireccion = (zona) => {
    const ubicacion = ubicaciones.find((u) => u.zona === zona.id);
    return ubicacion?.direccion || "Ubicación no encontrada";
  };

  const esZonaActiva = (zona) => {
    return !zona.nombre.toLowerCase().includes("inactiva");
  };

  const zonasFiltradas = zonas
    .filter((zona) =>
      zona.nombre.toLowerCase().includes(nombreFiltro.toLowerCase())
    )
    .filter((zona) =>
      ciudadFiltro === '' || zona.ciudad === ciudadFiltro
    )
    .sort((a, b) => {
      if (activosPrimero) {
        const aActivo = esZonaActiva(a);
        const bActivo = esZonaActiva(b);
        if (aActivo !== bActivo) return aActivo ? -1 : 1;
      }
      return ordenNombre === 'az'
        ? a.nombre.localeCompare(b.nombre)
        : b.nombre.localeCompare(a.nombre);
    });

  return (
    <div className="main-content">
      <h2>🗺️ Gestión de Zonas</h2>

      <button
        className="create-user-btn"
        onClick={() => navigate("/zonas/crear")}
      >
        ➕ Crear Zona
      </button>

      {/* Filtros */}
      <div className="filtro-barra">
        <input
          type="text"
          placeholder="🔍 Buscar por nombre"
          value={nombreFiltro}
          onChange={(e) => setNombreFiltro(e.target.value)}
        />

        <select value={ciudadFiltro} onChange={(e) => setCiudadFiltro(e.target.value)}>
          <option value="">Todas las ciudades</option>
          {ciudadesDisponibles.map((ciudad, index) => (
            <option key={index} value={ciudad}>
              {ciudad}
            </option>
          ))}
        </select>

        <label className="checkbox-label">
          Activos primero
          <input
            type="checkbox"
            checked={activosPrimero}
            onChange={(e) => setActivosPrimero(e.target.checked)}
            style={{ marginLeft: "8px" }}
          />
        </label>

        Ordenar por:
        <select value={ordenNombre} onChange={(e) => setOrdenNombre(e.target.value)}>
          <option value="az">A → Z</option>
          <option value="za">Z → A</option>
        </select>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>CP</th>
            <th>Ciudad</th>
            <th>Estado</th>
            <th>Estatus</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="7" className="text-center text-gray-500 py-4">
                ⏳ Cargando zonas...
              </td>
            </tr>
          ) : zonasFiltradas.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center text-gray-500 py-4">
                No hay zonas que coincidan con los filtros aplicados.
              </td>
            </tr>
          ) : (
            zonasFiltradas.map((zona) => (
              <tr key={zona.id}>
                <td>{zona.nombre.replace(/ *\(?inactiva\)?/i, "").trim()}</td>
                <td>{obtenerDireccion(zona)}</td>
                <td>{zona.codigo_postal}</td>
                <td>{zona.ciudad}</td>
                <td>{zona.estado}</td>
                <td>
                  <span
                    className={`estado-btn ${esZonaActiva(zona) ? "activo" : "inactivo"}`}
                  >
                    {esZonaActiva(zona) ? "✅ Activo" : "⛔ Inactivo"}
                  </span>
                </td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/zonas/editar/${zona.id}`)}
                  >
                    ✏️ Editar
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => navigate(`/zonas/eliminar/${zona.id}`)}
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

export default ZonasPanel;
