// src/components/admin/zonasPanel.jsx
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

        // Obtener ciudades únicas
        const ciudadesUnicas = [...new Set(zonasData.map(z => z.ciudad))];
        setCiudadesDisponibles(ciudadesUnicas);
      } catch (error) {
        console.error("❌ Error al cargar zonas o ubicaciones:", error);
      }
    };

    fetchData();
  }, []);

  const obtenerDireccion = (zona) => {
    const ubicacion = ubicaciones.find((u) => u.zona === zona.id);
    return ubicacion?.direccion || "Ubicación no encontrada";
  };

  const zonasFiltradas = zonas
    .filter((zona) =>
      zona.nombre.toLowerCase().includes(nombreFiltro.toLowerCase())
    )
    .filter((zona) =>
      ciudadFiltro === '' || zona.ciudad === ciudadFiltro
    )
    .sort((a, b) =>
      ordenNombre === 'az'
        ? a.nombre.localeCompare(b.nombre)
        : b.nombre.localeCompare(a.nombre)
    );

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
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {zonasFiltradas.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center text-gray-500 py-4">
                No hay zonas registradas.
              </td>
            </tr>
          ) : (
            zonasFiltradas.map((zona) => (
              <tr key={zona.id}>
                <td>{zona.nombre}</td>
                <td>{obtenerDireccion(zona)}</td>
                <td>{zona.codigo_postal}</td>
                <td>{zona.ciudad}</td>
                <td>{zona.estado}</td>
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
