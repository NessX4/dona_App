/**
 * Responsable: Mariela Higuera
 * Descripción: Muestra el historial de cambios de una solicitud específica.
 */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fondoDecorativo from '../../assets/DonalogoHD.png';
import '../../styles/admin.css';

const HistorialSolicitud = () => {
  const { id } = useParams();

  const [solicitud, setSolicitud] = useState(null);
  const [publicacion, setPublicacion] = useState(null);
  const [estadosDonacion, setEstadosDonacion] = useState([]);
  const [historiales, setHistoriales] = useState([]);
  const [donadores, setDonadores] = useState([]);
  const [receptores, setReceptores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [
          solRes,
          pubRes,
          estadosRes,
          historialRes,
          donadoresRes,
          receptoresRes
        ] = await Promise.all([
          fetch(`http://localhost:8000/api/solicitudes/solicitudes/${id}/`),
          fetch('http://localhost:8000/api/donaciones/publicaciones/'),
          fetch('http://localhost:8000/api/donaciones/estados/'),
          fetch('http://localhost:8000/api/solicitudes/historiales/'),
          fetch('http://localhost:8000/api/usuarios/donadores/'),
          fetch('http://localhost:8000/api/usuarios/receptores/')
        ]);

        const solicitudData = await solRes.json();
        const publicaciones = await pubRes.json();
        const estados = await estadosRes.json();
        const todosHistoriales = await historialRes.json();
        const todosDonadores = await donadoresRes.json();
        const todosReceptores = await receptoresRes.json();

        const pub = publicaciones.find(p => p.id === solicitudData.publicacion);
        const logs = todosHistoriales.filter(h => h.publicacion === solicitudData.publicacion);

        setSolicitud(solicitudData);
        setPublicacion(pub);
        setEstadosDonacion(estados);
        setHistoriales(logs);
        setDonadores(todosDonadores);
        setReceptores(todosReceptores);
      } catch (error) {
        console.error('❌ Error al cargar solicitud:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, [id]);

  const getEstadoNombre = (estadoId) =>
    estadosDonacion.find(e => e.id === parseInt(estadoId))?.nombre || 'Desconocido';

  const getDonadorNombre = (id) =>
    donadores.find(d => d.id === id)?.usuario?.nombre || `ID ${id}`;

  const getReceptorNombre = (id) =>
    receptores.find(r => r.id === id)?.nombre_lugar || `ID ${id}`;

  const estadoNombre = getEstadoNombre(solicitud?.estado);
  const estadoClase = `estado-destacado ${estadoNombre.toLowerCase().replace(/\s/g, '-')}`;

  const handleEliminarHistorial = async () => {
    const confirm = window.confirm('⚠️ Esta acción eliminará todos los registros del historial.\n¿Deseas continuar?');
    if (!confirm) return;

    try {
      const deleteLogs = historiales.map(h =>
        fetch(`http://localhost:8000/api/solicitudes/historiales/${h.id}/`, {
          method: 'DELETE'
        })
      );
      await Promise.all(deleteLogs);
      alert('✅ Historial eliminado correctamente');
      setHistoriales([]);
      window.location.hash = '#/solicitudes';
    } catch (error) {
      console.error('❌ Error al eliminar historial:', error);
      alert('❌ Hubo un problema al borrar el historial');
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
        <button className="cancel-delete-btn" onClick={() => window.location.hash = '#/solicitudes'}>
          <i className="fas fa-arrow-left"></i> Volver
        </button>
      </div>
    );
  }


  
  return (
  <div className="main-content">
    <img src={fondoDecorativo} alt="Decoración DonaApp" className="decorative-image" />
    <h2>📜 Historial de cambios</h2>
    <div className={estadoClase}>{estadoNombre}</div>

    {historiales.length > 0 && (
      <table className="user-summary-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Tipo</th>
            <th>Donador</th>
            <th>Receptor</th>
          </tr>
        </thead>
        <tbody>
          {historiales.map((h) => (
            <tr key={h.id}>
              <td>{h.fecha?.split('T')[0]}</td>
              <td>{h.tipo || '—'}</td>
              <td>{getDonadorNombre(h.donador)}</td>
              <td>{getReceptorNombre(h.receptor)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}

    <h3 style={{ marginTop: '2rem', fontWeight: 600, marginBottom: '1rem' }}>
      Detalles de la solicitud
    </h3>

    <table className="user-summary-table">
      <tbody>
        <tr><th>Título</th><td>{publicacion?.titulo || '—'}</td></tr>
        <tr><th>Descripción</th><td>{publicacion?.descripcion || '—'}</td></tr>
        <tr><th>Comentarios</th><td>{solicitud.comentarios || '—'}</td></tr>
      </tbody>
    </table>

    {/* ✅ Zona final: solo si hay historial */}
    {historiales.length > 0 ? (
      <>
        <p style={{ marginTop: '2rem', color: '#b00020', fontWeight: 600 }}>
          ⚠️ ¿Seguro que quieres borrar el historial de logs de esta publicación?
        </p>
        <button
          className="delete-confirm-btn"
          onClick={handleEliminarHistorial}
          style={{ marginTop: '0.8rem' }}
        >
          <i className="fas fa-trash-alt"></i> Eliminar historial
        </button>
      </>
    ) : (
      <>
        <p style={{ marginTop: '1.5rem' }}>No hay registros de historial para esta publicación.</p>
        <button
          className="cancel-delete-btn"
          style={{ marginTop: '1rem' }}
          onClick={() => {
            window.location.hash = '#/solicitudes';
          }}
        >
          <i className="fas fa-arrow-left"></i> Volver a solicitudes
        </button>
      </>
    )}
  </div>
);
};

export default HistorialSolicitud;
