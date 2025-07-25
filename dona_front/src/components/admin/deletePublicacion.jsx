import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fondoDecorativo from '../../assets/DonalogoHD.png';

const DeletePublicacion = () => {
  const { id } = useParams();
  const [publicacion, setPublicacion] = useState(null);
  const [zonaNombre, setZonaNombre] = useState('');
  const [estadoNombre, setEstadoNombre] = useState('');
  const [sucursal, setSucursal] = useState(null);
  const [relacionada, setRelacionada] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [publiRes, solicitudesRes, zonasRes, estadosRes, sucursalesRes] = await Promise.all([
          fetch(`http://localhost:8000/api/donaciones/publicaciones/${id}/`),
          fetch('http://localhost:8000/api/solicitudes/solicitudes/'),
          fetch('http://localhost:8000/api/zonas/zonas/'),
          fetch('http://localhost:8000/api/donaciones/estados/'),
          fetch('http://localhost:8000/api/donaciones/sucursales/')
        ]);

        if (!publiRes.ok) {
          window.location.hash = '#/publicaciones';
          return;
        }

        const publi = await publiRes.json();
        const solicitudesData = await solicitudesRes.json();
        const zonas = await zonasRes.json();
        const estados = await estadosRes.json();
        const sucursales = await sucursalesRes.json();

        setPublicacion(publi);

        const zona = zonas.find(z => z.id === publi.zona);
        const estado = estados.find(e => e.id === publi.estado);
        const sucursalObj = sucursales.find(s => s.id === publi.sucursal);

        setZonaNombre(zona?.nombre || '—');
        setEstadoNombre(estado?.nombre || '—');
        setSucursal(sucursalObj);

        // ✅ Verificación corregida de relación
        const tieneRelacion = solicitudesData.some(s => {
          const relacion = s.publicacion || s.publicacion_id;
          return (relacion === parseInt(id)) || (relacion?.id === parseInt(id));
        });

        setRelacionada(tieneRelacion);
      } catch (error) {
        console.error('❌ Error al cargar datos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/donaciones/publicaciones/${id}/`, {
        method: 'DELETE'
      });

      if (res.ok) {
        alert('✅ Publicación eliminada con éxito');
        window.location.hash = '#/publicaciones';
      } else {
        alert('❌ No se pudo eliminar la publicación');
      }
    } catch (error) {
      console.error('❌ Error al eliminar:', error);
    }
  };

  if (loading) {
    return <div className="main-content">⏳ Cargando publicación...</div>;
  }

  if (!publicacion) {
    return null; // Redirige ya hecho
  }

  return (
    <div className="main-content">
      <img
        src={fondoDecorativo}
        alt="Decoración DonaApp"
        className="decorative-image"
      />

      <h2>🗑️ Eliminar Publicación</h2>

      <div className={`estado-destacado ${estadoNombre.toLowerCase().replace(/\s/g, '-')}`}>
        {estadoNombre}
      </div>

      <table className="user-summary-table">
        <tbody>
          <tr><th>Título</th><td>{publicacion.titulo}</td></tr>
          <tr><th>Descripción</th><td>{publicacion.descripcion || '—'}</td></tr>
          <tr><th>Cantidad</th><td>{publicacion.cantidad}</td></tr>
          <tr><th>Zona</th><td>{zonaNombre}</td></tr>
          <tr><th>Sucursal</th><td>{sucursal?.nombre || '—'}</td></tr>
          <tr><th>Representante</th><td>{sucursal?.representante || '—'}</td></tr>
          <tr><th>Fecha de publicación</th><td>{publicacion.fecha_publicacion?.split('T')[0]}</td></tr>
          <tr><th>Fecha de caducidad</th><td>{publicacion.fecha_caducidad || '—'}</td></tr>
        </tbody>
      </table>

      {relacionada ? (
        <p style={{ marginTop: '1.2rem', color: '#c62828', fontWeight: 'bold' }}>
          ⚠️ Esta publicación está relacionada con una solicitud en proceso y no puede ser eliminada.
        </p>
      ) : (
        <p style={{ marginTop: '1.2rem', color: '#b00020', fontWeight: 'bold' }}>
          ⚠️ Esta acción no se puede deshacer. ¿Estás segur@ que deseas eliminar esta publicación?
        </p>
      )}

      <div className="delete-buttons">
        {!relacionada && (
          <button
            className="delete-confirm-btn"
            onClick={() => {
              const confirmar = window.confirm('⚠️ Esta acción eliminará permanentemente la publicación.\n¿Estás segur@ que deseas continuar?');
              if (confirmar) {
                handleDelete();
              }
            }}
          >
            <i className="fas fa-trash-alt"></i> Eliminar
          </button>
        )}
        <button
          className="cancel-delete-btn"
          onClick={() => {
            window.location.hash = '#/publicaciones';
          }}
        >
          <i className="fas fa-times-circle"></i> Cancelar
        </button>
      </div>
    </div>
  );
};

export default DeletePublicacion;
