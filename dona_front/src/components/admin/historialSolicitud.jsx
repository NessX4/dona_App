import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fondoDecorativo from '../../assets/DonalogoHD.png';

const HistorialSolicitud = () => {
  const { id } = useParams();

  const [solicitud, setSolicitud] = useState(null);
  const [publicacion, setPublicacion] = useState(null);
  const [receptor, setReceptor] = useState(null);
  const [estadoNombre, setEstadoNombre] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [solRes, pubRes, recRes, estadosRes] = await Promise.all([
          fetch(`http://localhost:8000/api/solicitudes/solicitudes/${id}/`),
          fetch('http://localhost:8000/api/donaciones/publicaciones/'),
          fetch('http://localhost:8000/api/usuarios/receptores/'),
          fetch('http://localhost:8000/api/donaciones/estados/')
        ]);

        const solicitudData = await solRes.json();
        const publicaciones = await pubRes.json();
        const receptores = await recRes.json();
        const estados = await estadosRes.json();

        const pub = publicaciones.find(p => p.id === solicitudData.publicacion);
        const rec = receptores.find(r => r.id === solicitudData.receptor);
        const estado = estados.find(e => e.id === solicitudData.estado);

        setSolicitud(solicitudData);
        setPublicacion(pub);
        setReceptor(rec);
        setEstadoNombre(estado?.nombre || 'Desconocido');
      } catch (error) {
        console.error('❌ Error al cargar solicitud:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, [id]);

  const handleEliminar = async () => {
    const confirmar = window.confirm('⚠️ Esta acción eliminará permanentemente la solicitud.\n¿Deseas continuar?');
    if (!confirmar) return;

    try {
      const res = await fetch(`http://localhost:8000/api/solicitudes/solicitudes/${id}/`, {
        method: 'DELETE'
      });

      if (res.ok) {
        alert('✅ Solicitud eliminada correctamente');
        window.location.hash = '#/solicitudes';
      } else {
        alert('❌ No se pudo eliminar la solicitud');
      }
    } catch (error) {
      console.error('❌ Error al eliminar solicitud:', error);
    }
  };

  if (loading) {
    return <div className="main-content">⏳ Cargando solicitud...</div>;
  }

  if (!solicitud) {
    return (
      <div className="main-content">
        <h2>❌ Solicitud no encontrada</h2>
        <p>No se pudo cargar la solicitud con ID <strong>{id}</strong>.</p>
        <button
          className="cancel-delete-btn"
          onClick={() => window.location.hash = '#/solicitudes'}
        >
          <i className="fas fa-arrow-left"></i> Volver
        </button>
      </div>
    );
  }

  return (
    <div className="main-content">
      <img
        src={fondoDecorativo}
        alt="Decoración DonaApp"
        className="decorative-image"
      />

      <h2>🗑️ Eliminar Solicitud</h2>

      <table className="user-summary-table">
        <tbody>
          <tr><th>Título</th><td>{publicacion?.titulo || '—'}</td></tr>
          <tr><th>Descripción</th><td>{publicacion?.descripcion || '—'}</td></tr>
          <tr><th>Cantidad</th><td>{publicacion?.cantidad || '—'}</td></tr>
          <tr><th>Receptor</th><td>{receptor?.nombre_lugar || '—'}</td></tr>
          <tr><th>Encargado</th><td>{receptor?.encargado || '—'}</td></tr>
          <tr><th>Teléfono</th><td>{receptor?.telefono || '—'}</td></tr>
          <tr><th>Estado</th><td>{estadoNombre}</td></tr>
          <tr><th>Comentarios</th><td>{solicitud.comentarios || '—'}</td></tr>
          <tr><th>Fecha solicitud</th><td>{solicitud.fecha_solicitud?.split('T')[0]}</td></tr>
        </tbody>
      </table>

      <p style={{ marginTop: '1.2rem', color: '#b00020', fontWeight: 'bold' }}>
        ⚠️ Esta acción no se puede deshacer. ¿Estás segur@ que deseas eliminar esta solicitud?
      </p>

      <div className="delete-buttons">
        <button
          className="delete-confirm-btn"
          onClick={handleEliminar}
        >
          <i className="fas fa-trash-alt"></i> Eliminar definitivamente
        </button>

        <button
          className="cancel-delete-btn"
          onClick={() => window.location.hash = '#/solicitudes'}
        >
          <i className="fas fa-times-circle"></i> Cancelar
        </button>
      </div>
    </div>
  );
};

export default HistorialSolicitud;
