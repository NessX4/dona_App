/**
 * Responsable: Mariela Higuera
 * Descripción: Muestra y gestiona las sucursales de los donadores dentro del panel.
 */

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

      <h2 style={{ marginTop: '10px' }}>
  <i className="fas fa-store" style={{ marginRight: '10px', color: '#333' }}></i>
  Gestión de sucursales
</h2>


      <button className="create-user-btn" onClick={() => navigate("/sucursales/crear")}>
        ➕ Crear sucursales
      </button>




      <div className="filtro-barra">
        <input
          type="text"
          placeholder="🔍 Buscar por nombre"
          value={filtroTexto}
          onChange={(e) => setFiltroTexto(e.target.value)}
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
    gap: '8px'  // Espacio entre texto y checkbox
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
      
<div className="espaciado-negativo"></div>



      <table className="user-table">
  <thead>
    <tr>
      <th style={{ textAlign: 'center' }}>Nombre</th>
      <th style={{ textAlign: 'center' }}>Dirección</th>
      <th style={{ textAlign: 'center' }}>Zona</th>
      <th style={{ textAlign: 'center' }}>Representante</th>
      <th style={{ textAlign: 'center' }}>Estatus</th>
      <th style={{ textAlign: 'center' }}>Acciones</th>
    </tr>
  </thead>
  <tbody>
    {loading ? (
      <tr>
        <td colSpan="6" style={{ textAlign: 'center' }} className="text-gray-500 py-4">
          ⏳ Cargando sucursales...
        </td>
      </tr>
    ) : sucursalesFiltradas.length === 0 ? (
      <tr>
        <td colSpan="6" style={{ textAlign: 'center' }} className="text-gray-500 py-4">
          No hay sucursales que coincidan con los filtros aplicados.
        </td>
      </tr>
    ) : (
      sucursalesFiltradas.map((sucursal) => (
        <tr key={sucursal.id}>
          <td style={{ textAlign: 'center' }}>{sucursal.nombre.replace(/ *\(?inactiva\)?/i, "").trim()}</td>
          <td style={{ textAlign: 'center' }}>{sucursal.direccion}</td>
          <td style={{ textAlign: 'center' }}>{obtenerZona(sucursal.zona)}</td>
          <td style={{ textAlign: 'center' }}>{sucursal.representante}</td>
          <td style={{ textAlign: 'center' }}>
            <span
              className={`estado-btn ${esSucursalActiva(sucursal) ? "activo" : "inactivo"}`}
            >
              {esSucursalActiva(sucursal) ? "✅ Activo" : "⛔ Inactivo"}
            </span>
          </td>
          <td style={{ textAlign: 'center' }}>
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
