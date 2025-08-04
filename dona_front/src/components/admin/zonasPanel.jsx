// src/componentes/admin/ZonasPanel.jsx
/**
 * Responsable: Mariela Higuera
 * Descripción: Visualiza y gestiona las zonas geográficas disponibles en DonaApp.
 */


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
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
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
      <h2 style={{ marginTop: '10px' }}>
        <i className="fas fa-map-marked-alt" style={{ marginRight: '10px', color: '#333' }}></i>
        Gestión de zonas
      </h2>

      <button
        className="create-user-btn"
        onClick={() => navigate("/zonas/crear")}
      >
        ➕ Crear zona
      </button>

      {/* Filtros */}
      <div className="filtro-barra">
        <input
          type="text"
          placeholder="🔍 Buscar por nombre"
          value={nombreFiltro}
          onChange={(e) => setNombreFiltro(e.target.value)}
          className="input-busqueda"
          style={{
            marginTop: '15px',
            marginBottom: '-10px'
          }}
        />

        <label
          className="checkbox-label"
          style={{
            display: 'flex',
            alignItems: 'center',
            whiteSpace: 'nowrap',
            marginLeft: '6px',
            fontSize: '14px',
            marginTop: '8px',
            marginRight: '8px',
            gap: '8px'
          }}
        >
          <span>Activos primero</span>
          <input
            type="checkbox"
            checked={activosPrimero}
            onChange={(e) => setActivosPrimero(e.target.checked)}
            style={{
              width: '18px',
              height: '18px',
              cursor: 'pointer',
              marginTop: '18px'
            }}
          />
        </label>

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


<div className="espaciado-negativo"></div>
      <table className="user-table">
  <thead>
    <tr>
      <th style={{ textAlign: 'center' }}>Nombre</th>
      <th style={{ textAlign: 'center' }}>Dirección</th>
      <th style={{ textAlign: 'center' }}>CP</th>
      <th style={{ textAlign: 'center' }}>Ciudad</th>
      <th style={{ textAlign: 'center' }}>Estado</th>
      <th style={{ textAlign: 'center' }}>Estatus</th>
      <th style={{ textAlign: 'center' }}>Acciones</th>
    </tr>
  </thead>
  <tbody>
    {loading ? (
      <tr>
        <td colSpan="7" style={{ textAlign: 'center' }} className="text-gray-500 py-4">
          ⏳ Cargando zonas...
        </td>
      </tr>
    ) : zonasFiltradas.length === 0 ? (
      <tr>
        <td colSpan="7" style={{ textAlign: 'center' }} className="text-gray-500 py-4">
          No hay zonas que coincidan con los filtros aplicados.
        </td>
      </tr>
    ) : (
      zonasFiltradas.map((zona) => (
        <tr key={zona.id}>
          <td style={{ textAlign: 'center' }}>
            {zona.nombre.replace(/ *\(?inactiva\)?/i, "").trim()}
          </td>
          <td style={{ textAlign: 'center' }}>{obtenerDireccion(zona)}</td>
          <td style={{ textAlign: 'center' }}>{zona.codigo_postal}</td>
          <td style={{ textAlign: 'center' }}>{zona.ciudad}</td>
          <td style={{ textAlign: 'center' }}>{zona.estado}</td>
          <td style={{ textAlign: 'center' }}>
            <span className={`estado-btn ${esZonaActiva(zona) ? "activo" : "inactivo"}`}>
              {esZonaActiva(zona) ? "✅ Activo" : "⛔ Inactivo"}
            </span>
          </td>
          <td style={{ textAlign: 'center' }}>
            <button className="edit-btn" onClick={() => navigate(`/zonas/editar/${zona.id}`)}>
              ✏️ Editar
            </button>
            <button className="delete-btn" onClick={() => navigate(`/zonas/eliminar/${zona.id}`)}>
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
