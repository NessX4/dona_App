import React, { useEffect, useState } from 'react';
import '../../styles/admin.css';
import { FaCheckCircle, FaUndoAlt } from 'react-icons/fa';

const NotificacionesPanel = () => {
  const [notificacionesOriginal, setNotificacionesOriginal] = useState([]);
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  const [ordenFecha, setOrdenFecha] = useState('recientes');
  const [busqueda, setBusqueda] = useState('');
  const [soloNoLeidas, setSoloNoLeidas] = useState(false);

  // Obtener todas las notificaciones
  useEffect(() => {
    fetch('http://localhost:8000/api/notificaciones/notifiaciones/')
      .then((res) => res.json())
      .then((data) => {
        const lista = Array.isArray(data) ? data : data.results || [];
        setNotificacionesOriginal(lista);
        setLoading(false);
      })
      .catch((error) => {
        console.error('❌ Error al cargar notificaciones:', error);
        setNotificacionesOriginal([]);
        setLoading(false);
      });
  }, []);

  // Filtro + deduplicado
  useEffect(() => {
    let filtradas = [...notificacionesOriginal];

    if (soloNoLeidas) {
      filtradas = filtradas.filter((n) => !n.leido);
    }

    if (busqueda.trim() !== '') {
      filtradas = filtradas.filter((n) =>
        n.mensaje.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    // Solo una por mensaje
    const mapaMensajes = new Map();
    filtradas.forEach((n) => {
      if (!mapaMensajes.has(n.mensaje)) {
        mapaMensajes.set(n.mensaje, n);
      }
    });
    const unicas = Array.from(mapaMensajes.values());

    // Orden
    unicas.sort((a, b) => {
      const fechaA = new Date(a.fecha);
      const fechaB = new Date(b.fecha);
      return ordenFecha === 'recientes' ? fechaB - fechaA : fechaA - fechaB;
    });

    setNotificaciones(unicas);
  }, [ordenFecha, busqueda, soloNoLeidas, notificacionesOriginal]);

  // Toggle estado leído/no leído
  const toggleLeido = (id, estadoActual) => {
    fetch(`http://localhost:8000/api/notificaciones/notifiaciones/${id}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leido: !estadoActual }),
    })
      .then((res) => res.json())
      .then(() => {
        setNotificacionesOriginal((prev) =>
          prev.map((n) => (n.id === id ? { ...n, leido: !estadoActual } : n))
        );
      });
  };

  return (
    <div className="main-content">
      <h2>🔔 Panel de Notificaciones</h2>

      <div className="filtro-barra">
        <input
          type="text"
          placeholder="🔍 Buscar por mensaje"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <label className="checkbox-label">
          Solo no leídas
          <input
            type="checkbox"
            checked={soloNoLeidas}
            onChange={(e) => setSoloNoLeidas(e.target.checked)}
            style={{ marginLeft: '8px' }}
          />
        </label>

        <label>Ordenar por fecha:</label>
        <select value={ordenFecha} onChange={(e) => setOrdenFecha(e.target.value)}>
          <option value="recientes">Más recientes primero</option>
          <option value="antiguas">Más antiguas primero</option>
        </select>
      </div>

      {/* Tabla */}
      <table className="user-table">
        <thead>
          <tr>
            <th>Mensaje</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" className="text-center">⏳ Cargando notificaciones...</td>
            </tr>
          ) : notificaciones.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">No hay notificaciones que coincidan con los filtros.</td>
            </tr>
          ) : (
            notificaciones.map((n) => (
              <tr key={n.id}>
                <td>{n.mensaje}</td>
                <td>{new Date(n.fecha).toLocaleString()}</td>
                <td>
                  <span className={n.leido ? 'estado-btn activo' : 'estado-btn inactivo'}>
                    {n.leido ? '✅ Leída' : '🔴 No leída'}
                  </span>
                </td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => toggleLeido(n.id, n.leido)}
                  >
                    {n.leido ? (
                      <>
                        <FaUndoAlt /> Marcar como no leída
                      </>
                    ) : (
                      <>
                        <FaCheckCircle /> Marcar como leída
                      </>
                    )}
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

export default NotificacionesPanel;
