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

    const mapaMensajes = new Map();
    filtradas.forEach((n) => {
      if (!mapaMensajes.has(n.mensaje)) {
        mapaMensajes.set(n.mensaje, n);
      }
    });
    const unicas = Array.from(mapaMensajes.values());

    unicas.sort((a, b) => {
      const fechaA = new Date(a.fecha);
      const fechaB = new Date(b.fecha);
      return ordenFecha === 'recientes' ? fechaB - fechaA : fechaA - fechaB;
    });

    setNotificaciones(unicas);
  }, [ordenFecha, busqueda, soloNoLeidas, notificacionesOriginal]);

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
      <h2 style={{ marginTop: '10px' }}>
        <i className="fas fa-bell" style={{ marginRight: '10px', color: '#333' }}></i>
        Panel de notificaciones
      </h2>

      <div className="filtro-barra">
        <input
          type="text"
          placeholder="🔍 Buscar por mensaje"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
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
          <span>Solo no leídas</span>
          <input
            type="checkbox"
            checked={soloNoLeidas}
            onChange={(e) => setSoloNoLeidas(e.target.checked)}
            style={{
              width: '18px',
              height: '18px',
              cursor: 'pointer',
              marginTop: '18px'
            }}
          />
        </label>

        Ordenar por fecha:
        <select value={ordenFecha} onChange={(e) => setOrdenFecha(e.target.value)}>
          <option value="recientes">Más recientes primero</option>
          <option value="antiguas">Más antiguas primero</option>
        </select>
      </div>

      <div className="espaciado-negativo"></div>

      <table className="user-table">
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>Mensaje</th>
            <th style={{ textAlign: 'center' }}>Fecha</th>
            <th style={{ textAlign: 'center' }}>Estado</th>
            <th style={{ textAlign: 'center' }}>Acción</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>⏳ Cargando notificaciones...</td>
            </tr>
          ) : notificaciones.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>
                No hay notificaciones que coincidan con los filtros.
              </td>
            </tr>
          ) : (
            notificaciones.map((n) => (
              <tr key={n.id}>
                <td style={{ textAlign: 'center' }}>{n.mensaje}</td>
                <td style={{ textAlign: 'center' }}>{new Date(n.fecha).toLocaleString()}</td>
                <td style={{ textAlign: 'center' }}>
                  <span className={n.leido ? 'estado-btn activo' : 'estado-btn inactivo'}>
                    {n.leido ? '✅ Leída' : '🔴 No leída'}
                  </span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <button className="edit-btn" onClick={() => toggleLeido(n.id, n.leido)}>
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
