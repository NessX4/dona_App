import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fondoDecorativo from '../../assets/DonalogoHD.png';

const DeleteZona = () => {
  const { id } = useParams();
  const [zona, setZona] = useState(null);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [relacionada, setRelacionada] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchZonaData = async () => {
      try {
        const [zonaRes, ubicacionesRes, sucursalesRes] = await Promise.all([
          fetch(`http://localhost:8000/api/zonas/zonas/${id}/`),
          fetch('http://localhost:8000/api/zonas/ubicaciones/'),
          fetch('http://localhost:8000/api/donaciones/sucursales/')
        ]);

        if (!zonaRes.ok) {
          setZona(null);
          setLoading(false);
          return;
        }

        const zonaData = await zonaRes.json();
        const ubicacionesData = await ubicacionesRes.json();
        const sucursalesData = await sucursalesRes.json();

        setZona(zonaData);
        setUbicaciones(ubicacionesData);
        setSucursales(sucursalesData);

        const tieneRelacion =
          ubicacionesData.some(u => u.zona === parseInt(id)) ||
          sucursalesData.some(s => s.zona === parseInt(id));

        setRelacionada(tieneRelacion);
      } catch (error) {
        console.error('❌ Error al cargar zona o relaciones:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchZonaData();
  }, [id]);

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/zonas/zonas/${id}/`, {
        method: 'DELETE'
      });

      if (res.ok) {
        alert('✅ Zona eliminada correctamente');
        window.location.hash = '#/zonas';
      } else {
        alert('❌ No se pudo eliminar la zona');
      }
    } catch (error) {
      console.error('❌ Error al eliminar zona:', error);
    }
  };

  const marcarComoInactiva = async () => {
    try {
      const nombreInactivo = zona.nombre.toLowerCase().includes('inactiva')
        ? zona.nombre
        : `${zona.nombre} (inactiva)`;

      const res = await fetch(`http://localhost:8000/api/zonas/zonas/${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nombreInactivo })
      });

      if (res.ok) {
        alert('🚫 Zona marcada como inactiva');
        window.location.hash = '#/zonas';
      } else {
        alert('❌ No se pudo marcar como inactiva');
      }
    } catch (error) {
      console.error('❌ Error al marcar como inactiva:', error);
    }
  };

  if (loading) {
    return <div className="main-content">⏳ Cargando información...</div>;
  }

  if (!zona) {
    return (
      <div className="main-content">
        <h2>❌ Zona no encontrada</h2>
        <p>No se pudo cargar la zona con ID <strong>{id}</strong>.</p>
        <button
          className="cancel-delete-btn"
          onClick={() => window.location.hash = '#/zonas'}
        >
          <i className="fas fa-arrow-left"></i> Volver
        </button>
      </div>
    );
  }

  const yaInactiva = zona.nombre.toLowerCase().includes('inactiva');

  return (
    <div className="main-content">
      <img
        src={fondoDecorativo}
        alt="Decoración DonaApp"
        className="decorative-image"
      />

      <h2>🗑️ Eliminar zona</h2>

      <table className="user-summary-table">
        <tbody>
          <tr><th>Nombre</th><td>{zona.nombre}</td></tr>
          <tr><th>Ciudad</th><td>{zona.ciudad}</td></tr>
          <tr><th>Estado</th><td>{zona.estado}</td></tr>
          <tr><th>Código Postal</th><td>{zona.codigo_postal}</td></tr>
        </tbody>
      </table>

      <p style={{ marginTop: '1.2rem', color: '#b00020', fontWeight: 'bold' }}>
        {relacionada
          ? yaInactiva
            ? '⚠️ Esta zona está asociada a elementos del sistema y no puede ser eliminada.'
            : '⚠️ Esta zona está asociada a elementos del sistema y no puede ser eliminada..'
          : '⚠️ Esta acción no se puede deshacer. ¿Estás segur@ que deseas eliminar esta zona?'}
      </p>

{relacionada && !yaInactiva && (
  <p style={{ marginTop: '1.5rem', marginBottom: '1rem', color: '#555', fontStyle: 'italic' }}>
    Puedes marcar esta zona como inactiva para que no aparezca más en el sistema, sin eliminarla.
  </p>
)}

      <div className="delete-buttons">

        
        {!relacionada && (
        
          <button
            className="delete-confirm-btn"
            onClick={() => {
              const confirmar = window.confirm('⚠️ Esta acción eliminará permanentemente la zona.\n¿Deseas continuar?');
              if (confirmar) {
                handleDelete();
              }
            }}
          >
            <i className="fas fa-trash-alt"></i> Eliminar
          </button>
        )}

        {relacionada && !yaInactiva && (
          <button
            className="delete-confirm-btn"
            style={{ backgroundColor: '#bdbdbd', color: '#333' }}
            onClick={() => {
              const confirmar = window.confirm("⚠️ ¿Estás segur@ que deseas marcar esta zona como inactiva?");
              if (confirmar) {
                marcarComoInactiva();
              }
            }}
          >
            <i className="fas fa-ban"></i> Marcar como Inactiva
          </button>
        )}

        <button
          className="cancel-delete-btn"
          onClick={() => window.location.hash = '#/zonas'}
        >
          <i className="fas fa-times-circle"></i> Cancelar
        </button>
      </div>
    </div>
  );
};

export default DeleteZona;
