import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fondoDecorativo from "../../assets/DonalogoHD.png";

const DeleteSucursal = () => {
  const { id } = useParams();
  const [sucursal, setSucursal] = useState(null);
  const [zonas, setZonas] = useState([]);
  const [publicaciones, setPublicaciones] = useState([]);
  const [relacionada, setRelacionada] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSucursalData = async () => {
      try {
        const [sucursalRes, publicacionesRes, zonasRes] = await Promise.all([
          fetch(`http://localhost:8000/api/donaciones/sucursales/${id}/`),
          fetch("http://localhost:8000/api/donaciones/publicaciones/"),
          fetch("http://localhost:8000/api/zonas/zonas/")
        ]);

        if (!sucursalRes.ok) {
          setSucursal(null);
          setLoading(false);
          return;
        }

        const sucursalData = await sucursalRes.json();
        const publicacionesData = await publicacionesRes.json();
        const zonasData = await zonasRes.json();

        setSucursal(sucursalData);
        setPublicaciones(publicacionesData);
        setZonas(zonasData);

        const tieneRelacion = publicacionesData.some(p => p.sucursal === parseInt(id));
        setRelacionada(tieneRelacion);
      } catch (error) {
        console.error("❌ Error al cargar sucursal o relaciones:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSucursalData();
  }, [id]);

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/donaciones/sucursales/${id}/`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("✅ Sucursal eliminada correctamente");
        window.location.hash = "#/sucursales";
      } else {
        alert("❌ No se pudo eliminar la sucursal");
      }
    } catch (error) {
      console.error("❌ Error al eliminar sucursal:", error);
    }
  };

  const marcarComoInactiva = async () => {
    try {
      const nombreInactivo = sucursal.nombre.toLowerCase().includes("inactiva")
        ? sucursal.nombre
        : `${sucursal.nombre} (inactiva)`;

      const res = await fetch(`http://localhost:8000/api/donaciones/sucursales/${id}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nombreInactivo }),
      });

      if (res.ok) {
        alert("🚫 Sucursal marcada como inactiva");
        window.location.hash = "#/sucursales";
      } else {
        alert("❌ No se pudo marcar como inactiva");
      }
    } catch (error) {
      console.error("❌ Error al marcar como inactiva:", error);
    }
  };

  const formatHora = (hora) => {
    if (!hora) return "";
    const [h, m] = hora.split(":");
    const hour = parseInt(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:${m} ${ampm}`;
  };

  const zonaRelacionada = zonas.find(z => z.id === sucursal?.zona);
  const yaInactiva = sucursal?.nombre?.toLowerCase().includes("inactiva");

  if (loading) {
    return <div className="main-content">⏳ Cargando información...</div>;
  }

  if (!sucursal) {
    return (
      <div className="main-content">
        <h2>❌ Sucursal no encontrada</h2>
        <p>No se pudo cargar la sucursal con ID <strong>{id}</strong>.</p>
        <button
          className="cancel-delete-btn"
          onClick={() => window.location.hash = "#/sucursales"}
        >
          <i className="fas fa-arrow-left"></i> Volver
        </button>
      </div>
    );
  }

  return (
    <div className="main-content">
      <img src={fondoDecorativo} alt="Decoración DonaApp" className="decorative-image" />
      <h2>🗑️ Eliminar Sucursal</h2>

      <table className="user-summary-table">
        <tbody>
          <tr><th>Nombre</th><td>{sucursal.nombre}</td></tr>
          <tr><th>Dirección</th><td>{sucursal.direccion}</td></tr>
          <tr><th>Teléfono</th><td>{sucursal.telefono}</td></tr>
          <tr><th>Representante</th><td>{sucursal.representante}</td></tr>
          <tr><th>Horario</th><td>{formatHora(sucursal.horario_apertura)} - {formatHora(sucursal.horario_cierre)}</td></tr>
          <tr><th>Zona</th>
            <td>
              {zonaRelacionada
                ? `${zonaRelacionada.nombre} (${zonaRelacionada.codigo_postal})`
                : "Zona no encontrada"}
            </td>
          </tr>
        </tbody>
      </table>

      <p style={{ marginTop: '1.2rem', color: '#b00020', fontWeight: 'bold' }}>
        {relacionada
          ? yaInactiva
            ? '⚠️ Esta sucursal está relacionada con publicaciones y ya está marcada como inactiva.'
            : '⚠️ Esta sucursal está relacionada con publicaciones y no puede eliminarse directamente.'
          : '⚠️ Esta acción no se puede deshacer. ¿Estás segur@ que deseas eliminar esta sucursal?'}
      </p>

      {relacionada && !yaInactiva && (
        <p style={{ marginTop: '1.5rem', marginBottom: '1rem', color: '#555', fontStyle: 'italic' }}>
          Puedes marcar esta sucursal como inactiva para ocultarla del sistema sin eliminarla.
        </p>
      )}

      <div className="delete-buttons">
        {relacionada ? (
          !yaInactiva && (
            <button
              className="delete-confirm-btn"
              style={{ backgroundColor: "#bdbdbd", color: "#333" }}
              onClick={() => {
                const confirmar = window.confirm("⚠️ ¿Estás segur@ que deseas marcar esta sucursal como inactiva?");
                if (confirmar) marcarComoInactiva();
              }}
            >
              <i className="fas fa-ban"></i> Marcar como Inactiva
            </button>
          )
        ) : (
          <button
            className="delete-confirm-btn"
            onClick={() => {
              const confirmar = window.confirm("⚠️ Esta acción eliminará permanentemente la sucursal.\n¿Deseas continuar?");
              if (confirmar) handleDelete();
            }}
          >
            <i className="fas fa-trash-alt"></i> Eliminar
          </button>
        )}

        <button
          className="cancel-delete-btn"
          onClick={() => window.location.hash = "#/sucursales"}
        >
          <i className="fas fa-times-circle"></i> Cancelar
        </button>
      </div>
    </div>
  );
};

export default DeleteSucursal;
